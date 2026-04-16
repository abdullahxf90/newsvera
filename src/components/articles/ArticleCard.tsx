import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { getAuthorById } from "@/lib/data/authors";
import { timeAgo } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "featured" | "compact" | "hero";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const author = getAuthorById(article.author);

  if (variant === "hero") {
    return (
      <article className="relative group overflow-hidden rounded-xl shadow-lg h-[420px] sm:h-[480px]">
        <Link href={`/article/${article.slug}`} className="block h-full">
          <div className="image-zoom h-full">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              {article.isBreaking && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">Breaking</span>
              )}
              <Link
                href={`/category/${article.categorySlug}`}
                className="bg-accent-500 text-primary-900 text-xs font-bold px-2 py-0.5 rounded uppercase hover:bg-accent-400 transition-colors"
                              >
                {article.category}
              </Link>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {article.title}
            </h2>
            <p className="text-gray-200 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-gray-300">
              {author && (
                <div className="flex items-center gap-1.5">
                  <Image src={author.avatar} alt={author.name} width={20} height={20} className="rounded-full object-cover" />
                  <span>{author.name}</span>
                </div>
              )}
              <span>·</span>
              <span>{timeAgo(article.publishedAt)}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="group">
        <Link href={`/article/${article.slug}`} className="block">
          <div className="image-zoom relative aspect-video rounded-lg overflow-hidden mb-3">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {article.isBreaking && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">Breaking</span>
            )}
          </div>
          <Link
            href={`/category/${article.categorySlug}`}
            className="text-accent-600 dark:text-accent-400 text-xs font-bold uppercase tracking-wide hover:underline"
                      >
            {article.category}
          </Link>
          <h3 className="font-bold text-gray-900 dark:text-white mt-1 mb-2 text-base leading-snug group-hover:text-primary-900 dark:group-hover:text-accent-400 transition-colors line-clamp-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">{article.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{timeAgo(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.readTime} min</span>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group flex gap-3">
        <div className="image-zoom relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
          <Link href={`/article/${article.slug}`}>
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </Link>
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={`/category/${article.categorySlug}`}
            className="text-accent-600 dark:text-accent-400 text-xs font-bold uppercase tracking-wide hover:underline"
          >
            {article.category}
          </Link>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 mb-1 leading-snug group-hover:text-primary-900 dark:group-hover:text-accent-400 transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Link href={`/article/${article.slug}`}>{article.title}</Link>
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(article.publishedAt)} · {article.readTime} min</p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group border-b border-gray-100 dark:border-gray-800 pb-3">
        <Link
          href={`/category/${article.categorySlug}`}
          className="text-accent-600 dark:text-accent-400 text-xs font-bold uppercase tracking-wide hover:underline"
        >
          {article.category}
        </Link>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 mb-1 leading-snug group-hover:text-primary-900 dark:group-hover:text-accent-400 transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(article.publishedAt)}</p>
      </article>
    );
  }

  // Default card
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="image-zoom relative aspect-video overflow-hidden">
        <Link href={`/article/${article.slug}`}>
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        {article.isBreaking && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase z-10">Breaking</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/category/${article.categorySlug}`}
            className="text-accent-600 dark:text-accent-400 text-xs font-bold uppercase tracking-wide hover:underline"
          >
            {article.category}
          </Link>
          {article.isTrending && (
            <span className="text-xs text-orange-500 font-medium">🔥 Trending</span>
          )}
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base leading-snug group-hover:text-primary-900 dark:group-hover:text-accent-400 transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {author && (
              <div className="flex items-center gap-1.5">
                <Image src={author.avatar} alt={author.name} width={18} height={18} className="rounded-full object-cover" />
                <span>{author.name}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{timeAgo(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.readTime} min</span>
          </div>
        </div>
      </div>
    </article>
  );
}
