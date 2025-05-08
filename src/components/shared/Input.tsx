import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className="relative">
          <input
            className={`
              w-full px-3 py-2 bg-transparent border rounded-lg
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-500' : 'border-gray-200/50'}
              focus:outline-none focus:ring-2 
              ${error ? 'focus:ring-red-500/20' : 'focus:ring-blue-500/20'}
              focus:border-transparent
              transition-all duration-200
              ${className}
            `}
            {...props}
          />
          
          {/* Luminous effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-lg" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;