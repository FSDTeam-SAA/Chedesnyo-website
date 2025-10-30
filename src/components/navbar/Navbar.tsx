"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const TOKEN = session?.user?.accessToken || "";

  // Fetch user profile to get stripeAccountId
  const { data: useData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
  });

  // Stripe account creation mutation
  const createStripDashboard = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-stripe-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Stripe account creation failed");
      return res.json();
    },
    onSuccess: (data) => {
      const url = data?.data?.url;
      if (url) {
        window.location.href = url; // redirect to Stripe onboarding
      } else {
        alert("Stripe onboarding URL not found!");
      }
    },
    onError: (error) => {
      console.error("Stripe error:", error);
      alert("Stripe onboarding failed. Please try again.");
    },
  });

  // Stripe dashboard fetch mutation
  const fetchStripeDashboardLink = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/dashboard-link`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch Stripe dashboard link");
      return res.json();
    },
    onSuccess: (data) => {
      const url = data?.data?.url;
      if (url) {
        window.location.href = url; // redirect to Stripe dashboard
      } else {
        alert("Stripe dashboard URL not found!");
      }
    },
    onError: (error) => {
      console.error("Stripe dashboard error:", error);
      alert("Failed to fetch Stripe dashboard. Please try again.");
    },
  });

  const handleLogout = async () => {
    setIsPopoverOpen(false);
    setIsOpen(false);
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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
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

          {/* Desktop Auth / User */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button className="w-[48px] h-[48px] rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition duration-200 overflow-hidden">
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt="User Profile"
                        width={48}
                        height={48}
                        className="rounded-full object-cover w-full h-full"
                      />
                    ) : (
                      <User size={24} />
                    )}
                  </button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-[300px] shadow-lg border border-gray-200 overflow-hidden">
                  {/* Email & Role */}
                  <div className="px-4 py-3 bg-green-50 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 truncate text-center">
                      {user.email}
                    </p>
                    {user.role && (
                      <p className="text-xs text-gray-500 mt-1 text-center">{user.role}</p>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex flex-col">
                    {[
                      { label: "My Profile", href: "/profile" },
                      { label: "Inbox", href: "/inbox" },
                      ...(user?.role === "business"
                        ? [{ label: "Assignments", href: "/assignment" }]
                        : user?.role === "seles"
                        ? [{ label: "My Assignments", href: "/seles-assignment" }]
                        : []),


                         ...(user?.role === "business"
                        ? [{ label: "My Orders Assignment", href: "/my-orders-for-assignment" },
                       { label: "My Orders Course", href: "/my-orders-for-course" },]
                        : user?.role === "seles"
                        ? [{ label: "My Orders Course", href: "/my-orders-for-course" }]
                        : []),


 { label: "My Purchase Courses", href: "/seles-purchase-course" },
                        { label: "My Purchase Assignment", href: "/seles-assignment" },
                      { label: "My Courses", href: "/courese" },
                      { label: "Withdrawal", href: "/withdrawal" },
                      { label: "Referral Program", href: "/referral" },
                    ].map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsPopoverOpen(false)}
                          className={`block px-4 py-2 text-gray-700 text-sm transition duration-200 hover:bg-gray-100 ${
                            isActive ? "bg-green-100 text-green-700 font-semibold" : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}

                    {/* Stripe Section */}
                    {useData?.data?.stripeAccountId ? (
                      <button
                        onClick={() => {
                          fetchStripeDashboardLink.mutate();
                          setIsPopoverOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
                      >
                        Stripe Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          createStripDashboard.mutate();
                          setIsPopoverOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
                      >
                        Add Stripe Account
                      </button>
                    )}
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                  >
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-[139px] h-[48px] flex items-center justify-center text-[16px] font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-50 transition duration-200"
                >
                  Login
                </Link>

                <div className="w-[3px] h-[32px] bg-[#0A192F]"></div>

                <Link
                  href="/signup"
                  className="w-[139px] h-[48px] flex items-center justify-center text-[16px] font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
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
                      isActive ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth / User */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
              {user ? (
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-200 overflow-hidden">
                      {user.profileImage ? (
                        <Image
                          src={user.profileImage}
                          alt="User Profile"
                          width={48}
                          height={48}
                          className="rounded-full object-cover w-full h-full"
                        />
                      ) : (
                        <User size={24} />
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0 shadow-lg border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-green-50 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 truncate text-center">{user.email}</p>
                      {user.role && <p className="text-xs text-gray-500 mt-1 text-center">{user.role}</p>}
                    </div>

                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
                      onClick={() => setIsPopoverOpen(false)}
                    >
                      Profile
                    </Link>

                    {/* Mobile Stripe Section */}
                    {useData?.data?.stripeAccountId ? (
                      <button
                        onClick={() => {
                          fetchStripeDashboardLink.mutate();
                          setIsPopoverOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
                      >
                        Stripe Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          createStripDashboard.mutate();
                          setIsPopoverOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
                      >
                        Add Stripe Account
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                    >
                      Logout
                    </button>
                  </PopoverContent>
                </Popover>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
