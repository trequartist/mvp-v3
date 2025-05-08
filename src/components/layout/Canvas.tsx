import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, AlertCircle, Bot, History, RefreshCw,
  FileText, MessageSquare, Brain, CheckCircle, BarChart, Sparkles,
  Clock, X
} from 'lucide-react';
import { useStudioStore } from '../../store';
import TextAlternatives from './TextAlternatives';
import ProcessingIndicator from '../common/ProcessingIndicator';
import { Button, Card } from '../shared';
import { formatTimestamp } from '../../lib/utils';
import type { Alternative } from '../../types';

const Canvas: React.FC = () => {
  const { 
    contentDraft, 
    updateContentDraft,
    actionSummary,
    activeAgent,
    setSelectedTextForAlternatives,
    draftVersions,
    addDraftVersion,
    restoreDraftVersion
  } = useStudioStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [isGeneratingAlternatives, setIsGeneratingAlternatives] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectionTimeout = useRef<NodeJS.Timeout>();

  const handleTextSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start === end) {
      setSelectedText(null);
      if (selectionTimeout.current) {
        clearTimeout(selectionTimeout.current);
      }
      return;
    }

    const text = textarea.value.substring(start, end);
    if (text.length < 10) {
      setSelectedText(null);
      if (selectionTimeout.current) {
        clearTimeout(selectionTimeout.current);
      }
      return;
    }

    // Clear any existing timeout
    if (selectionTimeout.current) {
      clearTimeout(selectionTimeout.current);
    }

    // Set new timeout for 3 seconds
    selectionTimeout.current = setTimeout(() => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectionPosition({
          x: rect.right,
          y: rect.top
        });
      }

      setSelectedText(text);
      generateAlternatives(text);
    }, 3000);
  };

  const generateAlternatives = async (text: string) => {
    setIsGeneratingAlternatives(true);
    setAlternatives([]);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const defaultHooks = useStudioStore.getState().handleTextSelect(text);
    setAlternatives(defaultHooks);
    setIsGeneratingAlternatives(false);
  };

  const handleAlternativeSelect = (content: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const newContent = contentDraft.slice(0, start) + content + contentDraft.slice(end);
    
    updateContentDraft(newContent);
    setSelectedText(null);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContentDraft(e.target.value);
  }, [updateContentDraft]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Save current version
    addDraftVersion(contentDraft);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update with new version
    updateContentDraft(
      "The next wave of fintech innovation won't come from building bigger AI models – it will emerge from creating specialized agents that deeply understand cultural contexts and community financial behaviors.\n\nWe're already seeing this with new credit scoring systems that incorporate cultural understanding, achieving 3-4x higher approval rates while maintaining strong repayment performance. This isn't about lowering standards – it's about finally measuring the right signals in the right context.\n\nTraditional financial systems, built on Western assumptions, miss the rich tapestry of informal financial relationships that define how billions of people actually manage money. By building AI that understands these cultural nuances, we can create truly inclusive financial services that work for everyone."
    );
    
    setIsRefreshing(false);
  };

  useEffect(() => {
    return () => {
      if (selectionTimeout.current) {
        clearTimeout(selectionTimeout.current);
      }
    };
  }, []);

  return (
    <Card className="flex-1 flex flex-col relative overflow-hidden">
      {/* Luminous background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,240,255,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(236,240,255,0.05),transparent_70%)]" />
      
      <div className="relative p-8 flex-1">
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Content Editor
              </h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowVersions(!showVersions)}
                  className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <History className="w-4 h-4" />
                  <span>{draftVersions.length} versions</span>
                </button>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className={`
              relative rounded-xl transition-all duration-300
              ${isEditing ? 'ring-2 ring-blue-500/20' : 'ring-1 ring-gray-200/50'}
            `}>
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-xl pointer-events-none" />
              
              {/* Content area */}
              <textarea
                ref={textareaRef}
                value={contentDraft}
                onChange={handleChange}
                onSelect={handleTextSelect}
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
                className={`
                  w-full min-h-[500px] p-6 font-serif text-lg leading-relaxed outline-none 
                  rounded-xl transition-all duration-200 bg-white
                  placeholder:text-gray-400 placeholder:font-sans placeholder:text-base
                `}
                placeholder="Start writing your post..."
              />

              {/* Status indicators */}
              <div className="absolute bottom-0 left-0 right-0 p-3 border-t bg-gradient-to-r from-gray-50 via-white to-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Voice matching: Professional, Thoughtful</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Character count: {contentDraft.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showVersions && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="absolute bottom-0 left-0 right-0 bg-white border-t shadow-lg rounded-t-xl"
          >
            <div className="p-4 max-h-[300px] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Version History</h3>
                <button
                  onClick={() => setShowVersions(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {draftVersions.map((version, index) => (
                  <div
                    key={version.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => restoreDraftVersion(version.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Version {draftVersions.length - index}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatTimestamp(version.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {version.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {actionSummary && (
          <motion.div
            key="action-summary"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed bottom-8 right-8 bg-white rounded-lg shadow-lg border p-4 max-w-sm z-40"
            style={{
              transformOrigin: 'bottom right'
            }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Bot className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{actionSummary.result}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(actionSummary.timestamp)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {selectedText && (
          <TextAlternatives
            selectedText={selectedText}
            alternatives={alternatives}
            onClose={() => setSelectedText(null)}
            onSelect={handleAlternativeSelect}
            position={selectionPosition}
            isGenerating={isGeneratingAlternatives}
          />
        )}
      </AnimatePresence>
    </Card>
  );
};

export default Canvas;