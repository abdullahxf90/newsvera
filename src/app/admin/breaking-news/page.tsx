"use client";

import { useState, useEffect } from "react";
import { createAdminClient } from "@/lib/supabase-admin";

interface BreakingItem {
  id: string;
  text: string;
  link: string;
  is_active: boolean;
  sort_order: number;
}

const emptyForm = { text: "", link: "", is_active: true, sort_order: 0 };

export default function BreakingNewsPage() {
  const [items, setItems] = useState<BreakingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BreakingItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const supabase = createAdminClient();
    const { data } = await supabase.from("breaking_news").select("*").order("sort_order").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createAdminClient();
    if (editing) {
      await supabase.from("breaking_news").update(form).eq("id", editing.id);
    } else {
      await supabase.from("breaking_news").insert(form);
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchItems();
  }

  async function toggleActive(id: string, current: boolean) {
    const supabase = createAdminClient();
    await supabase.from("breaking_news").update({ is_active: !current }).eq("id", id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, is_active: !current } : i));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this breaking news item?")) return;
    const supabase = createAdminClient();
    await supabase.from("breaking_news").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function openEdit(item: BreakingItem) {
    setEditing(item);
    setForm({ text: item.text, link: item.link, is_active: item.is_active, sort_order: item.sort_order });
    setShowForm(true);
  }

  const setField = (k: keyof typeof form, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-bold text-xl">Breaking News</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage the ticker shown at the top of the site</p>
        </div>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}
          className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm px-5 py-2 rounded-lg transition-colors">
          + Add Item
        </button>
      </div>

      {/* Preview */}
      <div className="bg-red-600 text-white py-2 px-4 rounded-xl mb-6 overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="bg-white text-red-600 font-bold text-xs px-2 py-0.5 rounded uppercase tracking-wide flex-shrink-0">Breaking</span>
          <p className="text-sm truncate">
            {items.filter((i) => i.is_active)[0]?.text || "No active breaking news items"}
          </p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-4">{editing ? "Edit Item" : "New Breaking News Item"}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Headline Text *</label>
              <input required value={form.text} onChange={(e) => setField("text", e.target.value)}
                placeholder="e.g. BREAKING: Major tech company announces…"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Link (optional)</label>
              <input value={form.link} onChange={(e) => setField("link", e.target.value)}
                placeholder="/article/your-article-slug"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Sort Order (lower = first)</label>
              <input type="number" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))}
                className="w-32 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} className="accent-yellow-500" />
              <span className="text-gray-300 text-sm">Show on site</span>
            </label>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving}
                className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-gray-900 font-semibold text-sm px-5 py-2 rounded-lg transition-colors">
                {saving ? "Saving…" : editing ? "Update" : "Add"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-5 py-2 rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items list */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <h2 className="text-white font-semibold">All Items ({items.length})</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No breaking news items yet.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {items.map((item) => (
              <div key={item.id} className="px-5 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{item.text}</p>
                  {item.link && <p className="text-gray-500 text-xs mt-0.5">{item.link}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(item.id, item.is_active)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${item.is_active ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-gray-700 text-gray-400 hover:bg-gray-600"}`}>
                    {item.is_active ? "Active" : "Inactive"}
                  </button>
                  <button onClick={() => openEdit(item)} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs bg-red-900/50 hover:bg-red-800 text-red-400 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
