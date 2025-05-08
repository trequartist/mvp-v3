import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, X, Send, MessageSquare, Sparkles, Brain, ArrowRight } from 'lucide-react';
import ProcessingIndicator from '../common/ProcessingIndicator';
import { useStudioStore } from '../../store';

interface ConceptTuningModalProps {
  conceptId: string;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
}

const quickPrompts = [
  { id: 'expand', text: 'Expand on this concept', icon: Brain },
  { id: 'examples', text: 'Add concrete examples', icon: MessageSquare },
  { id: 'improve', text: 'Suggest improvements', icon: Sparkles }
];

const ConceptTuningModal: React.FC<ConceptTuningModalProps> = ({ conceptId, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { concepts, updateConcept } = useStudioStore();
  const concept = concepts.find(c => c.id === conceptId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `Here's a suggestion to improve your concept: "${input}"...`
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  if (!concept) return null;

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
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Concept Assistant</h3>
              <p className="text-sm text-gray-500">Enhance your concept</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map(prompt => {
              const Icon = prompt.icon;
              return (
                <button
                  key={prompt.id}
                  onClick={() => setInput(prompt.text)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors group"
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span>{prompt.text}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm gap-2">
              <Bot className="w-12 h-12" />
              <p>Ask me how to improve this concept!</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))
          )}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-4 bg-gray-100">
                <ProcessingIndicator 
                  text="Thinking..."
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this concept..."
              className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ConceptTuningModal;