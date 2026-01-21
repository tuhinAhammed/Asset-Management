import React from 'react';
import { HiX } from 'react-icons/hi';

const Modal = ({ isOpen, title, onClose, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-secondary rounded-lg shadow-lg ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-y-auto border border-theme border-opacity-10`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-theme border-opacity-10 sticky top-0 bg-secondary">
          <h2 className="text-xl font-bold text-primary font-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-quaternary rounded transition text-primary"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
