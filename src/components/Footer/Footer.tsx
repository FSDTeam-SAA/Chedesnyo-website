import React from "react";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-[#FEFAEF] border-t border-gray-200">
      <div className="container mx-auto px-6 pt-10 pb-8">
        {/* Main Content */}
        <div className="flex justify-between">
          {/* Brand Section */}
          <div>
            <div className="mb-6">
              <div className="w-[116px] h-[89px] rounded-full flex items-center justify-center">
                <Image src="/images/chedsnyoLogo.png" width={200} height={200} alt="logo"/>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Amsterdam, The Netherlands
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Email:</span> info@dealclosed.com
            </p>
          </div>

          <div className="flex gap-[200px]">
            {/* Useful Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Useful Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Explore Freelancers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Assignments
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Blogs
                  </a>
                </li>
              </ul>
            </div>

            {/* Other Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Other Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Find Business
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm transition-colors"
                  >
                    Terms Of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          {/* Copyright */}
          <p className="text-center text-gray-600 text-sm">
            @ 2025 <span className="font-bold">Deal closed</span>. All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
