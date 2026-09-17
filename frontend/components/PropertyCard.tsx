import React from 'react';
import { BadgePill } from './BadgePill';

export interface PropertyCardData {
  id: string;
  title: string;
  location: string;
  price: string;
  period?: string;
  specs: {
    bhk: number;
    baths: number;
    sqft: number;
  };
  image: string;
  tag?: string;
  category?: string;
}

interface PropertyCardProps {
  property: PropertyCardData;
  className?: string;
  onSelect?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  className = '',
  onSelect,
}) => {
  return (
    <div
      className={`group rounded-3xl overflow-hidden bg-white p-4 shadow-sm border border-[#EAE5DE] editorial-card flex flex-col justify-between ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-4 bg-[#FAF7F2]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Tag */}
        {property.tag && (
          <div className="absolute top-3 left-3">
            <BadgePill variant="dark">{property.tag}</BadgePill>
          </div>
        )}
        {/* Quick Action Button */}
        <button
          onClick={() => onSelect?.(property.id)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#121212] hover:bg-[#FF5C1C] hover:text-white transition-all shadow-sm"
          aria-label="View listing details"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Content Metadata */}
      <div className="flex flex-col flex-1 justify-between px-1 pb-1">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-[#7A7A7A] uppercase tracking-wider">
              {property.location}
            </span>
            {property.category && (
              <span className="text-xs font-medium text-[#FF5C1C]">
                {property.category}
              </span>
            )}
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#121212] line-clamp-1 group-hover:text-[#FF5C1C] transition-colors">
            {property.title}
          </h3>
        </div>

        {/* Specifications Ribbon */}
        <div className="flex items-center gap-4 py-3 my-2 border-y border-[#EAE5DE]/60 text-xs font-medium text-[#7A7A7A]">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#FF5C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.specs.bhk} BHK
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#FF5C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {property.specs.baths} Bath
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#FF5C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.specs.sqft.toLocaleString()} SqFt
          </span>
        </div>

        {/* Pricing Footer */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-xs text-[#7A7A7A] block">Starting from</span>
            <span className="font-serif text-xl font-bold text-[#121212]">
              {property.price}
            </span>
            {property.period && (
              <span className="text-xs text-[#7A7A7A] ml-1">{property.period}</span>
            )}
          </div>
          <button
            onClick={() => onSelect?.(property.id)}
            className="text-xs font-semibold text-[#FF5C1C] group-hover:translate-x-1 transition-transform flex items-center gap-1"
          >
            Details &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
