"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <nav className="text-sm text-gray-500 mb-8 text-left">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Newsletter
      </nav>

      {!submitted ? (
        <>
          <div className="text-5xl mb-4">📰</div>
          <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Newsvera Daily
          </h1>
          <p className="text-xl text-accent-600 dark:text-accent-400 font-medium mb-4 italic">
            Intelligence for the technology-forward professional.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Every morning, we deliver the 5 most important stories in technology and business — distilled, contextualised, and written in plain language. Join 50,000+ founders, investors, engineers, and executives who start their day with Newsvera.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
            {[
              { icon: "⚡", title: "Daily Briefing", desc: "Top 5 stories every weekday morning, 7 AM EST" },
              { icon: "🔬", title: "Deep Dives", desc: "Weekly in-depth analysis of one major tech trend" },
              { icon: "💡", title: "Breaking Alerts", desc: "Instant notification for major breaking stories" },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
            />
            <button type="submit" className="bg-primary-900 hover:bg-primary-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm whitespace-nowrap">
              Subscribe Free
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">No spam. Free forever. Unsubscribe anytime.</p>
        </>
      ) : (
        <div className="py-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-primary-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>You&apos;re subscribed!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Welcome to the Newsvera Daily. Your first briefing arrives tomorrow morning at 7 AM EST.
          </p>
          <Link href="/" className="inline-block bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-8 py-3 rounded-lg transition-colors">
            Read Today&apos;s Stories →
          </Link>
        </div>
      )}
    </div>
  );
}
