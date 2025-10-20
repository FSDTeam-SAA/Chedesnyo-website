import { BreadcrumbHeader } from '@/components/ReusableCard/SubHero';
import React from 'react';

function EnrollmentHistory() {
  const courses = [
    {
      title: 'Web Development',
      enrolledOn: '14/10/25'
    }
  ];

  return (
    <div className="">
        {/* Breadcrumb Header */}
              <BreadcrumbHeader
                title="Enrollment History"
                breadcrumbs={[
                  { label: "Home", href: "/" },
                  {
                    label: "Enrollment History",
                    href: "/application",
                  },
                ]}
              />
      <div className="w-full container mx-auto px-10 py-[96px]">
        <div className="mb-6">
          <h2 className="text-lg font-normal text-gray-900">
            Your Enrolled Courses
          </h2>
        </div>
        
        <div className="overflow-x-auto border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-r border-gray-300">
                  Course Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-300">
                  Enrolled On
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                    {course.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {course.enrolledOn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentHistory;