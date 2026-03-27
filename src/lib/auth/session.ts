import { cookies } from "next/headers";
import { auth } from "./config";
import { prisma } from "@/lib/db";

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) return null;

  // If the authenticated user is the admin, check for an active impersonation cookie
  if (session.user.email === process.env.ADMIN_EMAIL) {
    const cookieStore = await cookies();
    const impersonatingId = cookieStore.get("x-impersonating")?.value;
    if (impersonatingId) {
      const target = await prisma.user.findUnique({
        where: { id: impersonatingId },
        select: { id: true, email: true, name: true, image: true, subscriptionTier: true },
      });
      if (target) {
        return { ...target, isImpersonated: true as const };
      }
    }
  }

  return session.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function getSession() {
  return await auth();
}
