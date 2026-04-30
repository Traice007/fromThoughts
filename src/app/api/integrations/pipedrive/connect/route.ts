import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { createConnectUrl } from "@/lib/integrations/pipedrive";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.PIPEDRIVE_CLIENT_ID) {
    return NextResponse.json({ error: "Pipedrive not configured" }, { status: 500 });
  }

  try {
    const authUrl = await createConnectUrl(user.id);
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Pipedrive connect error:", error);
    return NextResponse.json({ error: "Failed to initiate connection" }, { status: 500 });
  }
}
