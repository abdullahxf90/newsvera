# Newsvera Launch Checklist

## Domain & Hosting
- [ ] Buy **newsvera.com** domain (avoid .xyz/.info — hurts AdSense approval)
  - Backup options: newsvera.net, newsvera.co, newsvera.io
- [ ] Set up hosting on **Vercel** (recommended — free tier available, excellent Next.js support)
  - Run: `npm i -g vercel && vercel` in the project directory
- [ ] Point domain DNS to Vercel nameservers
- [ ] Enable SSL certificate (automatic with Vercel)

## Professional Email
- [ ] Set up **Google Workspace** or **Zoho Mail** for professional email
  - contact@newsvera.com (general)
  - tips@newsvera.com (editorial tips)
  - ads@newsvera.com (advertising)
  - press@newsvera.com (media)
- [ ] Update `config/site.ts` with real email addresses

## Social Media
- [ ] Create **@newsvera** on Twitter/X
- [ ] Create **Newsvera** Facebook Page
- [ ] Create **Newsvera** LinkedIn Company Page
- [ ] Create **@newsvera** on Instagram
- [ ] Update `config/site.ts` with real social URLs

## Analytics & Verification
- [ ] Create **Google Search Console** account → Add property → Get verification code
  - Add to `config/site.ts` → `verification.google`
- [ ] Set up **Google Analytics 4** → Get Measurement ID (G-XXXXXXXXXX)
  - Add to `.env.local` → `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] Set up **Microsoft Clarity** for heatmaps → Get project ID
- [ ] Bing Webmaster Tools → Get verification code

## AdSense Application Strategy
- [ ] **WAIT 2–4 weeks** after launch before applying (let Google index the site)
- [ ] Publish **2–3 new original articles per week** consistently before applying
- [ ] Aim for at least **50–100 daily visitors** before applying (use social media + SEO)
- [ ] Replace ALL sample articles with **100% original content** before applying
- [ ] Ensure all pages are complete and professional (no stubs)
- [ ] Apply at **adsense.google.com** — select your site and follow review process
- [ ] After approval, replace AdSlot placeholders with real AdSense code in `components/ads/AdSlot.tsx`
- [ ] Start with **manual ad placements** before enabling Auto Ads

## Content Requirements for AdSense Approval
- [ ] Minimum 25–30 high-quality original articles (800+ words each)
- [ ] All legal pages complete and professional (Privacy Policy, Terms, Editorial Policy, etc.)
- [ ] Contact page with real address and email
- [ ] About Us page with real team information
- [ ] No prohibited content (adult, violence, copyrighted material, misleading claims)
- [ ] No broken links — run a link checker before applying
- [ ] Mobile-friendly — test on real devices
- [ ] Fast loading — run PageSpeed Insights (aim for 85+ score)

## Pre-Launch Technical Checklist
- [ ] Run `npm run build` successfully with no errors
- [ ] Test all pages on mobile (iPhone + Android)
- [ ] Test dark mode on all pages
- [ ] Test all navigation links
- [ ] Submit sitemap to Google Search Console (`/sitemap.xml`)
- [ ] Test RSS feed (`/feed.xml`)
- [ ] Verify robots.txt (`/robots.txt`)
- [ ] Test contact form
- [ ] Test newsletter subscription
- [ ] Test cookie consent banner

## Post-Launch (Month 1)
- [ ] Publish new articles consistently (2–3 per week minimum)
- [ ] Share articles on social media
- [ ] Set up Google Search Console and monitor for indexing issues
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Begin outreach for backlinks (other publications, forums, communities)
- [ ] Apply to AdSense after 2–4 weeks and consistent traffic

## Post-Approval (After AdSense)
- [ ] Start with manual ad placements in high-CTR positions
- [ ] Monitor RPM and optimize ad placement
- [ ] After 2 weeks, consider enabling Auto Ads
- [ ] Set up ad refresh for sticky ads
- [ ] Monitor Google AdSense policy compliance carefully

---

**Key Principle:** Quality over speed. AdSense approval rates on first application are highest when the site looks like it has been running for several months with consistent, high-quality original content. Do not rush.
