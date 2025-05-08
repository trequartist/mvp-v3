import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar, Target, ArrowRight, Clock, Sparkles } from 'lucide-react';
import ProcessingIndicator from '../common/ProcessingIndicator';

interface StrategyAgentProps {
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  isProcessing?: boolean;
  actions?: {
    type: 'schedule' | 'analyze' | 'suggest';
    description: string;
  }[];
}

const quickPrompts = [
  {
    id: 'content-gaps',
    title: 'Find content gaps',
    description: 'Analyze my content calendar for missing topics',
    icon: Target
  },
  {
    id: 'optimize',
    title: 'Optimize schedule',
    description: 'Suggest optimal posting times and frequency',
    icon: Clock
  },
  {
    id: 'themes',
    title: 'Content themes',
    description: 'Identify potential content themes and series',
    icon: Sparkles
  }
];

const StrategyAgent: React.FC<StrategyAgentProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);

  const handleSubmit = async (e: React.FormEvent, quickPrompt?: string) => {
    e.preventDefault();
    const query = quickPrompt || input;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    const stages = [
      'Analyzing content calendar...',
      'Evaluating content strategy...',
      'Generating recommendations...'
    ];

    for (const [index, stage] of stages.entries()) {
      setProcessingStage(index);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: "Based on your content calendar analysis, I've identified several opportunities:\n\n1. Your AI innovation content is heavily weighted towards technical topics. Consider adding more business impact and ROI-focused posts.\n\n2. There's a gap in cultural adaptation content during the last week of March.\n\n3. The current posting frequency (2-3 times/week) aligns well with your audience engagement patterns.",
      actions: [
        {
          type: 'schedule',
          description: 'Schedule 2 new posts about AI ROI'
        },
        {
          type: 'analyze',
          description: 'View detailed content distribution'
        }
      ]
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSubmit(new Event('submit') as any, prompt);
  };

  return (
    <div className="w-96 bg-white rounded-lg shadow-xl border">
      <div className="p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-200 rounded-xl shadow-sm border border-slate-200/50">
              <span className="text-[14px] font-semibold bg-gradient-to-br from-slate-700 to-slate-500 bg-clip-text text-transparent" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>S</span>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 rounded-xl" />
            </div>
          </div>
          <div>
            <h3 className="font-medium">Strategy Agent</h3>
            <p className="text-sm text-gray-500">Your content strategy advisor</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              <p className="text-sm">How can I help with your content strategy?</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={prompt.id}
                    onClick={() => handleQuickPrompt(prompt.title)}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-left group transition-all flex-1 min-w-[150px]"
                  >
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{prompt.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-slate-700 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.actions && (
                    <div className="mt-3 space-y-2">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          className="w-full flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-slate-50 transition-colors text-sm text-left group"
                        >
                          <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                            {action.type === 'schedule' ? (
                              <Calendar className="w-3.5 h-3.5 text-slate-700" />
                            ) : (
                              <Target className="w-3.5 h-3.5 text-slate-700" />
                            )}
                          </div>
                          <span className="flex-1">{action.description}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg p-4 bg-gray-100">
                  <ProcessingIndicator 
                    text="Analyzing your content"
                    subText={[
                      'Analyzing content calendar...',
                      'Evaluating content strategy...',
                      'Generating recommendations...'
                    ][processingStage]}
                    size="sm"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your content strategy..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="p-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default StrategyAgent;