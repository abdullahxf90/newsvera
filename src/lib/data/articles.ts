import { Article } from "@/lib/types";

export const articles: Article[] = [];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.isFeatured);
}

export function getTrendingArticles(): Article[] {
  return articles.filter((a) => a.isTrending).slice(0, 5);
}

export function getEditorsPicks(): Article[] {
  return articles.filter((a) => a.isEditorsPick).slice(0, 4);
}

export function getLatestArticles(count = 12): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  return articles
    .filter((a) => a.id !== article.id && a.categorySlug === article.categorySlug)
    .slice(0, count);
}
