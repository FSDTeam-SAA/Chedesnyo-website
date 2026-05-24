"use client";
import React from "react";
import { Gift, TrendingUp, BarChart3 } from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

function ReferralProgram() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Verwijzingsprogramma"
        breadcrumbs={[
          { label: "Startpagina", href: "/" },
          { label: "Verwijzingsprogramma", href: "/referrel_program" },
        ]}
      />
      <div className="container mx-auto py-[96px] px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Verwijzingsprogramma - verdien geld door te delen
          </h1>
          <p className="text-gray-600 text-base">
            Help anderen werk of salestalent te vinden en verdien met hen mee!
          </p>
        </div>

        <div className="space-y-6">
          {/* How Does It Work */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <Gift className="text-gray-700 mt-1" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                Hoe werkt het?
              </h2>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>Elke gebruiker krijgt een unieke verwijzingslink of code.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  Deel deze met anderen, zoals ervaren freelance salesagenten of
                  bedrijven die hulp zoeken.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-900">•</span>
                <span>
                  Wanneer iemand zich via uw link aanmeldt en een deal voltooit,
                  verdient u commissie.
                </span>
              </li>
            </ul>
          </div>

          {/* How Much Do You Earn */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="text-gray-700 mt-1" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                Hoeveel verdient u?
              </h2>
            </div>
            <div className="space-y-3">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>
                    DealClosed rekent 15% commissie per voltooide deal.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>
                    U verdient 20% van die 15% telkens wanneer uw verwijzing
                    wordt betaald.
                  </span>
                </li>
              </ul>

              {/* Example Box */}
              <div className="bg-gray-100 p-4 rounded-lg mt-4 space-y-2">
                <p className="font-semibold text-gray-900 text-sm">Voorbeeld:</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    Een freelancer verdient{" "}
                    <span className="font-semibold">€1000</span>
                  </p>
                  <p>
                    DealClosed houdt{" "}
                    <span className="font-semibold">€150 (15%)</span>
                  </p>
                  <p>
                    U verdient{" "}
                    <span className="font-semibold">€30 (20% of €150)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Personal Referral Dashboard */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-3 mb-4">
              <BarChart3 className="text-gray-700 mt-1" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                Uw persoonlijke verwijzingsdashboard
              </h2>
            </div>
            <div>
              <p className="text-gray-700 text-sm mb-3">
                Op uw verwijzingspagina ziet u:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>Aantal succesvolle verwijzingen</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>Totaal verdiende commissie</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>Kopieerknop om uw unieke verwijzingslink te delen</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900">•</span>
                  <span>
                    Binnenkort: direct delen via e-mail of sociale platforms
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tip Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 text-sm">
              <span className="font-semibold">Tip:</span> Er is geen limiet aan
              hoeveel mensen u kunt verwijzen. Hoe meer u deelt, hoe meer u
              verdient, zelfs passief!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralProgram;
