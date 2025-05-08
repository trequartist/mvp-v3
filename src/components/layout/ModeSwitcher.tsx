import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Lightbulb } from 'lucide-react';

interface ModeSwitcherProps {
  isBrainstormMode: boolean;
  onModeChange: (mode: boolean) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ isBrainstormMode, onModeChange }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg p-1 flex relative">
        <button
          onClick={() => onModeChange(false)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            !isBrainstormMode ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <FileText className="w-5 h-5" />
          <div className="text-left">
            <span className="font-medium block">Writing</span>
            <span className="text-xs text-gray-500">Create your post</span>
          </div>
          {!isBrainstormMode && (
            <motion.div
              className="absolute inset-0 border-2 border-blue-200 rounded-lg"
              layoutId="mode-indicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
        
        <button
          onClick={() => onModeChange(true)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            isBrainstormMode ? 'text-yellow-600 bg-yellow-50' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Lightbulb className="w-5 h-5" />
          <div className="text-left">
            <span className="font-medium block">Brainstorm</span>
            <span className="text-xs text-gray-500">Generate ideas</span>
          </div>
          {isBrainstormMode && (
            <motion.div
              className="absolute inset-0 border-2 border-yellow-200 rounded-lg"
              layoutId="mode-indicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ModeSwitcher;