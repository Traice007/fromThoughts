import { Resend } from "resend";
import { prisma } from "@/lib/db";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use Resend's test domain until foundervision.io is verified
const EMAIL_FROM = process.env.EMAIL_FROM || "FounderVision <onboarding@resend.dev>";
const APP_URL = process.env.NEXTAUTH_URL || "https://foundervision.io";

export async function createVerificationToken(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

export async function sendVerificationEmail(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await createVerificationToken(email);
    const verificationUrl = `${APP_URL}/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Verify your FounderVision account",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">FounderVision</h1>
          </div>

          <h2 style="color: #1f2937;">Welcome, ${name}!</h2>

          <p>Thanks for signing up for FounderVision. Please verify your email address to activate your account.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}"
               style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              Verify Email Address
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="color: #6b7280; font-size: 14px; word-break: break-all;">
            ${verificationUrl}
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Failed to send verification email:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error: "Failed to send verification email" };
  }
}

export async function verifyEmailToken(
  email: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token,
      },
    });

    if (!verificationToken) {
      return { success: false, error: "Invalid verification token" };
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token,
          },
        },
      });
      return { success: false, error: "Verification token has expired" };
    }

    // Update user's emailVerified field
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error verifying email token:", error);
    return { success: false, error: "Verification failed" };
  }
}
