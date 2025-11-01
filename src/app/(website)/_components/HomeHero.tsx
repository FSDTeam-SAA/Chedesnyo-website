import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomeHero() {
  return (
    <div
      className="w-full flex items-center min-h-[85vh] justify-center px-4 lg:py-20 md:py-10 py-10 relative bg-none md:bg-[url('/images/HeroBg.png')] md:bg-cover md:bg-center md:bg-no-repeat"
      // className="bg-none md:bg-[url('/images/HeroBg.png')] bg-cover bg-center bg-no-repeat w-full flex items-center min-h-[80vh] justify-center px-4 py-20 relative"
    >
      <div className="relative container mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-xs font-semibold border border-teal-200">
                ✓ Precision Customization Technology
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[120%] text-black">
                Welcome to <span className="text-[#008000]">Deal Closed</span>
                <br />
                The <span className="text-blue-400">Platform</span> Where Sales
                <br />
                Connects
              </h1>
              <p className="text-base sm:text-lg text-[#3B4759] leading-relaxed mt-2 max-w-xl mx-auto lg:mx-0">
                At DealClosed, we connect companies with freelance sales agents in a
                win-win partnership. Businesses gain access to top sales agents,
                while agents enjoy the freedom to work flexibly anytime, anywhere.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center lg:items-start lg:justify-start w-full text-center">
              <Link href="/courses">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors">
                  Get Started
                  <ChevronRight size={18} />
                </button>
              </Link>
              <Link href="/inbox">
                <button className="border-2 border-[#008000] hover:border-white text-black px-8 py-3 rounded-full font-semibold transition-colors">
                  Contact With Us
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-12 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-[#0077B6]">50K+</p>
                <p className="text-sm text-black mt-1">Satisfied Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-[#0077B6]">100k+</p>
                <p className="text-sm text-black mt-1">Professional Sellers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-[#0077B6]">200k+</p>
                <p className="text-sm text-black mt-1">Companies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
