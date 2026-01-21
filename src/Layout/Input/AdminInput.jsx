import React from 'react';

const AdminInput = ({ 
  type = 'text', 
  name, 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  error = '',
  disabled = false,
  className = ''
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-primary mb-2 font-primary">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2 border-2 border-theme border-opacity-30 rounded-lg focus:outline-none focus:border-theme focus:border-opacity-100 text-primary placeholder-tertiary transition duration-300 font-primary disabled:bg-quaternary disabled:opacity-50 ${error ? 'border-red-600' : ''} ${className}`}
      />
      {error && <p className="text-red-600 text-sm mt-1 font-primary">{error}</p>}
    </div>
  );
};

export default AdminInput;
