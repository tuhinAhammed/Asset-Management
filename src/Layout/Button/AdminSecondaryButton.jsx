import React from 'react';

const AdminSecondaryButton = ({ text, onClick, disabled = false, icon: Icon, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-transparent border-2 border-theme text-theme hover:bg-theme hover:text-secondary rounded-lg font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-primary ${className}`}
    >
      {Icon && <Icon size={18} />}
      {text}
    </button>
  );
};

export default AdminSecondaryButton;
