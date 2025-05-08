import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  interactive = false,
  onClick
}) => {
  const Component = interactive ? motion.div : 'div';
  const interactiveProps = interactive ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <Component
      className={`
        relative bg-white rounded-lg border border-surface-tertiary/50 overflow-hidden
        ${interactive ? 'cursor-pointer hover:border-kiwi/50' : ''}
        ${className}
      `}
      onClick={onClick}
      {...interactiveProps}
    >
      {/* Luminous effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>

      {/* Inner glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Component>
  );
};

export default Card;