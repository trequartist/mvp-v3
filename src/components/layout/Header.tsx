import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../common/Logo';

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftContent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, leftContent }) => {
  return (
    <div className="bg-gradient-to-r from-surface-secondary via-blue-50/30 to-surface-secondary border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Logo className="w-10 h-10 text-blue-600" />
              <motion.div
                className="absolute inset-0 bg-blue-500 rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h1 className="text-h2 text-text-primary">{title}</h1>
              {subtitle && (
                <p className="text-subtitle text-text-secondary">{subtitle}</p>
              )}
            </div>
          </div>
          {leftContent}
        </div>
      </div>
    </div>
  );
};

export default Header;