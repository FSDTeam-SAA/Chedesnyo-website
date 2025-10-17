import React from 'react';
import { TrendingUp, Briefcase, BarChart3, Zap, Target } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function Benefits() {
  const freelanceBenefits = [
    {
      title: 'Work from anywhere',
      description: 'from home, a cafe or while traveling – you choose when and where you work.'
    },
    {
      title: 'Earn attractive commissions',
      description: 'Get paid fairly per closed deal. Your success is in your hands'
    },
    {
      title: 'Diverse opportunities',
      description: 'Explore a wide range of projects and companies that match your skills and interests'
    }
  ];

  const businessBenefits = [
    {
      title: 'More Sales, Less Risk',
      description: 'Only pay for results. No fixed salaries or recruitment fees – just a clear commission per closed deal.'
    },
    {
      title: 'Access to Skilled Sales Agents',
      description: 'Connect with motivated freelancers who are ready to grow your business.'
    },
    {
      title: 'Quick and Easy Collaboration',
      description: 'Post your assignment, select the right sales agent, and let the deals flow.'
    }
  ];

  const whyChooseUs = [
    {
      icon: BarChart3,
      title: 'Transparency',
      description: 'With a simple 15% fee on successful deals, we ensure fairness and clarity in every transaction'
    },
    {
      icon: Zap,
      title: 'Flexibility',
      description: 'We embrace the future of work. Employ sales agents and businesses freedom and choice.'
    },
    {
      icon: Target,
      title: 'Focus on Results',
      description: 'We believe in rewarding outcomes, not effort, creating a performance-driven culture for everyone involved.'
    }
  ];

  return (
    <section className="px-4 py-20">
      <div className="container mx-auto">
        {/* Top Benefits Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Freelance Sales Agents Benefits */}
          <div className="bg-white border-4 border-green-600 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center border-2 border-green-600">
                <TrendingUp className="w-8 h-8 text-green-600" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Benefits for Freelance Sales Agents</h3>
            
            <ul className="space-y-4">
              {freelanceBenefits.map((benefit, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <span className="font-bold text-gray-900">{benefit.title}:</span>
                    <span className="text-gray-700"> {benefit.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Benefits */}
          <div className="bg-white border-4 border-green-600 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center border-2 border-green-600">
                <Briefcase className="w-8 h-8 text-green-600" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Benefits for Business</h3>
            
            <ul className="space-y-4">
              {businessBenefits.map((benefit, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <span className="font-bold text-gray-900">{benefit.title}:</span>
                    <span className="text-gray-700"> {benefit.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left - Why Choose Us Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl lg:row-span-1 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
              <p className="text-green-100 leading-relaxed mb-8">
                We created DealClosed to bridge this gap. By connecting businesses with motivated, freelance sales agents, we offer a win-win solution: businesses grow their revenue without unnecessary overhead, and sales agents gain the flexibility to work how, when, and where they want.
              </p>
            </div>
            <button className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all self-start">
              Learn More
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Right - Why Choose Us Features */}
          {whyChooseUs.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white border-4 border-green-600 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center border-2 border-green-600">
                    <IconComponent className="w-8 h-8 text-green-600" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-700 text-center text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}