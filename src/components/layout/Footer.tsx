import Link from "next/link";
import { siteConfig } from "@/../../config/site";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white mt-16">
      {/* Newsletter Strip */}
      <div className="bg-accent-500 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-primary-900 font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Stay Informed with Newsvera
            </h3>
            <p className="text-primary-800 text-sm mt-1">
              Get the day&apos;s top tech &amp; business stories delivered to your inbox.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <NewsletterForm variant="inline" placeholder="Enter your email" buttonText="Subscribe" />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                News
              </span>
              <span className="text-2xl font-bold text-accent-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                vera
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {siteConfig.tagline}. Newsvera is an independent technology and business news
              publication committed to accuracy, integrity, and responsible journalism.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-sm" aria-label="Follow on Twitter">𝕏 Twitter</a>
              <span className="text-gray-600">|</span>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-sm" aria-label="Follow on Facebook">Facebook</a>
              <span className="text-gray-600">|</span>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors text-sm" aria-label="Follow on LinkedIn">LinkedIn</a>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-primary-800 border border-primary-700 text-xs text-gray-300 px-2 py-1 rounded">
                ✓ Verified Publisher
              </span>
              <span className="inline-flex items-center gap-1 bg-primary-800 border border-primary-700 text-xs text-gray-300 px-2 py-1 rounded">
                ✓ Fact-Checked Content
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Categories</h4>
            <ul className="space-y-2">
              {siteConfig.categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-gray-400 hover:text-accent-400 transition-colors text-sm">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Careers</Link></li>
              <li><Link href="/press" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Press & Media Kit</Link></li>
              <li><Link href="/advertise" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Advertise</Link></li>
              <li><Link href="/tip-us" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Tip Us</Link></li>
              <li><Link href="/newsletter" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Newsletter</Link></li>
              <li><Link href="/archive" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Archive</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Legal & Policies</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Cookie Policy</Link></li>
              <li><Link href="/editorial-policy" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Editorial Policy</Link></li>
              <li><Link href="/ethics-policy" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Ethics Policy</Link></li>
              <li><Link href="/corrections" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Corrections</Link></li>
              <li><Link href="/ownership" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Ownership & Funding</Link></li>
              <li><Link href="/disclaimer" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Disclaimer</Link></li>
              <li><Link href="/sitemap" className="text-gray-400 hover:text-accent-400 transition-colors text-sm">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10 pt-8 border-t border-primary-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">General Inquiries</p>
              <a href={`mailto:${siteConfig.email.general}`} className="text-gray-300 hover:text-accent-400 text-sm transition-colors">
                {siteConfig.email.general}
              </a>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">News Tips</p>
              <a href={`mailto:${siteConfig.email.tips}`} className="text-gray-300 hover:text-accent-400 text-sm transition-colors">
                {siteConfig.email.tips}
              </a>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Advertising</p>
              <a href={`mailto:${siteConfig.email.ads}`} className="text-gray-300 hover:text-accent-400 text-sm transition-colors">
                {siteConfig.email.ads}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              © {year} Newsvera. All rights reserved. Newsvera is committed to responsible, accurate journalism.
            </p>
            <p className="text-gray-600 text-xs">
              Founded {siteConfig.foundingYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
