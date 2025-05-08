import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Search, Rocket } from 'lucide-react';
import StrategyAgent from '../agents/StrategyAgent';
import Logo from '../common/Logo';
import ProcessingIndicator from '../common/ProcessingIndicator';

interface AssistantDockProps {
  mode: 'calendar' | 'canvas';
}

const calendarTools = [
  {
    id: 'strategy',
    name: 'Strategy Agent',
    icon: () => (
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-200 rounded-lg shadow-inner" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[14px] font-semibold bg-gradient-to-br from-slate-700 to-slate-500 bg-clip-text text-transparent" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>S</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 rounded-lg" />
      </div>
    ),
    color: 'text-slate-700',
    bgColor: 'bg-gradient-to-br from-slate-100 to-slate-50',
    description: 'Plan your content strategy'
  }
];

const AssistantDock: React.FC<AssistantDockProps> = ({ mode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchingTool, setLaunchingTool] = useState<string | null>(null);

  // Only show in calendar mode
  if (mode !== 'calendar') {
    return null;
  }

  const handleLaunchAgent = async (toolId: string) => {
    if (activeTool === toolId) {
      setActiveTool(null);
      return;
    }

    setLaunchingTool(toolId);
    setIsLaunching(true);
    setIsExpanded(false);

    // Simulate agent initialization
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLaunching(false);
    setLaunchingTool(null);
    setActiveTool(toolId);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      <AnimatePresence>
        {isLaunching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-3 bg-white rounded-lg shadow-lg border p-4"
          >
            <ProcessingIndicator 
              text="Initializing Agent"
              subText="Preparing your AI assistant..."
              size="sm"
            />
          </motion.div>
        )}

        {activeTool === 'strategy' && !isLaunching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-3"
          >
            <StrategyAgent onClose={() => setActiveTool(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ 
          width: isExpanded ? '320px' : '56px',
          height: isExpanded ? 'auto' : '56px'
        }}
        className="bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden"
      >
        <button
          onClick={() => handleLaunchAgent('strategy')}
          className="w-14 h-14 flex items-center justify-center relative group"
        >
          <Logo className="w-9 h-9 text-blue-600" />
          <motion.div
            className="absolute inset-0 bg-blue-500 rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </button>
      </motion.div>
    </div>
  );
};

export default AssistantDock;