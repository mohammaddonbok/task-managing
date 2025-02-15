import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
