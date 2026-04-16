"use client";

import Link from "next/link";
import { useState } from "react";

export default function TipUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ contact: "", subject: "", message: "", anonymous: false });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Tip Us
      </nav>
      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        Submit a News Tip
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        Do you have information about a story that deserves coverage? We want to hear from you. All tips are reviewed by our editorial team. You may submit anonymously.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-blue-600 dark:text-blue-400 text-lg">🔒</span>
        <div>
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Secure Submission</p>
          <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
            Tips submitted through this form are handled with strict confidentiality. If your tip involves sensitive information about a powerful organization, consider using SecureDrop or reaching us via encrypted email using our PGP key (available on request).
          </p>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact (optional — email or secure messaging handle)
            </label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
              placeholder="your@email.com or @signal-username"
            />
            <p className="text-xs text-gray-500 mt-1">Leave blank to submit anonymously. Providing contact info helps us follow up for clarification.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject / Story Topic *</label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
              placeholder="Briefly describe what your tip is about"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Tip *</label>
            <textarea
              required
              rows={7}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm resize-none"
              placeholder="Describe what you know, how you know it, and any documentation or evidence you can provide. The more detail, the better."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={form.anonymous}
              onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-primary-900 focus:ring-primary-900"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
              I want to submit this tip anonymously
            </label>
          </div>

          <button type="submit" className="w-full bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
            Submit Tip
          </button>
        </form>
      ) : (
        <div className="text-center py-8 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800 p-8">
          <div className="text-4xl mb-3">✓</div>
          <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Tip Received</h2>
          <p className="text-green-700 dark:text-green-400 text-sm">Thank you for reaching out. Our editorial team reviews all tips. If we pursue your story, we will reach out if you provided contact information.</p>
        </div>
      )}
    </div>
  );
}
