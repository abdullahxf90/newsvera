"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-admin";
import ArticleForm from "../../_components/ArticleForm";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Parameters<typeof ArticleForm>[0]["initial"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createAdminClient();
      const { data } = await supabase.from("articles").select("*").eq("id", id).single();
      if (data) {
        setInitial({
          id: data.id,
          title: data.title ?? "",
          slug: data.slug ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          featured_image: data.featured_image ?? "",
          image_caption: data.image_caption ?? "",
          image_credit: data.image_credit ?? "",
          category: data.category ?? "",
          category_slug: data.category_slug ?? "",
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
          author: data.author ?? "",
          published_at: data.published_at ? new Date(data.published_at).toISOString().slice(0, 16) : "",
          read_time: data.read_time ?? 5,
          is_featured: data.is_featured ?? false,
          is_breaking: data.is_breaking ?? false,
          is_trending: data.is_trending ?? false,
          is_editors_pick: data.is_editors_pick ?? false,
        });
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading article…
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-sm">
        Article not found.
      </div>
    );
  }

  return <ArticleForm initial={initial} />;
}
