import type { Metadata } from "next";
import AdminNav from "./_components/AdminNav";

export const metadata: Metadata = {
  title: "Admin — Newsvera",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "Inter, sans-serif" }}>
      <AdminNav />
      {children}
    </div>
  );
}
