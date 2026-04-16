import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/../../config/site";

export const metadata: Metadata = { title: "Careers", description: "Join the Newsvera team. Current openings and how to apply." };

export default function CareersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Careers
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Careers at Newsvera</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Join a team of award-winning journalists and technologists committed to the highest standards of independent digital journalism.</p>

      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-yellow-800 dark:text-yellow-300 mb-1">Current Openings</h2>
        <p className="text-yellow-700 dark:text-yellow-400 text-sm">We do not have any open positions at this time. However, we are always interested in hearing from exceptional journalists and technologists. See below for how to reach us.</p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Why Work at Newsvera?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "✍️", title: "Editorial Freedom", desc: "Our journalists have the independence to pursue the stories they believe matter most, supported by rigorous editorial standards." },
            { icon: "🌍", title: "Remote-First", desc: "We are a fully distributed team with members across three continents. Work from anywhere." },
            { icon: "📚", title: "Learning & Development", desc: "Dedicated budget for conferences, courses, and professional development for all team members." },
            { icon: "💰", title: "Competitive Compensation", desc: "Market-rate salaries, equity participation, and comprehensive benefits." },
          ].map((b) => (
            <div key={b.title} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-2">{b.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-900 text-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Send a Speculative Application</h2>
        <p className="text-gray-300 text-sm mb-4">If you are an exceptional journalist, editor, or technologist who shares our mission, we want to hear from you even when we don&apos;t have open positions.</p>
        <a href={`mailto:${siteConfig.email.press}`} className="inline-block bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
          Send Your Application →
        </a>
      </section>
    </div>
  );
}
