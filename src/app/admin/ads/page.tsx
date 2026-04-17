"use client";

import { useState, useEffect, useRef } from "react";
import { createAdminClient } from "@/lib/supabase-admin";

interface Ad {
  id: string;
  slot_id: string;
  name: string;
  type: "image" | "html";
  image_url: string;
  link_url: string;
  html_code: string;
  alt_text: string;
  is_active: boolean;
}

const AD_SLOTS = [
  { id: "homepage-top", label: "Homepage — Top Banner" },
  { id: "homepage-mid", label: "Homepage — Mid Banner" },
  { id: "homepage-bottom", label: "Homepage — Bottom Banner" },
  { id: "sidebar-top", label: "Sidebar — Top" },
  { id: "sidebar-bottom", label: "Sidebar — Bottom" },
  { id: "article-end", label: "Article — End" },
  { id: "article-sidebar-1", label: "Article Sidebar — Top" },
  { id: "article-sidebar-2", label: "Article Sidebar — Bottom" },
  { id: "footer-banner", label: "Footer Banner" },
];

const emptyForm: Omit<Ad, "id"> = {
  slot_id: "", name: "", type: "image",
  image_url: "", link_url: "", html_code: "", alt_text: "", is_active: true,
};

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Ad | null>(null);
  const [form, setForm] = useState<Omit<Ad, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchAds(); }, []);

  async function fetchAds() {
    const supabase = createAdminClient();
    const { data } = await supabase.from("ads").select("*").order("created_at", { ascending: false });
    setAds(data || []);
    setLoading(false);
  }

  async function uploadImage(file: File) {
    if (!file.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    setUploading(true);
    const supabase = createAdminClient();
    const ext = file.name.split(".").pop();
    const fileName = `ads/${Date.now()}.${ext}`;
    const { data, error: uploadError } = await supabase.storage.from("article-images").upload(fileName, file, { upsert: true });
    if (uploadError) { setError("Upload failed: " + uploadError.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("article-images").getPublicUrl(data.path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    setUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const supabase = createAdminClient();
    if (editing) {
      await supabase.from("ads").update(form).eq("id", editing.id);
    } else {
      await supabase.from("ads").insert(form);
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchAds();
  }

  async function toggleActive(id: string, current: boolean) {
    const supabase = createAdminClient();
    await supabase.from("ads").update({ is_active: !current }).eq("id", id);
    setAds((prev) => prev.map((a) => a.id === id ? { ...a, is_active: !current } : a));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this ad?")) return;
    const supabase = createAdminClient();
    await supabase.from("ads").delete().eq("id", id);
    setAds((prev) => prev.filter((a) => a.id !== id));
  }

  function openEdit(ad: Ad) {
    setEditing(ad);
    setForm({ slot_id: ad.slot_id, name: ad.name, type: ad.type, image_url: ad.image_url, link_url: ad.link_url, html_code: ad.html_code, alt_text: ad.alt_text, is_active: ad.is_active });
    setShowForm(true);
  }

  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  const setField = (k: keyof typeof form, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-bold text-xl">Ads Manager</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage advertisement slots across the site</p>
        </div>
        <button onClick={openNew} className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm px-5 py-2 rounded-lg transition-colors">
          + New Ad
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-5">{editing ? "Edit Ad" : "New Ad"}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            {error && <p className="text-red-400 text-sm bg-red-950 border border-red-800 rounded-lg px-3 py-2">{error}</p>}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Ad Name</label>
                <input required value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="e.g. Summer Banner" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Ad Slot</label>
                <select required value={form.slot_id} onChange={(e) => setField("slot_id", e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500">
                  <option value="">Select slot…</option>
                  {AD_SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Ad Type</label>
              <div className="flex gap-3">
                {(["image", "html"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setField("type", t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${form.type === t ? "bg-yellow-500 text-gray-900" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
                    {t === "image" ? "Image Banner" : "HTML / AdSense Code"}
                  </button>
                ))}
              </div>
            </div>

            {form.type === "image" ? (
              <>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Ad Image</label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) uploadImage(f); }}
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors mb-2 ${dragOver ? "border-yellow-500 bg-yellow-500/5" : "border-gray-700 hover:border-gray-500"}`}
                  >
                    {uploading ? <p className="text-gray-400 text-sm">Uploading…</p>
                      : form.image_url ? <div><img src={form.image_url} alt="preview" className="max-h-24 mx-auto rounded mb-1" /><p className="text-gray-500 text-xs">Click or drop to replace</p></div>
                      : <p className="text-gray-400 text-sm">Drop image or click to upload</p>}
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }} />
                  </div>
                  <input value={form.image_url} onChange={(e) => setField("image_url", e.target.value)} placeholder="Or paste image URL…" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Link URL</label>
                    <input value={form.link_url} onChange={(e) => setField("link_url", e.target.value)} placeholder="https://advertiser.com" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Alt Text</label>
                    <input value={form.alt_text} onChange={(e) => setField("alt_text", e.target.value)} placeholder="Advertisement description" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500" />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">HTML / AdSense Code</label>
                <textarea rows={6} value={form.html_code} onChange={(e) => setField("html_code", e.target.value)} placeholder="Paste your Google AdSense code or custom HTML here…" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-yellow-500 resize-y" />
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} className="accent-yellow-500" />
              <span className="text-gray-300 text-sm">Active (show on site)</span>
            </label>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-gray-900 font-semibold text-sm px-5 py-2 rounded-lg transition-colors">
                {saving ? "Saving…" : editing ? "Update Ad" : "Create Ad"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-5 py-2 rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ads list */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-white font-semibold">All Ads ({ads.length})</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading…</div>
        ) : ads.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No ads yet. Create your first one!</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {ads.map((ad) => (
              <div key={ad.id} className="px-5 py-4 flex items-center gap-4">
                {ad.type === "image" && ad.image_url && (
                  <img src={ad.image_url} alt={ad.alt_text} className="w-16 h-10 object-cover rounded flex-shrink-0" />
                )}
                {ad.type === "html" && (
                  <div className="w-16 h-10 bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-400 text-xs">HTML</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{ad.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {AD_SLOTS.find((s) => s.id === ad.slot_id)?.label || ad.slot_id}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(ad.id, ad.is_active)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${ad.is_active ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-gray-700 text-gray-400 hover:bg-gray-600"}`}>
                    {ad.is_active ? "Active" : "Inactive"}
                  </button>
                  <button onClick={() => openEdit(ad)} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                  <button onClick={() => handleDelete(ad.id)} className="text-xs bg-red-900/50 hover:bg-red-800 text-red-400 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
