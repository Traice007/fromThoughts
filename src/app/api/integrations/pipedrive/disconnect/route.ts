import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.userIntegration.delete({
      where: { userId_provider: { userId: user.id, provider: "PIPEDRIVE" } },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not connected" }, { status: 404 });
  }
}
