import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

function isAdmin(email: string | null | undefined) {
  return email === process.env.ADMIN_EMAIL;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.email || !isAdmin(user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            pipelineImports: true,
            opportunities: true,
          },
        },
        opportunities: {
          orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("[ADMIN] GET opportunities error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user?.email || !isAdmin(user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { userId, title, description, category, priority, impact, nextAction, dueDate } =
      body as Record<string, string | undefined>;

    if (!userId || !title || !category || !nextAction) {
      return NextResponse.json(
        { error: "userId, title, category, and nextAction are required" },
        { status: 400 }
      );
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        userId,
        title,
        description: description || null,
        category,
        priority: priority || "medium",
        impact: impact || null,
        nextAction,
        dueDate: dueDate ? new Date(dueDate) : null,
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json(opportunity, { status: 201 });
  } catch (error) {
    console.error("[ADMIN] POST opportunity error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
