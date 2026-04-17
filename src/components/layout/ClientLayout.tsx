"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  ticker: ReactNode;
  cookie: ReactNode;
}

export default function ClientLayout({ children, header, footer, ticker, cookie }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && ticker}
      {!isAdmin && header}
      <main id="main-content">{children}</main>
      {!isAdmin && footer}
      {!isAdmin && cookie}
    </>
  );
}
