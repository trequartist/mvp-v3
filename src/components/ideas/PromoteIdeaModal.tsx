import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bot, Check, FileText, X } from 'lucide-react';
import { Button } from '../shared';
import ProcessingIndicator from '../common/ProcessingIndicator';
import type { StickyNote } from '../../types';

interface PromoteIdeaModalProps {
  note: StickyNote;
  onClose: () => void;
  onPromote: (hook: string, description: string) => void;
}

const PromoteIdeaModal: React.FC<PromoteIdeaModalProps> = ({ note, onClose, onPromote }) => {
  const [hook, setHook] = useState(note.content);
  const [description, setDescription] = useState(note.preview || '');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePromote = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing
    onPromote(hook, description);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-white rounded-xl shadow-xl"
      >
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Promote to Concept</h3>
              <p className="text-sm text-gray-500">Review and refine before promoting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isProcessing ? (
          <div className="p-8">
            <ProcessingIndicator 
              text="Promoting to Concept"
              subText="Preparing your idea for the next stage"
              size="lg"
            />
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Concept Hook
                </label>
                <textarea
                  value={hook}
                  onChange={(e) => setHook(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Write a compelling hook for your concept..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Add more context and details..."
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">AI Suggestion</h4>
                    <p className="text-sm text-blue-800">
                      Consider expanding on the practical implications and potential impact of this idea. 
                      This will help readers better understand its value and applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={Check}
                onClick={handlePromote}
                disabled={!hook.trim() || !description.trim()}
              >
                Promote to Concept
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PromoteIdeaModal;