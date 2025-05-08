import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Bot } from 'lucide-react';
import ProcessingIndicator from '../common/ProcessingIndicator';
import { Button, Card } from '../shared';
import type { Alternative } from '../../types';

interface TextAlternativesProps {
  selectedText: string;
  alternatives: Alternative[];
  onSelect: (content: string) => void;
  position: { x: number; y: number };
  onClose: () => void;
  isGenerating: boolean;
}

const TextAlternatives: React.FC<TextAlternativesProps> = ({
  selectedText,
  alternatives,
  onSelect,
  position,
  onClose,
  isGenerating
}) => {
  // Calculate optimal position
  const panelWidth = 400;
  const panelOffset = 20;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let xPos = Math.min(position.x + panelOffset, viewportWidth - panelWidth - panelOffset);
  xPos = Math.max(panelOffset, xPos);

  let yPos = position.y - panelOffset;
  if (yPos < panelOffset) {
    yPos = position.y + panelOffset;
  }
  if (yPos + 500 > viewportHeight) {
    yPos = viewportHeight - 500 - panelOffset;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="fixed z-50 w-[400px]"
      style={{
        top: `${yPos}px`,
        left: `${xPos}px`,
        transformOrigin: 'top left'
      }}
    >
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Alternative Suggestions</h3>
              <p className="text-xs text-gray-500">Select a suggestion to replace the selected text</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={X}
            onClick={onClose}
            className="!p-1.5 hover:bg-white/50"
          />
        </div>

        <div className="p-4 space-y-3">
          {isGenerating ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3">
              <ProcessingIndicator 
                text="Analyzing text..."
                subText="Generating alternatives"
                size="md"
              />
            </div>
          ) : (
            alternatives.map((alt) => (
              <motion.div
                key={alt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <Card
                  interactive
                  onClick={() => onSelect(alt.content)}
                  className="relative p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 hover:from-blue-100 hover:to-blue-50 group"
                >
                  <p className="pr-8 text-base text-gray-700 leading-relaxed">{alt.content}</p>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 -translate-x-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TextAlternatives;