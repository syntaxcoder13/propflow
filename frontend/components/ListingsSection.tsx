"use client";

import React, { useState } from 'react';
import { AccentHeading } from './AccentHeading';
import { BadgePill } from './BadgePill';
import { PropertyCard, PropertyCardData } from './PropertyCard';

export function ListingsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { label: 'All Listings', id: 'ALL' },
    { label: 'Apartments', id: 'APARTMENT' },
    { label: 'Penthouses', id: 'PENTHOUSE' },
    { label: 'Villas', id: 'VILLA' },
    { label: 'Commercial', id: 'COMMERCIAL' },
  ];

  const properties: PropertyCardData[] = [
    {
      id: 'prop-1',
      title: '2 BHK Luxury Residence at Dombivli East',
      location: 'Dombivli East, Mumbai',
      price: '₹65.0 Lac',
      specs: { bhk: 2, baths: 2, sqft: 780 },
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      tag: 'Verified Scraped',
      category: 'APARTMENT',
    },
    {
      id: 'prop-2',
      title: '3 BHK High-Rise Penthouse with Lake View',
      location: 'Powai Lake, Mumbai',
      price: '₹3.20 Cr',
      specs: { bhk: 3, baths: 3, sqft: 1850 },
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      tag: 'Penthouse',
      category: 'PENTHOUSE',
    },
    {
      id: 'prop-3',
      title: 'Commercial Suite at Financial District',
      location: 'Wall Street, New York',
      price: '$8,500',
      period: '/ month',
      specs: { bhk: 0, baths: 2, sqft: 2400 },
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      tag: 'Prime Office',
      category: 'COMMERCIAL',
    },
    {
      id: 'prop-4',
      title: 'Private Waterfront Villa with Infinity Pool',
      location: 'Mandwa Beach, Alibaug',
      price: '₹6.80 Cr',
      specs: { bhk: 4, baths: 5, sqft: 4200 },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      tag: 'Coastal Villa',
      category: 'VILLA',
    },
    {
      id: 'prop-5',
      title: 'Ultra-Luxury Sea Facing Apartment',
      location: 'Worli Sea Face, South Mumbai',
      price: '₹14.50 Cr',
      specs: { bhk: 4, baths: 4, sqft: 2900 },
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      tag: 'Sea View',
      category: 'APARTMENT',
    },
    {
      id: 'prop-6',
      title: 'Duplex Penthouse at Bandra West',
      location: 'Pali Hill, Bandra West',
      price: '₹9.75 Cr',
      specs: { bhk: 3, baths: 4, sqft: 2200 },
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
      tag: 'High Demand',
      category: 'PENTHOUSE',
    },
  ];

  const filteredProperties = properties.filter((p) => {
    const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="listings" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#121212] border-t border-[#EAE5DE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <BadgePill variant="orange" className="mb-3">
              CURATED PROPERTY CATALOG
            </BadgePill>
            <AccentHeading
              text="Interactive Listings & Assets"
              focalWord="Assets"
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#121212]"
              discPosition="-top-2 -left-2"
              discSize="w-12 h-12 md:w-16 md:h-16"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#FF5C1C] text-white shadow-sm'
                    : 'bg-white text-[#121212] border border-[#EAE5DE] hover:bg-[#FDEEE6] hover:text-[#FF5C1C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar Container */}
        <div className="mb-10 bg-[#FDEEE6] p-4 rounded-3xl border border-[#FF5C1C]/20 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A7A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by locality, title, or city (e.g. Mumbai, Powai, Alibaug)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-[#EAE5DE] text-sm text-[#121212] placeholder-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-[#FF5C1C]/50"
            />
          </div>
          <span className="text-xs font-semibold text-[#FF5C1C] whitespace-nowrap px-2">
            Showing {filteredProperties.length} Properties
          </span>
        </div>

        {/* Property Cards Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={(id) => alert(`Selected Property ${id}: ${prop.title}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-3xl bg-white border border-[#EAE5DE]">
            <p className="text-[#7A7A7A] font-serif text-lg">No properties found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-bold text-[#FF5C1C] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
