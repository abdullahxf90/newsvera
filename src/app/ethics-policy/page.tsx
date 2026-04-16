import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ethics Policy", description: "Newsvera's ethics guidelines for journalists and editors." };

export default function EthicsPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Ethics Policy
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Ethics Policy</h1>
      <p className="text-sm text-gray-500 mb-8"><strong>Last Updated:</strong> November 1, 2024</p>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <p className="text-lg">Newsvera&apos;s ethics policy governs the conduct of everyone who produces content for our publication. These standards go beyond legal obligations to reflect our commitment to journalistic integrity.</p>
        {[
          { title: "Honesty and Transparency", body: "We are honest with our readers, our sources, and each other. We identify ourselves as journalists when reporting. We do not use deceptive methods to obtain information except in rare circumstances where the story is of significant public interest and the information cannot be obtained by any other means — and even then, only with senior editorial approval." },
          { title: "Independence from Outside Interests", body: "Our journalists do not allow personal, political, financial, or other interests to influence their work. Journalists must recuse themselves from coverage of topics where they have a conflict of interest. Staff are prohibited from accepting gifts worth more than $25 from news sources or companies they cover." },
          { title: "Fair Treatment of Sources and Subjects", body: "We treat all sources and subjects fairly. We give subjects of critical coverage an opportunity to respond before publication. We protect confidential sources as a matter of professional obligation. We do not pay for information." },
          { title: "Privacy Considerations", body: "We respect individuals&apos; reasonable expectations of privacy. We do not publish private information about individuals that lacks genuine public interest justification. We are especially careful about the privacy of minors, crime victims, and private individuals who have not sought public attention." },
          { title: "Social Media Standards", body: "Newsvera journalists must maintain the same standards of accuracy, fairness, and professionalism on personal social media accounts as in their published work. Personal opinions on sensitive political or social topics should be shared with care and with clear identification that views are personal, not those of Newsvera." },
          { title: "Reporting on Sensitive Topics", body: "Suicide, sexual assault, mental health, and other sensitive topics are covered in accordance with recognized journalistic best practices, including following guidance from the American Foundation for Suicide Prevention and the Dart Center for Journalism and Trauma." },
          { title: "Engagement with PR and Marketing", body: "Journalists may attend press events and accept meals of reasonable value in the course of reporting. All such relationships are disclosed when relevant to coverage. We do not participate in embargos that restrict our ability to report on a story in the public interest." },
        ].map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Ethics Concerns</h2>
          <p className="text-sm">To report an ethics concern about Newsvera&apos;s journalism, contact <a href="mailto:contact@newsvera.com" className="text-primary-900 dark:text-accent-400 hover:underline">contact@newsvera.com</a> with &ldquo;Ethics Concern&rdquo; in the subject line.</p>
        </section>
      </div>
    </div>
  );
}
