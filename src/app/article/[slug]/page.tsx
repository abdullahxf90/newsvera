import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { articles, getArticleBySlug, getRelatedArticles } from "@/lib/data/articles";
import { getAuthorById } from "@/lib/data/authors";
import { formatDate } from "@/lib/utils";
import AdSlot from "@/components/ads/AdSlot";
import ArticleCard from "@/components/articles/ArticleCard";
import { siteConfig } from "@/../../config/site";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Not Found" };
  const author = getAuthorById(article.author);
  return {
    title: article.title,
    description: article.excerpt,
    authors: author ? [{ name: author.name }] : [],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.featuredImage }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.category,
      tags: article.tags,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.featuredImage] },
    alternates: { canonical: `${siteConfig.url}/article/${article.slug}` },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const author = getAuthorById(article.author);
  const related = getRelatedArticles(article, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: author ? { "@type": "Person", name: author.name, url: `${siteConfig.url}/author/${author.slug}` } : undefined,
    publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/article/${article.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link>
              <span>/</span>
              <Link href={`/category/${article.categorySlug}`} className="hover:text-primary-900 dark:hover:text-accent-400">{article.category}</Link>
              <span>/</span>
              <span className="text-gray-400 line-clamp-1">{article.title.slice(0, 50)}…</span>
            </nav>

            {/* Category */}
            <Link href={`/category/${article.categorySlug}`} className="inline-block bg-accent-500 text-primary-900 text-xs font-bold px-3 py-1 rounded uppercase tracking-wide mb-4 hover:bg-accent-400 transition-colors">
              {article.category}
            </Link>

            {/* Tags line */}
            {article.isBreaking && (
              <span className="ml-2 inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide mb-4">
                Breaking News
              </span>
            )}

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-5 leading-relaxed border-l-4 border-accent-500 pl-4">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-5 border-b border-gray-200 dark:border-gray-700">
              {author && (
                <Link href={`/author/${author.slug}`} className="flex items-center gap-2.5 group">
                  <Image src={author.avatar} alt={author.name} width={40} height={40} className="rounded-full object-cover ring-2 ring-accent-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-900 dark:group-hover:text-accent-400 transition-colors">
                      {author.name}
                    </p>
                    <p className="text-xs text-gray-500">{author.title}</p>
                  </div>
                </Link>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>{formatDate(article.publishedAt)}</span>
                <span>·</span>
                <span>Updated {formatDate(article.updatedAt)}</span>
                <span>·</span>
                <span>{article.readTime} min read</span>
                {article.factChecker && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Fact-checked by {article.factChecker}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-gray-500 dark:text-gray-400">Share:</span>
              {[
                { label: "Twitter", icon: "𝕏", color: "bg-black", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${siteConfig.url}/article/${article.slug}` },
                { label: "Facebook", icon: "f", color: "bg-blue-600", href: `https://facebook.com/sharer/sharer.php?u=${siteConfig.url}/article/${article.slug}` },
                { label: "LinkedIn", icon: "in", color: "bg-blue-700", href: `https://linkedin.com/shareArticle?url=${siteConfig.url}/article/${article.slug}&title=${encodeURIComponent(article.title)}` },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`${s.color} text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`} aria-label={`Share on ${s.label}`}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 italic">
                {article.imageCaption}{article.imageCredit && ` — Photo: ${article.imageCredit}`}
              </p>
            )}

            {/* Ad after intro */}
            <AdSlot id="article-top" size="inline" className="my-6" />

            {/* Article Body */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Ad mid */}
            <AdSlot id="article-mid" size="inline" className="my-8" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              {article.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-accent-500 hover:text-primary-900 transition-colors">
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Sources */}
            {article.sources && article.sources.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Sources &amp; References</h3>
                <ul className="space-y-1">
                  {article.sources.map((s, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400">
                      {i + 1}. <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{s.title}</a>
                      {s.publication && <span> — {s.publication}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Author Bio */}
            {author && (
              <div className="mt-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <Image src={author.avatar} alt={author.name} width={64} height={64} className="rounded-full object-cover flex-shrink-0 ring-2 ring-accent-500" />
                  <div>
                    <Link href={`/author/${author.slug}`} className="font-bold text-gray-900 dark:text-white hover:text-primary-900 dark:hover:text-accent-400 transition-colors">
                      {author.name}
                    </Link>
                    <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-1">{author.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{author.bio.slice(0, 300)}…</p>
                    <Link href={`/author/${author.slug}`} className="text-xs text-primary-900 dark:text-accent-400 font-medium hover:underline mt-2 inline-block">
                      More by {author.name} →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Ad after article */}
            <AdSlot id="article-end" size="inline" className="my-8" />

            {/* Comments Placeholder */}
            <div className="mt-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Comments
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Comments powered by Disqus. Load the discussion below or{" "}
                <a href="#" className="text-primary-900 dark:text-accent-400 hover:underline">view the full discussion thread</a>.
              </p>
              <div className="mt-3 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-400">Discussion section loads here</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Related */}
            {related.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 pb-2 border-b-2 border-accent-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
            <AdSlot id="article-sidebar-1" size="medium-rectangle" />
            <div className="mt-6">
              <AdSlot id="article-sidebar-2" size="half-page" />
            </div>
          </div>
        </div>
      </article>

      {/* More from Category */}
      {related.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 border-l-4 border-accent-500 pl-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              More from {article.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
