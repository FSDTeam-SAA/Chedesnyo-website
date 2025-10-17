import React from "react";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
}

export function BreadcrumbHeader({ title, breadcrumbs = [] }: BreadcrumbHeaderProps) {
  return (
    <div className="bg-green-600 text-white">
      {/* Main Title Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>

      {/* Breadcrumb Section */}
      <div className="bg-green-700 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 flex-wrap">
            {breadcrumbs.length > 0 ? (
              breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <a
                    href={crumb.href || "#"}
                    className="text-white hover:text-green-100 transition-colors text-sm"
                  >
                    {crumb.label}
                  </a>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight
                      size={16}
                      className="text-white opacity-60"
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <span className="text-white text-sm opacity-80">
                No breadcrumbs
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
