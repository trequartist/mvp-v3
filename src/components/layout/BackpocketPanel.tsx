import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, Bot, ArrowRight, Filter, Tag, Edit2, Trash2, BookOpen, MessageSquare, Sparkles, Zap, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudioStore } from '../../store';
import type { BackpocketCard } from '../../types';
import ProcessingIndicator from '../common/ProcessingIndicator';

interface BackpocketPanelProps {
  defaultExpanded?: boolean;
}

const BackpocketPanel: React.FC<BackpocketPanelProps> = ({ defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<BackpocketCard | null>(null);
  const [isIntegrating, setIsIntegrating] = useState(false);
  const { backpocketCards, removeBackpocketCard, updateContentDraft } = useStudioStore();

  const filteredCards = backpocketCards.filter(card => {
    const matchesSearch = card.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !selectedType || card.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCardSelect = (card: BackpocketCard) => {
    setSelectedCard(card);
  };

  const handleIntegrate = async () => {
    if (!selectedCard) return;

    setIsIntegrating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateContentDraft(`The most valuable AI companies of the next decade won't be the ones with the biggest models – they'll be the ones that master specialized agentic capabilities.\n\n${selectedCard.content}`);
    setIsIntegrating(false);
    setSelectedCard(null);
  };

  return (
    <motion.div 
      initial={false}
      animate={{ 
        width: isExpanded ? '260px' : '40px',
        transition: { duration: 0.2, ease: 'easeInOut' }
      }}
      className="bg-white rounded-lg shadow-sm relative flex"
    >
      {/* Collapse/Expand Button */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-6 h-6 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          {isExpanded ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Collapsed View */}
      {!isExpanded && (
        <div className="w-10 flex flex-col items-center py-4 gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="writing-mode-vertical text-xs font-medium text-gray-600">
            Backpocket
          </div>
          {backpocketCards.length > 0 && (
            <div className="mt-2 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600">{backpocketCards.length}</span>
            </div>
          )}
        </div>
      )}

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col max-h-screen overflow-hidden"
          >
            <div className="p-3 border-b">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold">Backpocket</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Search backpocket..."
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-3 px-3">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                      !selectedType ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {['research', 'statistic', 'quote', 'trend', 'competitor', 'insight'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                      className={`px-2 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                        selectedType === type ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 p-3 space-y-2 overflow-y-auto">
              <AnimatePresence>
                {selectedCard && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-blue-50 rounded-lg p-3 mb-3"
                  >
                    {isIntegrating ? (
                      <div className="flex flex-col items-center justify-center py-4">
                        <ProcessingIndicator 
                          text="Integrating content..."
                          size="sm"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Selected Card</h3>
                          <button
                            onClick={() => setSelectedCard(null)}
                            className="p-1 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-sm mb-2">{selectedCard.content}</p>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={handleIntegrate}
                            className="flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            Add to Draft
                          </button>
                          <button
                            onClick={() => {
                              // Show AI instructions modal
                            }}
                            className="flex items-center gap-1.5 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs"
                          >
                            <Bot className="w-3.5 h-3.5" />
                            AI Instructions
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {filteredCards.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No cards found</p>
                  <p className="text-xs mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                filteredCards.map((card) => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={() => handleCardSelect(card)}
                    className={`bg-gray-50 rounded-lg p-3 space-y-2 relative cursor-pointer transition-all hover:bg-gray-100 ${
                      selectedCard?.id === card.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {Date.now() - card.createdAt < 5000 && (
                      <div className="absolute inset-0 bg-blue-500/5 rounded-lg animate-pulse" />
                    )}
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-medium capitalize">{card.type}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBackpocketCard(card.id);
                        }}
                        className="p-1 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-sm">{card.content}</p>

                    {card.source && (
                      <p className="text-xs text-gray-500">Source: {card.source}</p>
                    )}

                    {card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Added {new Date(card.createdAt).toLocaleDateString()}</span>
                      {card.lastUsed && (
                        <span>Last used {new Date(card.lastUsed).toLocaleDateString()}</span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BackpocketPanel;