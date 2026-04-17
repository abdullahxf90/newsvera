"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  published_at: string;
  is_featured: boolean;
  is_breaking: boolean;
  is_trending: boolean;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("articles")
      .select("id, title, slug, category, published_at, is_featured, is_breaking, is_trending")
      .order("published_at", { ascending: false });
    setArticles(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setDeleting(id);
    const supabase = createAdminClient();
    await supabase.from("articles").delete().eq("id", id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
  }

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto w-full">
        {/* Actions row */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles…"
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-500 w-full max-w-xs"
          />
          <Link
            href="/admin/articles/new"
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm px-5 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            + New Article
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: articles.length, color: "text-white" },
            { label: "Featured", value: articles.filter((a) => a.is_featured).length, color: "text-yellow-400" },
            { label: "Breaking", value: articles.filter((a) => a.is_breaking).length, color: "text-red-400" },
            { label: "Trending", value: articles.filter((a) => a.is_trending).length, color: "text-green-400" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Articles table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="text-white font-semibold">All Articles</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500 text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              {search ? "No articles match your search." : "No articles yet. Create your first one!"}
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filtered.map((article) => (
                <div key={article.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-800/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{article.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-500 text-xs">{article.category}</span>
                      <span className="text-gray-700 text-xs">•</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      {article.is_featured && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">Featured</span>}
                      {article.is_breaking && <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">Breaking</span>}
                      {article.is_trending && <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">Trending</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/article/${article.slug}`}
                      target="_blank"
                      className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      disabled={deleting === article.id}
                      className="text-xs bg-red-900/50 hover:bg-red-800 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deleting === article.id ? "…" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
}
