import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendSalesLeadNotificationEmail, sendSalesLeadConfirmationEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  companyWebsite: z.string().min(1, "Company website is required"),
  teamSize: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, companyWebsite, teamSize, message } = result.data;

    // Save lead to database
    await prisma.salesLead.create({
      data: {
        name,
        email,
        companyWebsite,
        teamSize: teamSize || null,
        message: message || null,
      },
    });

    // Send notification to sales team and confirmation to lead
    await Promise.all([
      sendSalesLeadNotificationEmail({ name, email, companyWebsite, teamSize, message }),
      sendSalesLeadConfirmationEmail(email, name),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact sales error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
