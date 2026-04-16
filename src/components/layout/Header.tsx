"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/../../config/site";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow ${
        scrolled
          ? "shadow-md bg-white dark:bg-gray-900"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-primary-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/newsletter" className="hover:text-accent-400 transition-colors">
              Newsletter
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/rss" className="hover:text-accent-400 transition-colors">
              RSS Feed
            </Link>
            <span className="text-gray-500">|</span>
            <div className="flex items-center gap-2">
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 transition-colors" aria-label="Twitter">
                𝕏
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 transition-colors text-xs" aria-label="Facebook">
                f
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 transition-colors text-xs" aria-label="LinkedIn">
                in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-2xl sm:text-3xl font-bold text-primary-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                News
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-accent-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                vera
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              {siteConfig.tagline}
            </p>
          </Link>

          {/* Ad Banner Placeholder (728x90) */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded flex items-center justify-center text-gray-400 text-xs"
              style={{ width: 468, height: 60 }}
              data-ad-slot="header-banner"
              data-ad-client={siteConfig.adsense.clientId}
              aria-label="Advertisement"
            >
              <span>Advertisement</span>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 001.06 1.06l-1.59 1.591a.75.75 0 00-1.06-1.06l1.59-1.591z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <Link
              href="/newsletter"
              className="hidden sm:inline-flex items-center gap-1.5 bg-primary-900 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              Subscribe
            </Link>
            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
            <div className="max-w-2xl mx-auto">
              <form action="/search" method="get" className="flex gap-2">
                <input
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, authors..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-primary-900 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto">
            <Link href="/" className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors whitespace-nowrap">
              Home
            </Link>
            {siteConfig.categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <Link href="/about" className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors whitespace-nowrap">
                About
              </Link>
              <Link href="/contact" className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors whitespace-nowrap">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile Nav */}
          {menuOpen && (
            <div className="lg:hidden py-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              {siteConfig.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link href="/about" className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/newsletter" className="block px-3 py-2 text-sm font-medium text-white bg-primary-900 rounded transition-colors text-center mt-2" onClick={() => setMenuOpen(false)}>
                Subscribe to Newsletter
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
