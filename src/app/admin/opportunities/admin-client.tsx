"use client";

import { useState } from "react";
import { Users, TrendingUp, Target, Settings, Lightbulb, Plus, Pencil, Trash2, X, Check } from "lucide-react";

type Opportunity = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  category: string;
  priority: string;
  impact: string | null;
  nextAction: string;
  status: string;
  dueDate: string | null;
  reviewedAt: string | null;
  createdAt: string;
};

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  _count: { pipelineImports: number; opportunities: number };
  opportunities: Opportunity[];
};

const CATEGORY_OPTIONS = [
  { value: "deal", label: "Deal", icon: TrendingUp, color: "text-green-600 bg-green-100" },
  { value: "pipeline", label: "Pipeline", icon: Target, color: "text-blue-600 bg-blue-100" },
  { value: "process", label: "Process", icon: Settings, color: "text-purple-600 bg-purple-100" },
  { value: "hiring", label: "Hiring", icon: Users, color: "text-orange-600 bg-orange-100" },
];

const PRIORITY_OPTIONS = [
  { value: "high", label: "High", color: "text-red-600 bg-red-100" },
  { value: "medium", label: "Medium", color: "text-yellow-700 bg-yellow-100" },
  { value: "low", label: "Low", color: "text-gray-600 bg-gray-100" },
];

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

function categoryConfig(category: string) {
  return CATEGORY_OPTIONS.find((c) => c.value === category) ?? CATEGORY_OPTIONS[0];
}

function priorityConfig(priority: string) {
  return PRIORITY_OPTIONS.find((p) => p.value === priority) ?? PRIORITY_OPTIONS[1];
}

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "deal",
  priority: "medium",
  impact: "",
  nextAction: "",
  dueDate: "",
};

export function AdminClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    initialUsers[0]?.id ?? null
  );
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedUser = users.find((u) => u.id === selectedUserId) ?? null;

  const sortedOpportunities = selectedUser
    ? [...selectedUser.opportunities].sort((a, b) => {
        // done goes last
        if (a.status === "done" && b.status !== "done") return 1;
        if (b.status === "done" && a.status !== "done") return -1;
        // then by priority
        return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
      })
    : [];

  function startEdit(opp: Opportunity) {
    setEditingId(opp.id);
    setForm({
      title: opp.title,
      description: opp.description ?? "",
      category: opp.category,
      priority: opp.priority,
      impact: opp.impact ?? "",
      nextAction: opp.nextAction,
      dueDate: opp.dueDate ? opp.dueDate.slice(0, 10) : "",
    });
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
  }

  function updateUserOpportunities(userId: string, updater: (opps: Opportunity[]) => Opportunity[]) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, opportunities: updater(u.opportunities), _count: { ...u._count, opportunities: updater(u.opportunities).length } }
          : u
      )
    );
  }

  async function handleSave() {
    if (!selectedUserId) return;
    if (!form.title.trim() || !form.nextAction.trim()) {
      setError("Title and Next Action are required.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/opportunities/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            dueDate: form.dueDate || null,
            description: form.description || null,
            impact: form.impact || null,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        const updated: Opportunity = await res.json();
        updateUserOpportunities(selectedUserId, (opps) =>
          opps.map((o) => (o.id === editingId ? updated : o))
        );
        setEditingId(null);
      } else {
        const res = await fetch("/api/admin/opportunities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: selectedUserId,
            ...form,
            dueDate: form.dueDate || null,
            description: form.description || null,
            impact: form.impact || null,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        const created: Opportunity = await res.json();
        updateUserOpportunities(selectedUserId, (opps) => [created, ...opps]);
      }
      setForm(EMPTY_FORM);
    } catch {
      setError("Something went wrong. Check the console.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!selectedUserId) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      updateUserOpportunities(selectedUserId, (opps) => opps.filter((o) => o.id !== id));
      if (editingId === id) cancelEdit();
    } catch {
      setError("Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-7xl mx-auto flex gap-0 h-[calc(100vh-73px)]">
      {/* Left panel: user list */}
      <aside className="w-72 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
        {users.map((u) => (
          <button
            key={u.id}
            onClick={() => { setSelectedUserId(u.id); cancelEdit(); }}
            className={`w-full text-left px-4 py-3 border-b border-gray-100 transition-colors ${
              selectedUserId === u.id ? "bg-amber-50 border-l-2 border-l-amber-500" : "hover:bg-gray-50"
            }`}
          >
            <p className="text-sm font-medium text-gray-900 truncate">{u.name ?? u.email}</p>
            {u.name && <p className="text-xs text-gray-400 truncate">{u.email}</p>}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-gray-400">{u._count.pipelineImports} imports</span>
              <span className={`text-xs font-medium ${u._count.opportunities > 0 ? "text-amber-600" : "text-gray-400"}`}>
                {u._count.opportunities} opportunities
              </span>
            </div>
          </button>
        ))}
      </aside>

      {/* Right panel */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!selectedUser ? (
          <p className="text-gray-400">Select a user on the left.</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedUser.name ?? selectedUser.email}
                </h2>
                {selectedUser.name && (
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                )}
              </div>
              <span className="text-sm text-gray-400">
                {sortedOpportunities.length} opportunities
              </span>
            </div>

            {/* Create / edit form */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h3 className="font-medium text-gray-900">
                {editingId ? "Edit Opportunity" : "Add Opportunity"}
              </h3>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="e.g. Acme Corp deal going cold — act now"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                  <select
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Priority *</label>
                  <select
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={form.priority}
                    onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                  >
                    {PRIORITY_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Next Action * <span className="text-gray-400 font-normal">(be specific)</span></label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    placeholder="e.g. Reference the implementation concern from last call and send the ROI one-pager"
                    value={form.nextAction}
                    onChange={(e) => setForm((f) => ({ ...f, nextAction: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Impact <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="e.g. €25K potential"
                    value={form.impact}
                    onChange={(e) => setForm((f) => ({ ...f, impact: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Due Date <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={form.dueDate}
                    onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description <span className="text-gray-400 font-normal">(optional — context for the founder)</span></label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    placeholder="Extra context on why this matters"
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 disabled:opacity-50 transition-colors"
                >
                  {saving ? (
                    "Saving..."
                  ) : editingId ? (
                    <><Check className="h-4 w-4" /> Save Changes</>
                  ) : (
                    <><Plus className="h-4 w-4" /> Add Opportunity</>
                  )}
                </button>
                {editingId && (
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Opportunities list */}
            {sortedOpportunities.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Lightbulb className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No opportunities yet. Add one above after the pipeline review call.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedOpportunities.map((opp) => {
                  const cat = categoryConfig(opp.category);
                  const pri = priorityConfig(opp.priority);
                  const CatIcon = cat.icon;

                  return (
                    <div
                      key={opp.id}
                      className={`bg-white border rounded-xl p-4 ${
                        opp.status === "done" ? "opacity-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className={`p-1.5 rounded-lg flex-shrink-0 ${cat.color}`}>
                            <CatIcon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pri.color}`}>
                                {pri.label.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-400 capitalize">{opp.status.replace("_", " ")}</span>
                              {opp.dueDate && (
                                <span className="text-xs text-gray-400">
                                  Due {new Date(opp.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                </span>
                              )}
                            </div>
                            <p className="font-medium text-gray-900 text-sm">{opp.title}</p>
                            {opp.impact && (
                              <p className="text-xs text-amber-600 font-medium mt-0.5">{opp.impact}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{opp.nextAction}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => startEdit(opp)}
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(opp.id)}
                            disabled={deletingId === opp.id}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
