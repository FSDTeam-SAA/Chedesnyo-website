"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BreadcrumbHeader } from '@/components/ReusableCard/SubHero';

function LeaderBoard() {
  const [timeframe, setTimeframe] = useState('yearly');
  const [currentPage, setCurrentPage] = useState(1);

  const salesProfessionals = [
    { id: 1, name: 'Maya Russo', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 2, name: 'Marvin McKinney', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 3, name: 'Cody Fisher', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 4, name: 'Theresa Webb', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 5, name: 'Albert Flores', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 6, name: 'Annette Black', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 7, name: 'Brooklyn Simmons', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 8, name: 'Leslie Alexander', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 9, name: 'Arlene McCoy', department: 'Information Technology', sales: '05', rating: '5' },
    { id: 10, name: 'Guy Hawkins', department: 'Information Technology', sales: '05', rating: '5' },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(salesProfessionals.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = salesProfessionals.slice(startIdx, startIdx + itemsPerPage);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getInitial = (name: any) => name.charAt(0).toUpperCase();
  
    const getAvatarColor = (id: number) => {
      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500', 'bg-blue-400', 'bg-orange-500', 'bg-yellow-600', 'bg-red-500', 'bg-orange-600', 'bg-green-500'];
      return colors[id % colors.length];
    };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
            <BreadcrumbHeader
              title="LeaderBoard"
              breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "LeaderBoard", href: "/leaderboard" },
              ]}
            />
      <div className="container mx-auto py-[96px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Top Sales Professionals</h1>
          
          {/* Timeframe Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setTimeframe('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                timeframe === 'yearly'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                timeframe === 'monthly'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                timeframe === 'weekly'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3 mb-8">
          {currentItems.map((professional) => (
            <div key={professional.id} className="bg-black rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full ${getAvatarColor(professional.id)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {getInitial(professional.name)}
                </div>
                
                {/* Name and Department */}
                <div>
                  <p className="text-white font-semibold">{professional.name}</p>
                  <p className="text-gray-400 text-sm">{professional.department}</p>
                </div>
              </div>

              {/* Sales Info */}
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Total Sales: </p>
                  <p className="text-white font-semibold">{professional.sales}</p>
                  <p className="text-gray-400 text-xs">Ratings: $</p>
                </div>

                {/* Rating Badge */}
                <div className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                  {professional.rating}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 rounded font-medium transition-all ${
                  currentPage === num
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {num.toString().padStart(2, '0')}
              </button>
            ))}
            {totalPages > 5 && <span className="text-gray-400">...</span>}
            {totalPages > 5 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="w-8 h-8 rounded font-medium text-gray-400 hover:text-gray-600"
              >
                {totalPages.toString().padStart(2, '0')}
              </button>
            )}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;