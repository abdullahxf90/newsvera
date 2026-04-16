import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Newsvera's mission, editorial standards, and the team behind the publication.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / About Us
      </nav>

      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        About Newsvera
      </h1>
      <p className="text-xl text-accent-600 dark:text-accent-400 font-medium mb-8 italic">
        &ldquo;{siteConfig.tagline}&rdquo;
      </p>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Newsvera was founded with a singular purpose: to deliver accurate, timely, and in-depth coverage of technology, business, and innovation with uncompromising editorial standards. In an era of information overload and declining trust in media, we believe the world needs journalism that prioritizes truth over speed, depth over clickbait, and accountability over access.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          We cover the stories that matter — the technological advancements reshaping industries, the business decisions affecting millions of people, the cybersecurity threats challenging our digital infrastructure, and the startups and innovations that could define the next decade. We do this with rigor, transparency, and a deep respect for our readers&apos; intelligence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {[
            { title: "Accuracy", desc: "Every claim we make is verified through multiple independent sources. We correct errors promptly and transparently.", icon: "✓" },
            { title: "Independence", desc: "Our editorial decisions are never influenced by advertisers, investors, or political considerations.", icon: "🛡" },
            { title: "Accessibility", desc: "We write for educated general audiences, not just specialists. Complex topics deserve clear, accessible explanations.", icon: "📖" },
            { title: "Integrity", desc: "We disclose conflicts of interest, identify opinion content clearly, and hold ourselves to the same standards we apply to others.", icon: "⚖" },
          ].map((v) => (
            <div key={v.title} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-2">{v.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{v.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Story</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Newsvera was founded in {siteConfig.foundingYear} by a group of technology journalists and editors who had spent years covering Silicon Valley, Wall Street, and the global technology industry for major publications including Reuters, Bloomberg, TechCrunch, CNET, and The Wall Street Journal.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          We recognized a gap in the market: readers who wanted to stay informed about technology and business developments needed a publication that combined the rigorous standards of established financial journalism with the technical depth and cultural fluency of the best technology reporting. Existing publications did one or the other well, but rarely both.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Since our launch, we have grown rapidly through word of mouth, earning a reputation among technology professionals, investors, and business leaders as a trusted daily source of intelligence on the topics that matter most. Our reporting has been cited in Congressional hearings, academic research, and by other major media organizations.
        </p>
      </section>

      {/* Standards */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Standards</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          Newsvera adheres to a comprehensive set of editorial standards designed to ensure the accuracy, fairness, and independence of our journalism. These standards are detailed in our <Link href="/editorial-policy" className="text-primary-900 dark:text-accent-400 hover:underline">Editorial Policy</Link> and <Link href="/ethics-policy" className="text-primary-900 dark:text-accent-400 hover:underline">Ethics Policy</Link>.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          When we make mistakes — and no organization is perfect — we correct them promptly, transparently, and prominently. Our <Link href="/corrections" className="text-primary-900 dark:text-accent-400 hover:underline">Corrections and Clarifications</Link> page maintains a public record of all significant corrections we have made.
        </p>
      </section>

      {/* Funding */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>How We&apos;re Funded</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          Newsvera is funded through three primary sources: display advertising (including Google AdSense), select affiliate partnerships with technology companies, and direct reader support through newsletter subscriptions.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Advertising revenue supports our operations, but it never influences our editorial decisions. Our advertisers have no input into which stories we cover, how we cover them, or what conclusions we reach. We maintain a strict firewall between our business operations and our newsroom. Full ownership and funding disclosure is available on our <Link href="/ownership" className="text-primary-900 dark:text-accent-400 hover:underline">Ownership &amp; Funding page</Link>.
        </p>
      </section>

      {/* Contact */}
      <section className="bg-primary-900 text-white rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Get in Touch</h2>
        <p className="text-gray-300 mb-4 text-sm">We welcome tips, feedback, press inquiries, and corrections.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(siteConfig.email).map(([key, email]) => (
            <div key={key}>
              <p className="text-gray-500 text-xs uppercase tracking-wide">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              <a href={`mailto:${email}`} className="text-accent-400 hover:text-accent-300 text-sm transition-colors">{email}</a>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/contact" className="inline-block bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
            Contact Us →
          </Link>
        </div>
      </section>
    </div>
  );
}
