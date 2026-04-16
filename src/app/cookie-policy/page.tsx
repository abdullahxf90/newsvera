import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy", description: "How Newsvera uses cookies and how you can control them." };

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Cookie Policy
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-8"><strong>Last Updated:</strong> November 1, 2024</p>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>What Are Cookies?</h2>
          <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners. Cookies do not contain executable code and cannot access other files on your device.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Types of Cookies We Use</h2>
          <div className="space-y-4">
            {[
              { type: "Essential Cookies", desc: "These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take such as setting your dark/light mode preference, managing your cookie consent settings, and navigating between pages. Without these cookies, the site cannot function properly.", examples: "Session management, dark mode preference, cookie consent status", canDisable: false },
              { type: "Analytics Cookies", desc: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics 4 and Microsoft Clarity. This information helps us improve the website experience.", examples: "Google Analytics (_ga, _gid), Microsoft Clarity (_clck, _clsk)", canDisable: true },
              { type: "Advertising Cookies", desc: "These cookies are used by Google AdSense and our advertising partners to deliver advertisements that are relevant to you based on your interests. They also help measure the effectiveness of advertising campaigns.", examples: "Google AdSense (IDE, ANID), DoubleClick cookies", canDisable: true },
              { type: "Preference Cookies", desc: "These cookies allow the website to remember choices you make — such as your preferred text size and reading settings — to provide a more personalized experience.", examples: "Text size preference, saved articles (localStorage)", canDisable: true },
            ].map((c) => (
              <div key={c.type} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{c.type}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.canDisable ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}`}>
                    {c.canDisable ? "Can be disabled" : "Always active"}
                  </span>
                </div>
                <p className="text-sm mb-2">{c.desc}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400"><strong>Examples:</strong> {c.examples}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Third-Party Cookies</h2>
          <p>Some cookies on our Site are set by third-party services including Google, Microsoft, and social media platforms. These cookies are governed by the respective third parties&apos; privacy policies, which we recommend you review. We have no control over third-party cookies.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>How to Control Cookies</h2>
          <p className="mb-3">You have several options for controlling cookies:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Cookie Consent Banner:</strong> When you first visit Newsvera, you can use our cookie consent banner to accept all cookies, reject non-essential cookies, or customize your preferences by category.</li>
            <li><strong>Browser Settings:</strong> Most browsers allow you to refuse cookies or delete specific cookies. Check your browser&apos;s help documentation for instructions.</li>
            <li><strong>Google Analytics Opt-Out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-900 dark:text-accent-400 hover:underline">Google Analytics Opt-out Browser Add-on</a>.</li>
            <li><strong>Google AdSense:</strong> Manage personalized advertising preferences at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-900 dark:text-accent-400 hover:underline">Google Ad Settings</a>.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Impact of Disabling Cookies</h2>
          <p>Disabling essential cookies will prevent the Site from functioning correctly. Disabling analytics cookies means we cannot improve the site based on user behavior. Disabling advertising cookies means you may still see advertisements, but they will be less relevant to your interests. Disabling preference cookies means your settings will not be remembered between visits.</p>
        </section>
      </div>
    </div>
  );
}
