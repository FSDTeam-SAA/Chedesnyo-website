import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
