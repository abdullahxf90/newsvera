import { MetadataRoute } from "next";
import { articles } from "@/lib/data/articles";
import { authors } from "@/lib/data/authors";
import { siteConfig } from "@/../../config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/archive`, lastModified: new Date(), changeFrequency: "daily", priority: 0.6 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/corrections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/editorial-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/ethics-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/cookie-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/ownership`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = siteConfig.categories.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/article/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const authorPages: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${base}/author/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages, ...authorPages];
}
