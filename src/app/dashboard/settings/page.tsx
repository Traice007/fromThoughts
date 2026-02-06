import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { PasswordForm } from "@/components/dashboard/password-form";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      subscriptionTier: true,
      subscriptionStatus: true,
      subscriptionPeriodEnd: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-secondary mt-1">Manage your account settings</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <SettingsForm user={userData!} />

        <PasswordForm />

        {/* Account Info */}
        <div className="bg-background border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-secondary">Email</label>
              <p className="font-medium">{userData?.email}</p>
            </div>
            <div>
              <label className="text-sm text-secondary">Subscription</label>
              <p className="font-medium">
                {userData?.subscriptionTier === "TRIAL" && "Starter"}
                {userData?.subscriptionTier === "PRO" && "Pro Plan"}
                {userData?.subscriptionTier === "ENTERPRISE" && "Enterprise"}
              </p>
            </div>
            {userData?.subscriptionPeriodEnd && (
              <div>
                <label className="text-sm text-secondary">
                  {userData.subscriptionTier === "TRIAL" ? "Access Ends" : "Next Billing Date"}
                </label>
                <p className="font-medium">
                  {new Date(userData.subscriptionPeriodEnd).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-background border border-red-200 dark:border-red-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Danger Zone</h2>
          <p className="text-sm text-secondary mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            disabled
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
