import React from 'react';
import { motion } from 'framer-motion';
import AgentGallery from '../layout/AgentGallery';
import Canvas from '../layout/Canvas';

const PostTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-6 p-6"
    >
      <AgentGallery />
      <Canvas />
    </motion.div>
  );
};

export default PostTab;