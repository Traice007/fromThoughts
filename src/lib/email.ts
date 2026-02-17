import { Resend } from "resend";
import { prisma } from "@/lib/db";
import crypto from "crypto";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const EMAIL_FROM = process.env.EMAIL_FROM || "fromThoughts <noreply@fromthoughts.com>";
const APP_URL = process.env.NEXTAUTH_URL || "https://fromthoughts.com";

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

    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Verify your fromThoughts account",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">fromThoughts</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">From Target to Action</p>
            </div>

            <!-- Content -->
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 24px;">Welcome, ${escapeHtml(name)}!</h2>

              <p style="color: #4b5563; margin: 0 0 24px 0;">Thanks for signing up for fromThoughts. Please verify your email address to activate your account and start building your execution plan.</p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${verificationUrl}"
                   style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-block; font-size: 16px;">
                  Verify Email Address
                </a>
              </div>

              <p style="color: #6b7280; font-size: 13px; margin: 24px 0 8px 0;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="color: #0d9488; font-size: 13px; word-break: break-all; margin: 0;">
                ${verificationUrl}
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 24px 20px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 16px 0 0 0;">
                © ${new Date().getFullYear()} fromThoughts. All rights reserved.
              </p>
            </div>
          </div>
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

export async function createPasswordResetToken(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Delete any existing reset tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: `reset:${email}` },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: `reset:${email}`,
      token,
      expires,
    },
  });

  return token;
}

export async function sendPasswordResetEmail(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await createPasswordResetToken(email);
    const resetUrl = `${APP_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Reset your fromThoughts password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">fromThoughts</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">From Target to Action</p>
            </div>

            <!-- Content -->
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 24px;">Reset your password</h2>

              <p style="color: #4b5563; margin: 0 0 24px 0;">Hi ${escapeHtml(name)},</p>

              <p style="color: #4b5563; margin: 0 0 24px 0;">We received a request to reset your password. Click the button below to choose a new password.</p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}"
                   style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-block; font-size: 16px;">
                  Reset Password
                </a>
              </div>

              <p style="color: #6b7280; font-size: 13px; margin: 24px 0 8px 0;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="color: #0d9488; font-size: 13px; word-break: break-all; margin: 0;">
                ${resetUrl}
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 24px 20px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 16px 0 0 0;">
                &copy; ${new Date().getFullYear()} fromThoughts. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Failed to send password reset email:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, error: "Failed to send password reset email" };
  }
}

export async function sendPaymentFailedEmail(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const portalUrl = `${APP_URL}/api/billing/portal`;

    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Action required: Payment failed for your fromThoughts subscription",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">fromThoughts</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">From Target to Action</p>
            </div>

            <!-- Content -->
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 24px;">Payment failed</h2>

              <p style="color: #4b5563; margin: 0 0 24px 0;">Hi ${escapeHtml(name)},</p>

              <p style="color: #4b5563; margin: 0 0 24px 0;">We were unable to process your latest payment for your fromThoughts subscription. This could be due to an expired card, insufficient funds, or a temporary issue with your payment provider.</p>

              <p style="color: #4b5563; margin: 0 0 24px 0;">To avoid losing access to your account, please update your payment method as soon as possible.</p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${portalUrl}"
                   style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-block; font-size: 16px;">
                  Update Payment Method
                </a>
              </div>

              <p style="color: #6b7280; font-size: 13px; margin: 24px 0 0 0;">
                If you believe this is an error or need help, please contact us at support@fromthoughts.com.
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 24px 20px;">
              <p style="color: #d1d5db; font-size: 11px; margin: 0;">
                © ${new Date().getFullYear()} fromThoughts. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Failed to send payment failed email:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending payment failed email:", error);
    return { success: false, error: "Failed to send payment failed email" };
  }
}

export async function sendSubscriptionExpiryWarningEmail(
  email: string,
  name: string,
  tier: string,
  daysRemaining: number,
  expiresAt: Date
): Promise<{ success: boolean; error?: string }> {
  try {
    const billingUrl = `${APP_URL}/dashboard/billing`;
    const expiryDate = expiresAt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const urgencyText = daysRemaining === 1
      ? "expires tomorrow"
      : `expires in ${daysRemaining} days`;

    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `Your fromThoughts ${tier.toLowerCase()} plan ${urgencyText}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">fromThoughts</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">From Target to Action</p>
            </div>

            <!-- Content -->
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 24px;">Your plan ${urgencyText}</h2>

              <p style="color: #4b5563; margin: 0 0 24px 0;">Hi ${escapeHtml(name)},</p>

              <p style="color: #4b5563; margin: 0 0 24px 0;">This is a friendly reminder that your fromThoughts <strong>${tier.toLowerCase()}</strong> plan will expire on <strong>${expiryDate}</strong>.</p>

              <p style="color: #4b5563; margin: 0 0 24px 0;">To continue using all the features you love, renew your plan before it expires.</p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${billingUrl}"
                   style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-block; font-size: 16px;">
                  Renew Now
                </a>
              </div>

              <p style="color: #6b7280; font-size: 13px; margin: 24px 0 0 0;">
                If you have any questions, please contact us at support@fromthoughts.com.
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 24px 20px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                You're receiving this email because your fromThoughts subscription is expiring soon.
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 16px 0 0 0;">
                © ${new Date().getFullYear()} fromThoughts. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Failed to send expiry warning email:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending expiry warning email:", error);
    return { success: false, error: "Failed to send expiry warning email" };
  }
}

export async function sendSalesLeadNotificationEmail(
  lead: { name: string; email: string; companyWebsite?: string | null; teamSize?: string | null; message?: string | null }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: "sales@fromthoughts.com",
      subject: `New Enterprise lead: ${lead.name} from ${lead.companyWebsite || "Unknown"}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">New Enterprise Lead</h1>
            </div>

            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 120px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${escapeHtml(lead.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;"><a href="mailto:${escapeHtml(lead.email)}" style="color: #059669;">${escapeHtml(lead.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Website</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${lead.companyWebsite ? `<a href="${escapeHtml(lead.companyWebsite.startsWith("http") ? lead.companyWebsite : `https://${lead.companyWebsite}`)}" style="color: #059669;">${escapeHtml(lead.companyWebsite)}</a>` : "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Team Size</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${escapeHtml(lead.teamSize || "Not provided")}</td>
                </tr>
                ${lead.message ? `
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #374151; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; color: #4b5563;">${escapeHtml(lead.message)}</td>
                </tr>
                ` : ""}
              </table>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Failed to send sales lead notification:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending sales lead notification:", error);
    return { success: false, error: "Failed to send notification email" };
  }
}

export async function sendSalesLeadConfirmationEmail(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Thanks for reaching out to fromThoughts",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">fromThoughts</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">From Target to Action</p>
            </div>

            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 24px;">Thanks for reaching out!</h2>

              <p style="color: #4b5563; margin: 0 0 24px 0;">Hi ${escapeHtml(name)},</p>

              <p style="color: #4b5563; margin: 0 0 24px 0;">We've received your message and a member of our team will be in touch within 24 hours to discuss how fromThoughts can help your organization.</p>

              <p style="color: #4b5563; margin: 0 0 24px 0;">In the meantime, feel free to explore our platform:</p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${APP_URL}/forecast"
                   style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-block; font-size: 16px;">
                  Try fromThoughts
                </a>
              </div>

              <p style="color: #6b7280; font-size: 13px; margin: 24px 0 0 0;">
                If you have any urgent questions, you can reach us at support@fromthoughts.com.
              </p>
            </div>

            <div style="text-align: center; padding: 24px 20px;">
              <p style="color: #d1d5db; font-size: 11px; margin: 0;">
                &copy; ${new Date().getFullYear()} fromThoughts. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Failed to send sales lead confirmation:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending sales lead confirmation:", error);
    return { success: false, error: "Failed to send confirmation email" };
  }
}
