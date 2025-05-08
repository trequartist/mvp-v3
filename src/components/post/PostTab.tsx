import React from 'react';
import { motion } from 'framer-motion';
import { Users2, Eye, Clock } from 'lucide-react';
import AssistantPanel from '../layout/AssistantPanel';
import Canvas from '../layout/Canvas';
import AudienceAnalysis from '../analysis/AudienceAnalysis';

const PostTab: React.FC = () => {
  const [showAudiencePanel, setShowAudiencePanel] = React.useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex gap-6 p-6">
        {/* Assistant Panel */}
        <AssistantPanel />

        {/* Canvas */}
        <Canvas />
      </div>

      {/* Action Bar */}
      <div className="p-6 border-t bg-gradient-to-r from-white via-gray-50/50 to-white">
        <div className="max-w-4xl mx-auto flex items-center justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAudiencePanel(true)}
            className="relative group flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg transition-all duration-200"
          >
            {/* Luminous background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-lg" />
            
            {/* Content */}
            <div className="relative flex items-center gap-2">
              <Users2 className="w-4 h-4" />
              <span className="font-medium">Audience Panel</span>
            </div>

            {/* Pulsing dot */}
            <div className="absolute -top-1 -right-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500" />
              </span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {}}
            className="relative group flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-lg transition-all duration-200"
          >
            {/* Luminous background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-lg" />
            
            {/* Content */}
            <div className="relative flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="font-medium">Preview</span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {}}
            className="relative group flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg transition-all duration-200"
          >
            {/* Luminous background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-lg" />
            
            {/* Content */}
            <div className="relative flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Schedule Post</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Audience Panel Modal */}
      {showAudiencePanel && (
        <AudienceAnalysis onClose={() => setShowAudiencePanel(false)} />
      )}
    </div>
  );
};

export default PostTab;