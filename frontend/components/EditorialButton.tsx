import React from 'react';

interface EditorialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'sand';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  asAnchor?: boolean;
  href?: string;
}

export const EditorialButton: React.FC<EditorialButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  asAnchor = false,
  href,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#FF5C1C] text-white hover:bg-[#E54E10] shadow-sm hover:shadow-md',
    dark: 'bg-[#121212] text-white hover:bg-[#1B1B1B] border border-white/10',
    outline: 'bg-transparent text-[#121212] border border-[#121212] hover:bg-[#121212] hover:text-white',
    ghost: 'bg-transparent text-[#121212] hover:bg-[#FAF7F2]',
    sand: 'bg-[#FAF7F2] text-[#121212] border border-[#EAE5DE] hover:bg-[#FDEEE6] hover:text-[#FF5C1C]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-medium',
    md: 'px-6 py-3 text-sm font-medium',
    lg: 'px-8 py-4 text-base font-medium',
  };

  const combinedClasses = `rounded-full flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (asAnchor && href) {
    return (
      <a href={href} className={combinedClasses}>
        {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
};
