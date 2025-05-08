import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Lightbulb, PenTool, ChevronLeft } from 'lucide-react';
import { useStudioStore } from '../../store';
import Header from './Header';
import ContentBrief from './ContentBrief';
import IdeasTab from '../ideas/IdeasTab';
import ConceptsTab from '../concepts/ConceptsTab';
import PostTab from '../post/PostTab';
import ProcessingIndicator from '../common/ProcessingIndicator';
import { Button } from '../shared';

interface ContentCreatorProps {
  onBack: () => void;
}

type Tab = 'ideas' | 'concepts' | 'post';

const tabs: { 
  id: Tab; 
  label: string; 
  icon: typeof FileText;
  loadingText: string;
}[] = [
  { 
    id: 'ideas', 
    label: 'Ideas', 
    icon: Lightbulb,
    loadingText: "Preparing Brainstorm Mode"
  },
  { 
    id: 'concepts', 
    label: 'Concepts', 
    icon: FileText,
    loadingText: "Loading Concept Explorer"
  },
  { 
    id: 'post', 
    label: 'Post', 
    icon: PenTool,
    loadingText: "Initializing Content Studio"
  }
];

const ContentCreator: React.FC<ContentCreatorProps> = ({ onBack }) => {
  const { initialTab } = useStudioStore();
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [targetTab, setTargetTab] = useState<Tab>(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { showAssistant } = useStudioStore();

  useEffect(() => {
    setActiveTab(initialTab);
    setTargetTab(initialTab);
  }, [initialTab]);

  const handleTabChange = async (tab: Tab) => {
    setIsTransitioning(true);
    setTargetTab(tab);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setActiveTab(tab);
    setIsTransitioning(false);
    if (tab !== 'ideas') {
      showAssistant();
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

  const currentTab = tabs.find(t => t.id === targetTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Content Creator" 
        subtitle="Create and refine your content"
        leftContent={backButton}
      />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Connected Tabs */}
          <div className="flex items-center">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isLast = index === tabs.length - 1;
              
              return (
                <div key={tab.id} className="relative flex items-center">
                  <button
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors
                      ${isActive 
                        ? 'text-blue-600 bg-gray-100' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                  
                  {!isLast && (
                    <div 
                      className={`
                        absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 
                        ${isActive ? 'bg-gray-100' : 'bg-gray-50'} 
                        transform rotate-45 z-10
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Brief */}
          <ContentBrief />

          {/* Tab Content */}
          <div className="relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {isTransitioning ? (
                <motion.div
                  key="transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white"
                >
                  <ProcessingIndicator 
                    text={currentTab?.loadingText || "Loading..."}
                    size="lg"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'ideas' && <IdeasTab />}
                  {activeTab === 'concepts' && <ConceptsTab />}
                  {activeTab === 'post' && <PostTab />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;