"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import PageLayout from "@/components/page-layout/PageLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <div>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
    </PageLayout>
  );
}
