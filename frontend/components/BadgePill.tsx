import React from 'react';

interface BadgePillProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'orange' | 'dark' | 'sand';
}

export const BadgePill: React.FC<BadgePillProps> = ({
  children,
  className = '',
  icon,
  variant = 'orange',
}) => {
  const variantStyles = {
    orange: 'bg-[#FDEEE6] text-[#FF5C1C] border border-[#FF5C1C]/20',
    dark: 'bg-[#1B1B1B] text-white border border-white/10',
    sand: 'bg-[#FAF7F2] text-[#121212] border border-[#EAE5DE]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium text-xs tracking-wide transition-all ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </span>
  );
};
