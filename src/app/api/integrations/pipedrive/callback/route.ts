import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { exchangePipedriveCode } from "@/lib/integrations/pipedrive";
import { getCurrentUser } from "@/lib/auth/session";

// Security: primary verification is the CSRF state token (single-use, 10-min expiry, encodes userId).
// If a session cookie is also present, we cross-check it matches the state token's userId to prevent
// a logged-in user from being tricked into completing another user's OAuth flow.

function appUrl(path: string) {
  const base = (process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
  return `${base}${path}`;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const oauthError = request.nextUrl.searchParams.get("error");

  if (oauthError) {
    return NextResponse.redirect(appUrl("/dashboard/integrations?error=pipedrive_denied"));
  }

  if (!code || !state) {
    return NextResponse.redirect(appUrl("/dashboard/integrations?error=invalid_callback"));
  }

  try {
    const stateRecord = await prisma.verificationToken.findUnique({
      where: { token: state },
    });

    if (
      !stateRecord ||
      stateRecord.expires < new Date() ||
      !stateRecord.identifier.startsWith("pipedrive_state:")
    ) {
      return NextResponse.redirect(appUrl("/dashboard/integrations?error=invalid_state"));
    }

    const userId = stateRecord.identifier.replace("pipedrive_state:", "");

    const sessionUser = await getCurrentUser();
    if (sessionUser !== null && sessionUser.id !== userId) {
      return NextResponse.redirect(appUrl("/dashboard/integrations?error=invalid_state"));
    }

    await prisma.verificationToken.delete({ where: { token: state } });

    const tokens = await exchangePipedriveCode(code);

    await prisma.userIntegration.upsert({
      where: { userId_provider: { userId, provider: "PIPEDRIVE" } },
      create: {
        userId,
        provider: "PIPEDRIVE",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenExpiresAt: tokens.expiresAt,
        apiDomain: tokens.apiDomain,
      },
      update: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenExpiresAt: tokens.expiresAt,
        apiDomain: tokens.apiDomain,
        syncStatus: "IDLE",
        syncError: null,
      },
    });

    return NextResponse.redirect(appUrl("/dashboard/integrations?connected=pipedrive"));
  } catch (err) {
    console.error("Pipedrive callback error:", err);
    return NextResponse.redirect(appUrl("/dashboard/integrations?error=pipedrive_failed"));
  }
}
