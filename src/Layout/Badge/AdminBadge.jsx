import React from 'react';

const AdminBadge = ({ text, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-theme bg-opacity-20 text-theme',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    secondary: 'bg-quaternary text-primary',
    info: 'bg-lightThemeBg text-theme',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-primary ${variants[variant] || variants.primary} ${className}`}>
      {text}
    </span>
  );
};

export default AdminBadge;
