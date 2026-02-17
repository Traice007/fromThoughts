import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Always return success to prevent user enumeration
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, password: true },
    });

    // Only send email if user exists and has a password (not OAuth-only)
    if (user?.password) {
      const emailResult = await sendPasswordResetEmail(email, user.name || "there");
      if (!emailResult.success) {
        console.error("Failed to send password reset email:", emailResult.error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists with that email, you will receive a password reset link.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
