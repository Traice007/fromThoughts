"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, X } from "lucide-react";

export function ImpersonationBanner({ email }: { email: string }) {
  const router = useRouter();
  const [stopping, setStopping] = useState(false);

  async function stopImpersonating() {
    setStopping(true);
    await fetch("/api/admin/impersonate", { method: "DELETE" });
    router.push("/admin/opportunities");
  }

  return (
    <div className="sticky top-16 z-40 bg-indigo-600 text-white px-4 py-2 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 flex-shrink-0" />
        <span>Viewing as <strong>{email}</strong></span>
      </div>
      <button
        onClick={stopImpersonating}
        disabled={stopping}
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        <X className="h-4 w-4" />
        {stopping ? "Stopping..." : "Stop"}
      </button>
    </div>
  );
}
