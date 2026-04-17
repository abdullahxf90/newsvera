import { Article } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
}

function mapRow(row: Record<string, unknown>): Article {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    featuredImage: String(row.featured_image ?? ""),
    imageCaption: row.image_caption ? String(row.image_caption) : undefined,
    imageCredit: row.image_credit ? String(row.image_credit) : undefined,
    category: String(row.category ?? ""),
    categorySlug: String(row.category_slug ?? ""),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    author: String(row.author ?? ""),
    publishedAt: String(row.published_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
    readTime: Number(row.read_time ?? 0),
    sources: row.sources as Article["sources"],
    factChecker: row.fact_checker ? String(row.fact_checker) : undefined,
    isFeatured: Boolean(row.is_featured),
    isBreaking: Boolean(row.is_breaking),
    isTrending: Boolean(row.is_trending),
    isEditorsPick: Boolean(row.is_editors_pick),
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const client = getClient();
  if (!client) return undefined;
  const { data, error } = await client
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return undefined;
  return mapRow(data as Record<string, unknown>);
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from("articles")
    .select("*")
    .eq("category_slug", categorySlug)
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(mapRow);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from("articles")
    .select("*")
    .eq("is_featured", true)
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(mapRow);
}

export async function getTrendingArticles(): Promise<Article[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from("articles")
    .select("*")
    .eq("is_trending", true)
    .order("published_at", { ascending: false })
    .limit(5);
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(mapRow);
}

export async function getEditorsPicks(): Promise<Article[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from("articles")
    .select("*")
    .eq("is_editors_pick", true)
    .order("published_at", { ascending: false })
    .limit(4);
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(mapRow);
}

export async function getLatestArticles(count = 12): Promise<Article[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(count);
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(mapRow);
}

export async function getRelatedArticles(article: Article, count = 3): Promise<Article[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from("articles")
    .select("*")
    .eq("category_slug", article.categorySlug)
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(count);
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(mapRow);
}

export async function getArticlesByAuthor(authorId: string): Promise<Article[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from("articles")
    .select("*")
    .eq("author", authorId)
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(mapRow);
}

export async function getAllSlugs(): Promise<string[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client.from("articles").select("slug");
  if (error || !data) return [];
  return (data as { slug: string }[]).map((r) => r.slug);
}
