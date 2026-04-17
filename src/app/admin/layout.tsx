import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Newsvera",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
