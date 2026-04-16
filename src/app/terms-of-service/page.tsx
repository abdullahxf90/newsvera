import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = { title: "Terms of Service", description: "Newsvera's terms of service governing use of the website." };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Terms of Service
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8"><strong>Last Updated:</strong> November 1, 2024</p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>1. Acceptance of Terms</h2>
          <p>By accessing or using <strong>newsvera.com</strong> (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you may not access or use the Site. These Terms apply to all visitors, users, and others who access or use the Site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>2. Use of the Site</h2>
          <p className="mb-3">You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use the Site in any way that violates applicable local, national, or international law or regulation</li>
            <li>Transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material</li>
            <li>Attempt to gain unauthorized access to any part of the Site or its related systems</li>
            <li>Use any automated tools (bots, scrapers, spiders) to access the Site without our express written permission</li>
            <li>Reproduce, distribute, modify, or create derivative works of our content without explicit written permission</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
            <li>Engage in any conduct that restricts or inhibits any other person&apos;s use or enjoyment of the Site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>3. Intellectual Property</h2>
          <p>The Site and its entire contents, features, and functionality — including all text, articles, photographs, graphics, logos, and software — are owned by Newsvera, its licensors, or other content providers and are protected by copyright, trademark, and other intellectual property laws. You may share individual articles for personal, non-commercial use with proper attribution and a link to the original. Any other use requires our written consent.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>4. User-Generated Content</h2>
          <p>If you submit any content to us (tips, letters, comments), you grant Newsvera a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, and publish that content. You represent that you own or have the necessary rights to submit such content and that it does not infringe any third-party rights. We reserve the right to remove any content at our sole discretion.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>5. Disclaimer of Warranties</h2>
          <p>THE SITE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEWSVERA DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. TO THE FULLEST EXTENT PERMITTED BY LAW, NEWSVERA DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>6. Limitation of Liability</h2>
          <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, NEWSVERA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL — ARISING FROM YOUR USE OF OR INABILITY TO USE THE SITE, EVEN IF NEWSVERA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY TO YOU SHALL NOT EXCEED $100.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>7. Indemnification</h2>
          <p>You agree to defend, indemnify, and hold harmless Newsvera and its officers, directors, employees, contractors, and agents from any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms or your use of the Site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>8. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Delaware.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>9. Termination</h2>
          <p>We reserve the right to terminate or suspend your access to the Site immediately, without prior notice, for any breach of these Terms. Upon termination, your right to use the Site will immediately cease.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>10. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Changes take effect immediately upon posting. Your continued use of the Site after changes constitutes acceptance of the revised Terms. We will provide notice of material changes through a prominent notice on our Site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>11. Contact</h2>
          <p>Questions about these Terms should be sent to: <a href={`mailto:${siteConfig.email.general}`} className="text-primary-900 dark:text-accent-400 hover:underline">{siteConfig.email.general}</a></p>
        </section>
      </div>
    </div>
  );
}
