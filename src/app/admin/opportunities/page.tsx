import { prisma } from "@/lib/db";
import { AdminClient } from "./admin-client";

export default async function AdminOpportunitiesPage() {
  const rawUsers = await prisma.user.findMany({
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
        orderBy: [{ createdAt: "desc" }],
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Serialize dates to strings for the client component
  const users = rawUsers.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
    opportunities: u.opportunities.map((o) => ({
      ...o,
      dueDate: o.dueDate ? o.dueDate.toISOString() : null,
      reviewedAt: o.reviewedAt ? o.reviewedAt.toISOString() : null,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    })),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Opportunities Admin</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {users.length} users · curate pipeline priorities per founder
            </p>
          </div>
          <span className="text-xs font-medium bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
            Admin only
          </span>
        </div>
      </div>
      <AdminClient initialUsers={users} />
    </div>
  );
}
