import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ConnectingSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-20">
      <div className="container w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        {/* Left Section - Content (60%) */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center h-full space-y-6 text-center lg:text-left">
          {/* <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold px-3 py-1">
            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
            One Click Make Connection
          </div> */}

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold leading-snug">
            <span className="text-[#008000]">Why We Do What We</span>
            <span className="text-black"> Do uncovering</span>
            <br />
            <span className="text-[#0077B6]">purpose behind every action</span>
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            At DealClosed, we believe in solving real-world sales challenges
            with simple, effective solutions. Our platform was created in
            response to a clear need in the market.
          </p>

          {/* For Businesses */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <CheckCircle2
                className="w-6 h-6 text-green-600 mt-1"
                strokeWidth={3}
              />
              <div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="text-gray-700 leading-relaxed">
                    For Businesses:
                  </span>
                  Many companies struggle to find reliable sales talent without
                  long-term contracts or high recruitment costs. They need
                  flexible, results-driven solutions to grow revenue without
                  risk.
                </p>
              </div>
            </div>
          </div>

          {/* For Sales Agents */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <CheckCircle2
                className="w-6 h-6 text-green-600 mt-1"
                strokeWidth={3}
              />
              <div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="text-gray-700 leading-relaxed">
                    For Businesses:
                  </span>
                  Many companies struggle to find reliable sales talent without
                  long-term contracts or high recruitment costs. They need
                  flexible, results-driven solutions to grow revenue without
                  risk.
                </p>
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <div className="pt-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
              Read More
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Section - Image (40%) */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
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
      </div>
    </section>
  );
}
