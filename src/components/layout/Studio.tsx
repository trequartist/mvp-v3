import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import AgentGallery from './AgentGallery';
import Canvas from './Canvas';
import ContentBrief from './ContentBrief';
import Header from './Header';
import { Button } from '../shared';
import PostInitiator from '../calendar/PostInitiator';
import ConceptsPicker from '../concepts/ConceptsPicker';
import { useStudioStore } from '../../store';

interface StudioProps {
  onBack: () => void;
}

type View = 'post-initiator' | 'concepts' | 'editor';

const Studio: React.FC<StudioProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<View>('post-initiator');
  const { showAssistant } = useStudioStore();

  const handlePostInitiatorSubmit = (route: 'concepts' | 'editor') => {
    setCurrentView(route);
    showAssistant();
  };

  const handleConceptsPickerSubmit = (route: 'editor' | 'calendar') => {
    if (route === 'editor') {
      setCurrentView('editor');
      showAssistant();
    } else {
      onBack();
    }
  };

  const backButton = (
    <Button
      variant="outline"
      size="sm"
      icon={ChevronLeft}
      onClick={onBack}
    >
      Back to Calendar
    </Button>
  );

  const renderView = () => {
    switch (currentView) {
      case 'post-initiator':
        return (
          <motion.div
            key="post-initiator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PostInitiator
              selectedDate={null}
              onClose={onBack}
              onSubmit={handlePostInitiatorSubmit}
            />
          </motion.div>
        );
      case 'concepts':
        return (
          <motion.div
            key="concepts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ConceptsPicker
              onClose={onBack}
              onSubmit={handleConceptsPickerSubmit}
            />
          </motion.div>
        );
      case 'editor':
        return (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            <ContentBrief />
            <div className="flex gap-6 flex-1">
              <AgentGallery />
              <Canvas />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Content Studio" 
        subtitle="Create and refine your content"
        leftContent={backButton}
      />
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Studio;