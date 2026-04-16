import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editorial Policy", description: "Newsvera's editorial standards, fact-checking process, and commitment to accuracy." };

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Editorial Policy
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Editorial Policy</h1>
      <p className="text-sm text-gray-500 mb-8"><strong>Last Updated:</strong> November 1, 2024</p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Our Commitment to Accuracy</h2>
          <p>Accuracy is the foundation of Newsvera&apos;s journalism. We do not publish information we cannot verify. Before any factual claim appears in our reporting, it must be confirmed by at least two independent sources or, where that is not possible, clearly attributed to a single named source with the sourcing limitations disclosed to readers.</p>
          <p className="mt-3">We do not value speed over accuracy. When a story is breaking and full verification is not yet possible, we will say so explicitly rather than publish unverified claims as fact.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Fact-Checking Process</h2>
          <p>All significant factual claims in Newsvera articles are reviewed by an editor before publication. For complex technical or scientific claims, we seek review from qualified external experts. Articles that make specific quantitative claims (statistics, financial figures, benchmark results) are reviewed against primary source documents before those figures are published.</p>
          <p className="mt-3">When articles are fact-checked by a named editor, this is noted in the article byline as &ldquo;Fact-checked by [Name].&rdquo; This designation signifies that the article received enhanced verification scrutiny beyond standard editorial review.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Source Verification Standards</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We prefer named sources and will identify them fully when they agree to attribution</li>
            <li>Anonymous sources are used only when the information is newsworthy and cannot be obtained through on-record means, and when the source has direct knowledge of the facts reported</li>
            <li>We do not grant anonymity solely to allow sources to attack or disparage others</li>
            <li>When we rely on anonymous sources, we disclose the reason for anonymity to readers</li>
            <li>Documents and data are authenticated before we report on their contents</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Conflict of Interest Policy</h2>
          <p>Newsvera journalists and editors must disclose any personal, financial, or professional relationship that could create a real or perceived conflict of interest in their reporting. We do not allow reporters to cover companies in which they hold financial interests. We do not accept gifts, free products, or other consideration from companies we cover that could reasonably influence our coverage.</p>
          <p className="mt-3">Journalists who are invited to company events, product launches, or press trips will disclose this in relevant coverage. Travel paid for by companies we cover is disclosed in affected articles.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Corrections and Updates</h2>
          <p>When we make factual errors, we correct them promptly and transparently. Corrections are appended to the affected article with a clear description of what was wrong and what the correct information is. Significant corrections are noted at the top of the article. All corrections are catalogued on our <Link href="/corrections" className="text-primary-900 dark:text-accent-400 hover:underline">Corrections &amp; Clarifications page</Link>.</p>
          <p className="mt-3">When new information emerges that updates but does not contradict our previous reporting, we update the article and note the date and nature of the update at the top or bottom of the piece.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Separation of News and Opinion</h2>
          <p>Newsvera clearly labels opinion content. Opinion articles appear in the &ldquo;Opinion&rdquo; category and carry a clear &ldquo;Opinion&rdquo; label. The views expressed in opinion pieces are those of the named author and do not necessarily represent the views of Newsvera as an institution.</p>
          <p className="mt-3">News reporting aims to be fair, balanced, and free of the reporter&apos;s personal views. Analysis and explanatory journalism — which goes beyond pure reporting to provide context and interpretation — is labeled as such.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Advertising and Editorial Independence</h2>
          <p>Our advertising and business teams have no influence over our editorial decisions. Advertisers cannot purchase favorable coverage, request suppression of stories, or influence our editorial calendar. We do not publish &ldquo;native advertising&rdquo; or sponsored content disguised as editorial reporting. Any sponsored content or advertiser partnerships that appear on the Site are clearly labeled.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Use of AI Tools in Journalism</h2>
          <p>Newsvera acknowledges that AI tools are increasingly available to journalists. Our policy is as follows: AI tools may be used to assist with research, transcription, translation, and initial drafting, but all published content must be substantially written, verified, and reviewed by human journalists and editors. We do not publish AI-generated content as original reporting without substantial human involvement and verification.</p>
          <p className="mt-3">When AI tools have materially contributed to an article&apos;s research or writing process, this will be disclosed in the article.</p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Report a Concern</h2>
          <p className="text-sm">If you believe we have made an error, violated our editorial standards, or have concerns about our coverage, please contact our editorial team at <a href="mailto:contact@newsvera.com" className="text-primary-900 dark:text-accent-400 hover:underline">contact@newsvera.com</a> with the subject line &ldquo;Editorial Concern.&rdquo;</p>
        </section>
      </div>
    </div>
  );
}
