import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const opportunities = await prisma.opportunity.findMany({
    where: { userId: user.id },
    orderBy: [
      { status: "asc" }, // open/in_progress before done
      { priority: "asc" }, // high sorts before low alphabetically — handled client-side
      { createdAt: "desc" },
    ],
  });

  return NextResponse.json(opportunities);
}
