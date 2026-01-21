import React from 'react';

const AdminCard = ({ title, subtitle = '', children, className = '', actions = null }) => {
  return (
    <div className={`bg-secondary rounded-lg shadow-md p-6 border border-theme border-opacity-10 ${className}`}>
      {title && (
        <div className="mb-6 pb-4 border-b border-theme border-opacity-10">
          <h2 className="text-xl font-bold text-primary font-primary">{title}</h2>
          {subtitle && <p className="text-sm text-tertiary mt-1 font-primary">{subtitle}</p>}
        </div>
      )}
      {children}
      {actions && (
        <div className="mt-6 pt-6 border-t border-theme border-opacity-10 flex items-center justify-between gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default AdminCard;
