import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin?callbackUrl=/admin/opportunities");
  }

  if (user.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
