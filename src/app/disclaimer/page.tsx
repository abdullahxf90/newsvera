import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = { title: "Disclaimer", description: "Important disclaimers about Newsvera content and information." };

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Disclaimer
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Disclaimer</h1>
      <p className="text-sm text-gray-500 mb-8"><strong>Last Updated:</strong> November 1, 2024</p>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        {[
          { title: "General Information Disclaimer", body: "The content published on Newsvera is intended for general informational purposes only. While we make every effort to ensure the accuracy and timeliness of our reporting, Newsvera makes no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the information. Any reliance you place on information from Newsvera is strictly at your own risk." },
          { title: "No Professional Advice", body: "Nothing published on Newsvera constitutes financial, investment, legal, medical, or other professional advice. Articles about financial markets, stocks, cryptocurrencies, or business decisions are for informational and journalistic purposes only. You should always consult a qualified professional before making financial, legal, medical, or other decisions. Newsvera is a news publication, not a financial advisor, legal counsel, or medical authority." },
          { title: "No Investment Advice", body: "Newsvera does not recommend or endorse any specific investment, security, financial product, or trading strategy. Market data and financial information published on the Site may be delayed and should not be used for trading purposes. Past performance of any investment discussed does not guarantee future results." },
          { title: "External Links", body: "Newsvera articles may contain links to third-party websites and resources. These links are provided for readers&apos; convenience and informational purposes only. We have no control over the content, accuracy, privacy practices, or availability of external sites. The inclusion of a link does not imply endorsement by Newsvera of the linked site or its content. We accept no responsibility or liability for any content found on linked external sites." },
          { title: "Accuracy of Information", body: "We strive to maintain accuracy but the digital news environment moves quickly. Information published may become outdated, and we cannot always update every article in real time. Dates, figures, and facts accurate at the time of publication may change. For current and authoritative information, please consult primary sources." },
          { title: "Advertising Disclosure", body: "Newsvera displays third-party advertisements. The presence of an advertisement does not constitute an endorsement of the advertised product, service, or company. Newsvera is not responsible for the content of advertisements. Our editorial coverage is independent of our advertising relationships." },
        ].map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-sm">For questions about this disclaimer, contact <a href={`mailto:${siteConfig.email.general}`} className="text-primary-900 dark:text-accent-400 hover:underline">{siteConfig.email.general}</a></p>
        </section>
      </div>
    </div>
  );
}
