"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";
import { siteConfig } from "@/../../config/site";

interface ArticleData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  image_caption: string;
  image_credit: string;
  category: string;
  category_slug: string;
  tags: string;
  author: string;
  published_at: string;
  read_time: number;
  is_featured: boolean;
  is_breaking: boolean;
  is_trending: boolean;
  is_editors_pick: boolean;
}

const empty: ArticleData = {
  title: "", slug: "", excerpt: "", content: "",
  featured_image: "", image_caption: "", image_credit: "",
  category: "", category_slug: "", tags: "", author: "",
  published_at: new Date().toISOString().slice(0, 16),
  read_time: 5,
  is_featured: false, is_breaking: false, is_trending: false, is_editors_pick: false,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ArticleForm({ initial }: { initial?: ArticleData }) {
  const router = useRouter();
  const [data, setData] = useState<ArticleData>(initial ?? empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [imageDragOver, setImageDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof ArticleData, value: unknown) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (title: string) => {
    setData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === "" || prev.slug === slugify(prev.title) ? slugify(title) : prev.slug,
    }));
  };

  const handleCategoryChange = (name: string) => {
    const cat = siteConfig.categories.find((c: { name: string; slug: string }) => c.name === name);
    setData((prev) => ({ ...prev, category: name, category_slug: cat?.slug ?? slugify(name) }));
  };

  async function uploadImage(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setImageUploading(true);
    setError("");
    const supabase = createAdminClient();
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setError("Image upload failed: " + uploadError.message);
      setImageUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("article-images")
      .getPublicUrl(uploadData.path);

    set("featured_image", publicUrl);
    setImageUploading(false);
  }

  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setImageDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadImage(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const supabase = createAdminClient();
    const payload = {
      title: data.title.trim(),
      slug: data.slug.trim(),
      excerpt: data.excerpt.trim(),
      content: data.content.trim(),
      featured_image: data.featured_image.trim(),
      image_caption: data.image_caption.trim(),
      image_credit: data.image_credit.trim(),
      category: data.category.trim(),
      category_slug: data.category_slug.trim(),
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: data.author.trim(),
      published_at: new Date(data.published_at).toISOString(),
      updated_at: new Date().toISOString(),
      read_time: Number(data.read_time),
      is_featured: data.is_featured,
      is_breaking: data.is_breaking,
      is_trending: data.is_trending,
      is_editors_pick: data.is_editors_pick,
    };

    let saveError = null;

    if (data.id) {
      const { error } = await supabase.from("articles").update(payload).eq("id", data.id);
      saveError = error;
    } else {
      const { error } = await supabase.from("articles").insert(payload);
      saveError = error;
    }

    setSaving(false);

    if (saveError) {
      setError("Save failed: " + saveError.message);
      return;
    }

    setSuccess(data.id ? "Article updated!" : "Article published!");
    if (!data.id) setTimeout(() => router.push("/admin"), 1000);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-gray-400 hover:text-white text-sm transition-colors">
          ← Back
        </Link>
        <div className="flex-1">
          <h1 className="text-white font-semibold text-sm">
            {data.id ? "Edit Article" : "New Article"}
          </h1>
        </div>
        <button
          form="article-form"
          type="submit"
          disabled={saving}
          className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-gray-900 font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
        >
          {saving ? "Saving…" : data.id ? "Update" : "Publish"}
        </button>
      </header>

      <form id="article-form" onSubmit={handleSave} className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          {error && <p className="text-red-400 text-sm bg-red-950 border border-red-800 rounded-lg px-4 py-3">{error}</p>}
          {success && <p className="text-green-400 text-sm bg-green-950 border border-green-800 rounded-lg px-4 py-3">{success}</p>}

          {/* Title */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">Title *</label>
            <input
              required
              value={data.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Article headline…"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">Slug *</label>
            <input
              required
              value={data.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="article-url-slug"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">Excerpt *</label>
            <textarea
              required
              rows={2}
              value={data.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Short description shown in article cards…"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">Content *</label>
            <textarea
              required
              rows={18}
              value={data.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Write the full article here. You can use HTML tags like <h2>, <p>, <strong>, <ul>, <blockquote>…"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-yellow-500 transition-colors resize-y"
            />
            <p className="text-gray-600 text-xs mt-1">Supports HTML: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;blockquote&gt;, &lt;a&gt;</p>
          </div>

          {/* Featured image */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">Featured Image</label>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setImageDragOver(true); }}
              onDragLeave={() => setImageDragOver(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors mb-3 ${
                imageDragOver ? "border-yellow-500 bg-yellow-500/5" : "border-gray-700 hover:border-gray-500"
              }`}
            >
              {imageUploading ? (
                <p className="text-gray-400 text-sm">Uploading…</p>
              ) : data.featured_image ? (
                <div>
                  <img src={data.featured_image} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover mb-2" />
                  <p className="text-gray-500 text-xs">Click or drop to replace</p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Drop image here or click to upload</p>
                  <p className="text-gray-600 text-xs">JPG, PNG, WebP supported</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            </div>

            {/* Or paste URL */}
            <input
              value={data.featured_image}
              onChange={(e) => set("featured_image", e.target.value)}
              placeholder="Or paste image URL directly…"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
            />

            <div className="grid grid-cols-2 gap-3 mt-3">
              <input
                value={data.image_caption}
                onChange={(e) => set("image_caption", e.target.value)}
                placeholder="Image caption"
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <input
                value={data.image_credit}
                onChange={(e) => set("image_credit", e.target.value)}
                placeholder="Photo credit"
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          {/* Category */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm">Details</h3>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Category *</label>
              <select
                required
                value={data.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="">Select category…</option>
                {siteConfig.categories.map((c: { name: string; slug: string }) => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Author ID</label>
              <input
                value={data.author}
                onChange={(e) => set("author", e.target.value)}
                placeholder="author-id"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Tags (comma separated)</label>
              <input
                value={data.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="AI, technology, startups"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Read Time (minutes)</label>
              <input
                type="number"
                min={1}
                max={60}
                value={data.read_time}
                onChange={(e) => set("read_time", Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Publish Date</label>
              <input
                type="datetime-local"
                value={data.published_at}
                onChange={(e) => set("published_at", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
          </div>

          {/* Flags */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
            <h3 className="text-white font-semibold text-sm">Visibility Flags</h3>
            {([
              ["is_featured", "Featured (hero section)"],
              ["is_breaking", "Breaking News"],
              ["is_trending", "Trending"],
              ["is_editors_pick", "Editor's Pick"],
            ] as const).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={data[key]}
                  onChange={(e) => set(key, e.target.checked)}
                  className="w-4 h-4 accent-yellow-500"
                />
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{label}</span>
              </label>
            ))}
          </div>

          {/* Quick help */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-white font-semibold text-sm mb-3">Quick Guide</h3>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li>• Slug auto-fills from title</li>
              <li>• Drop or paste an image URL</li>
              <li>• Content supports HTML tags</li>
              <li>• Tags: comma separated</li>
              <li>• Featured = shows in hero</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
