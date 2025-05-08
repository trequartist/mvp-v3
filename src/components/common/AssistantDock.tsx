import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Search, Rocket } from 'lucide-react';
import StrategyAgent from '../agents/StrategyAgent';
import Logo from './Logo';
import ProcessingIndicator from './ProcessingIndicator';

interface AssistantDockProps {
  mode?: 'calendar' | 'canvas';
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

const canvasTools = [
  {
    id: 'copywriter',
    name: 'Copywriter Agent',
    icon: PenTool,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-slate-100 to-blue-50',
    description: 'Enhance your writing'
  },
  {
    id: 'research',
    name: 'Research Agent',
    icon: Search,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-slate-100 to-purple-50',
    description: 'Find relevant insights'
  }
];

const AssistantDock: React.FC<AssistantDockProps> = ({ mode = 'calendar' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchingTool, setLaunchingTool] = useState<string | null>(null);

  const tools = mode === 'calendar' ? calendarTools : canvasTools;
  const defaultTool = mode === 'calendar' ? 'strategy' : 'copywriter';

  React.useEffect(() => {
    setActiveTool(defaultTool);
  }, [defaultTool]);

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
          onClick={() => setIsExpanded(!isExpanded)}
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

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-blue-100/50"
            >
              <div className="p-3 space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTool === tool.id;
                  const isLaunchingThis = launchingTool === tool.id;
                  
                  return (
                    <motion.button
                      key={tool.id}
                      onClick={() => handleLaunchAgent(tool.id)}
                      className={`
                        w-full flex items-center gap-3 p-4 rounded-xl transition-all
                        ${isActive 
                          ? `${tool.bgColor} ${tool.color} shadow-sm`
                          : 'hover:bg-gray-50'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`
                        p-2.5 rounded-xl shadow-sm border border-slate-200/50
                        ${isActive ? 'bg-white/80' : tool.bgColor}
                      `}>
                        <Icon />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-medium text-[15px] leading-none mb-1">{tool.name}</div>
                        <div className="flex items-center gap-1.5">
                          <Rocket className="w-3.5 h-3.5 text-blue-500" />
                          <span className="text-sm text-blue-600 font-medium">Launch Agent</span>
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="w-2 h-2 rounded-full bg-current"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AssistantDock;