import React from 'react';

interface AccentHeadingProps {
  text: string;
  focalWord?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  discPosition?: string;
  discSize?: string;
}

export const AccentHeading: React.FC<AccentHeadingProps> = ({
  text,
  focalWord,
  tag = 'h2',
  className = '',
  discPosition = '-top-2 -left-3',
  discSize = 'w-12 h-12 md:w-14 md:h-14',
}) => {
  const Tag = tag;

  if (!focalWord || !text.toLowerCase().includes(focalWord.toLowerCase())) {
    return <Tag className={`font-serif tracking-tight ${className}`}>{text}</Tag>;
  }

  // Regex split to isolate focal word case-insensitively
  const regex = new RegExp(`(${focalWord})`, 'gi');
  const parts = text.split(regex);

  return (
    <Tag className={`font-serif tracking-tight ${className}`}>
      {parts.map((part, index) => {
        if (part.toLowerCase() === focalWord.toLowerCase()) {
          return (
            <span key={index} className="relative inline-block z-10 mx-1">
              {/* Overlapping Orange Backdrop Disc */}
              <span
                className={`absolute ${discPosition} ${discSize} bg-[#FF5C1C] rounded-full -z-10 opacity-90 transition-transform duration-300 hover:scale-110`}
                aria-hidden="true"
              />
              <span className="relative z-10">{part}</span>
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </Tag>
  );
};
