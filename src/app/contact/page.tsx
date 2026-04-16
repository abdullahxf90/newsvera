"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/../../config/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-900 dark:hover:text-accent-400">Home</Link> / Contact Us
      </nav>

      <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        Contact Us
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
        We welcome tips, corrections, feedback, advertising inquiries, and press requests. We aim to respond within 1–2 business days.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { label: "General Inquiries", email: siteConfig.email.general, desc: "Questions, feedback, reader support" },
            { label: "Editorial / News Tips", email: siteConfig.email.tips, desc: "Story tips, press releases, journalist contacts" },
            { label: "Advertising", email: siteConfig.email.ads, desc: "Ad placements, sponsorships, media kit" },
            { label: "Press & Media", email: siteConfig.email.press, desc: "Interview requests, media partnerships" },
          ].map((c) => (
            <div key={c.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{c.label}</h3>
              <a href={`mailto:${c.email}`} className="text-primary-900 dark:text-accent-400 text-sm hover:underline font-medium">{c.email}</a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.desc}</p>
            </div>
          ))}

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Follow Us</h3>
            <div className="space-y-1">
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-900 dark:hover:text-accent-400 transition-colors">
                𝕏 Twitter / X
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-900 dark:hover:text-accent-400 transition-colors">
                Facebook
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-900 dark:hover:text-accent-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✓</div>
              <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Message Sent!</h2>
              <p className="text-green-700 dark:text-green-400 text-sm">
                Thank you for reaching out. We&apos;ll respond to your message within 1–2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
                <select
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
                >
                  <option>General</option>
                  <option>Editorial / News Tip</option>
                  <option>Advertising</option>
                  <option>Correction Request</option>
                  <option>Technical Issue</option>
                  <option>Press / Media</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
              >
                Send Message
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By submitting this form, you agree to our{" "}
                <Link href="/privacy-policy" className="text-primary-900 dark:text-accent-400 hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
