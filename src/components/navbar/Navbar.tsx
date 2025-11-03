"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const TOKEN = session?.user?.accessToken || "";

  // Fetch user profile
  const { data: userData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    enabled: !!TOKEN,
  });

  // Stripe mutations
  const createStripe = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-stripe-account`, {
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Stripe creation failed");
      return res.json();
    },
    onSuccess: (d) => d?.data?.url && (window.location.href = d.data.url),
  });

  const openDashboard = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/dashboard-link`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!res.ok) throw new Error("Dashboard link failed");
      return res.json();
    },
    onSuccess: (d) => d?.data?.url && (window.location.href = d.data.url),
  });

  const handleLogout = async () => {
    setMobileOpen(false);
    setProfileOpen(false);
    await signOut({ callbackUrl: "/" });
  };

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
    <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-16 h-16 relative">
            <Image
              src="/images/chedsnyoLogo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors pb-1 border-b-2 ${
                  isActive
                    ? "text-green-600 border-green-600"
                    : "text-gray-700 border-transparent hover:text-green-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center overflow-hidden hover:bg-green-700 transition"
              >
                {user.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User size={24} />
                )}
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 bg-green-50 border-b text-center">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
                    {user.role && <p className="text-xs text-gray-600">{user.role}</p>}
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  {userData?.data?.stripeAccountId ? (
                    <button
                      onClick={() => {
                        openDashboard.mutate();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Stripe Dashboard
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        createStripe.mutate();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Add Stripe Account
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 h-11 flex items-center justify-center text-green-600 border-2 border-green-600 rounded-full text-sm font-medium hover:bg-green-50 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 h-11 flex items-center justify-center text-white bg-green-600 rounded-full text-sm font-medium hover:bg-green-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-700"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-base font-medium py-2 ${
                  pathname === link.href ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t flex flex-col gap-3">
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="text-left text-sm text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm text-green-600">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)} className="text-sm text-green-600 font-medium">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}