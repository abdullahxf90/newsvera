"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: true,
    advertising: true,
    preferences: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setShow(true);
  }, []);

  const accept = (all: boolean) => {
    const value = all
      ? JSON.stringify({ essential: true, analytics: true, advertising: true, preferences: true })
      : JSON.stringify(prefs);
    localStorage.setItem("cookie_consent", value);
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({ essential: true, analytics: false, advertising: false, preferences: false }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6" role="dialog" aria-label="Cookie consent">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        {!showSettings ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                We use cookies to improve your experience, analyze site traffic, and deliver personalized content and advertisements. By continuing to use Newsvera, you accept our use of cookies.{" "}
                <Link href="/cookie-policy" className="text-primary-900 dark:text-blue-400 underline hover:no-underline">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={reject}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => accept(true)}
                className="px-5 py-2 text-sm bg-primary-900 hover:bg-primary-800 text-white rounded-lg transition-colors font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Cookie Preferences</h3>
            <div className="space-y-3 mb-4">
              {[
                { key: "essential", label: "Essential Cookies", desc: "Required for the website to function. Cannot be disabled.", locked: true },
                { key: "analytics", label: "Analytics Cookies", desc: "Help us understand how visitors use the site (Google Analytics)." },
                { key: "advertising", label: "Advertising Cookies", desc: "Used to deliver personalized advertisements (Google AdSense)." },
                { key: "preferences", label: "Preference Cookies", desc: "Remember your settings like dark mode and text size." },
              ].map(({ key, label, desc, locked }) => (
                <div key={key} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {locked ? (
                      <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">Always on</span>
                    ) : (
                      <button
                        onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          prefs[key as keyof typeof prefs] ? "bg-primary-900" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        aria-checked={prefs[key as keyof typeof prefs]}
                        role="switch"
                      >
                        <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${prefs[key as keyof typeof prefs] ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Back
              </button>
              <button onClick={() => accept(false)} className="px-5 py-2 text-sm bg-primary-900 hover:bg-primary-800 text-white rounded-lg transition-colors font-medium">
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
