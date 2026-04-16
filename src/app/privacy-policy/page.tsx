import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Newsvera's privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Privacy Policy
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        <strong>Effective Date:</strong> January 1, {siteConfig.foundingYear} &nbsp;|&nbsp;
        <strong>Last Updated:</strong> November 1, 2024
      </p>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>1. Introduction</h2>
          <p>
            Newsvera (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit <strong>newsvera.com</strong> (the &ldquo;Site&rdquo;). Please read this policy carefully. If you disagree with its terms, please discontinue use of our Site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>2. Information We Collect</h2>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">2.1 Information You Provide Directly</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Name and email address when subscribing to our newsletter</li>
            <li>Name, email address, and message content when submitting our contact form</li>
            <li>Any information you voluntarily provide in story tips or feedback</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">2.2 Information Collected Automatically</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Usage Data:</strong> Pages visited, time spent, links clicked, referring URLs, and navigation paths</li>
            <li><strong>Device Information:</strong> Browser type, operating system, screen resolution, language settings</li>
            <li><strong>IP Address:</strong> Used for approximate geolocation, security, and fraud prevention</li>
            <li><strong>Cookies and Tracking Technologies:</strong> See our <Link href="/cookie-policy" className="text-primary-900 dark:text-accent-400 hover:underline">Cookie Policy</Link> for full details</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To deliver and operate the Site and its content</li>
            <li>To send newsletters and editorial updates you have subscribed to</li>
            <li>To respond to your inquiries and contact form submissions</li>
            <li>To analyze site traffic and improve user experience</li>
            <li>To serve relevant advertisements through Google AdSense</li>
            <li>To detect and prevent fraud, abuse, and security threats</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>4. Cookies and Tracking</h2>
          <p>
            We use essential, analytics, advertising, and preference cookies. You can manage your cookie preferences through our Cookie Consent Banner or your browser settings. Disabling certain cookies may affect site functionality. See our full <Link href="/cookie-policy" className="text-primary-900 dark:text-accent-400 hover:underline">Cookie Policy</Link> for details on each type of cookie we use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>5. Third-Party Services</h2>
          <p>We use the following third-party services that may collect data about you:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Google Analytics 4:</strong> Website traffic analysis. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-900 dark:text-accent-400 hover:underline">Google Privacy Policy</a></li>
            <li><strong>Google AdSense:</strong> Advertising delivery and personalization. Governed by Google&apos;s privacy policy</li>
            <li><strong>Microsoft Clarity:</strong> User behavior analytics (heatmaps, session recordings)</li>
            <li><strong>Social Media Embeds:</strong> Twitter, YouTube, and LinkedIn embeds may set cookies when content is loaded</li>
          </ul>
          <p className="mt-3">
            We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before interacting with their content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>6. Your Rights (GDPR &amp; CCPA)</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate personal data</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data (the &ldquo;right to be forgotten&rdquo;)</li>
            <li><strong>Portability:</strong> Receive your personal data in a portable format</li>
            <li><strong>Opt-Out of Sale (CCPA):</strong> California residents have the right to opt out of the sale of personal information. We do not sell personal information</li>
            <li><strong>Restrict Processing:</strong> Request that we limit how we process your data</li>
            <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, contact us at <a href={`mailto:${siteConfig.email.general}`} className="text-primary-900 dark:text-accent-400 hover:underline">{siteConfig.email.general}</a>. We will respond within 30 days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>7. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements. Newsletter subscribers&apos; data is retained until you unsubscribe. Contact form submissions are retained for up to 2 years.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>8. Children&apos;s Privacy (COPPA)</h2>
          <p>
            Newsvera is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>9. International Data Transfers</h2>
          <p>
            Our servers are located in the United States. If you are accessing our Site from the European Union or other regions with laws governing data collection and use, please note that your information may be transferred to — and maintained on — computers located outside your jurisdiction. We take appropriate safeguards to protect your data during such transfers in compliance with applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>10. Security</h2>
          <p>
            We implement industry-standard security measures including SSL/TLS encryption, access controls, and regular security audits to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. When we do, we will revise the &ldquo;Last Updated&rdquo; date at the top. For material changes, we will provide prominent notice on our Site. Your continued use of the Site after changes are posted constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>12. Contact</h2>
          <p>
            For privacy-related inquiries, please contact:<br />
            <strong>Newsvera Editorial Team</strong><br />
            Email: <a href={`mailto:${siteConfig.email.general}`} className="text-primary-900 dark:text-accent-400 hover:underline">{siteConfig.email.general}</a>
          </p>
        </section>
      </div>
    </div>
  );
}
