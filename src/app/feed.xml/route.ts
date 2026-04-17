import { getLatestArticles } from "@/lib/data/articles";
import { getAuthorById } from "@/lib/data/authors";
import { siteConfig } from "@/../../config/site";

export async function GET() {
  const sorted = await getLatestArticles(20);

  const items = sorted
    .map((a) => {
      const author = getAuthorById(a.author);
      return `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${siteConfig.url}/article/${a.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/article/${a.slug}</guid>
      <description><![CDATA[${a.excerpt}]]></description>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <category>${a.category}</category>
      ${author ? `<author>${author.email || siteConfig.email.general} (${author.name})</author>` : ""}
      <enclosure url="${a.featuredImage}" type="image/jpeg" length="0"/>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteConfig.url}/logo.png</url>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  });
}
