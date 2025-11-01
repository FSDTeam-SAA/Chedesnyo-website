import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ConnectingSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 lg:py-20">
      <div className="container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-[100px] gap-12 items-start lg:items-stretch">
          {/* Left Section - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full h-full">
              <Image
                src="/images/connectionImage.png"
                alt="Connecting companies with freelance sales agents"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="flex flex-col justify-center items-center h-full space-y-6 text-center lg:text-left">
            {/* Top Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-block">
                <span className="bg-blue-100 text-[#0077B6] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  One Click Make Connection
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold leading-[140%] text-gray-900">
                Connecting <span className="text-[#0077B6]">companies with</span>
                <br />
                <span className="text-[#0077B6]">freelance sales</span> agents
                who deliver.
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                DealClosed is the platform where businesses and freelance sales
                agents meet. No expensive contracts or recruitment agencies —
                just performance-based collaboration.
              </p>

              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                Whether you&apos;re looking to close deals or need someone to
                close them for you, DealClosed is the place to be. Work
                flexibly. Earn fairly. Grow together.
              </p>

              {/* CTA Button */}
              <div className="pt-4 flex justify-center items-center lg:block">
  <Link href="/explore-freelancers">
    <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
      Get Started
      <ChevronRight size={20} />
    </button>
  </Link>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
