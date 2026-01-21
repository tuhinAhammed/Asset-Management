import React from 'react';

const AdminPrimaryButton = ({ text, onClick, disabled = false, icon: Icon, className = '', loading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-theme hover:bg-themeDeep text-secondary rounded-lg font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-primary ${className}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
      ) : (
        Icon && <Icon size={18} />
      )}
      {text}
    </button>
  );
};

export default AdminPrimaryButton;
