import React from "react";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-[#FEFAEF] border-t border-gray-200">
      <div className="container mx-auto px-6 pt-10 pb-8">

        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* Brand Section */}
          <div className="text-center md:text-left ">
            <div className="mb-6 flex justify-center md:justify-start">
              <div className="w-[116px] h-[89px] rounded-full flex items-center justify-center">
                <Image src="/images/chedsnyoLogo.png" width={200} height={200} alt="logo" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Amsterdam, The Netherlands
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Email:</span> info@dealclosed.com
            </p>
          </div>

          {/* Link Sections Wrapper */}
          <div className="flex flex-col sm:flex-row gap-10 lg:gap-[250px] text-center sm:text-left mx-auto md:mx-0">

           <div className="flex lg:gap-[200px] gap-[50px] mt-10 lg:mt-0">
             {/* Useful Links */}
            <div className="">
              <h4 className="font-bold text-gray-900 mb-6">Useful Links</h4>
              <ul className="space-y-3">
                {["Explore Freelancers", "Assignments", "Leaderboard", "About Us", "Blogs"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Other Links</h4>
              <ul className="space-y-3">
                {["Contact Us", "Find Business", "Courses", "Privacy Policy", "Terms Of Service"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

           </div>
            {/* Follow Us */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Follow Us</h4>
              <div className="flex justify-center sm:justify-start gap-4">
                {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6 mt-10">
          <p className="text-center text-gray-600 text-sm">
            © 2025 <span className="font-bold">Deal Closed</span>. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
