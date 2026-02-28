"use client";

import Header from "./Header";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingActions />
    </>
  );
}
