"use client";

import { useState } from "react";

interface NewsletterFormProps {
  variant?: "default" | "dark" | "inline";
  placeholder?: string;
  buttonText?: string;
}

export default function NewsletterForm({
  variant = "default",
  placeholder = "your@email.com",
  buttonText = "Subscribe Free",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  if (done) {
    return (
      <p className="text-green-600 dark:text-green-400 text-sm font-medium py-2">
        ✓ You&apos;re subscribed! Check your inbox.
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
          aria-label="Newsletter email"
        />
        <button
          type="submit"
          className="bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
        >
          {buttonText}
        </button>
      </form>
    );
  }

  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-accent-500"
          aria-label="Newsletter email"
        />
        <button
          type="submit"
          className="w-full bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold py-2 rounded-lg text-sm transition-colors"
        >
          {buttonText}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 sm:max-w-sm px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
        aria-label="Email for newsletter"
      />
      <button
        type="submit"
        className="bg-accent-500 hover:bg-accent-400 text-primary-900 font-bold px-8 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
      >
        {buttonText}
      </button>
    </form>
  );
}
