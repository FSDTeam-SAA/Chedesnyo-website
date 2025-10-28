"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const session = useSession();
  console.log(session);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Assignments", href: "/assignments" },
    { label: "Explore Freelancers", href: "/explore-freelancers" },
    { label: "Find Businesses", href: "/find-business" },
    { label: "Courses", href: "/courses" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Blogs", href: "/blogs" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-20 h-16 relative">
              <Image
                src="/images/chedsnyoLogo.png"
                alt="Deal Closed Logo"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[18px] font-medium transition duration-200 ${
                    isActive
                      ? "text-green-600 border-b-2 border-green-600 pb-1"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="w-[139px] h-[48px] flex items-center justify-center text-[16px] font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-50 transition duration-200"
            >
              Login
            </Link>

            {/* Divider */}
            <div className="w-[3px] h-[32px] bg-[#0A192F]"></div>

            <Link
              href="/signup"
              className="w-[139px] h-[48px] flex items-center justify-center text-[16px] font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-3 mt-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium py-2 transition duration-200 ${
                      isActive
                        ? "text-green-600 font-semibold"
                        : "text-gray-700 hover:text-green-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/login"
                className="flex-1 px-4 py-2 text-sm font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-50 transition duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
