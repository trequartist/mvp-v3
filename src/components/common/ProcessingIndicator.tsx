import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface ProcessingIndicatorProps {
  text?: string;
  subText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({ 
  text = "Processing...", 
  subText,
  size = 'md'
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <Logo className={sizes[size]} />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-kiwi-light to-kiwi rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      {text && (
        <div className="text-center">
          <p className="text-subtitle font-medium text-text-primary">{text}</p>
          {subText && <p className="text-small text-text-secondary mt-1">{subText}</p>}
        </div>
      )}
    </div>
  );
};

export default ProcessingIndicator;