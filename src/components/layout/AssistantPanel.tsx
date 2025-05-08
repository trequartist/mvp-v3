import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, PenTool, Search, MessageSquare, Settings2, ChevronDown } from 'lucide-react';
import { useStudioStore } from '../../store';
import ProcessingIndicator from '../common/ProcessingIndicator';
import Logo from '../common/Logo';
import { AssistantModeMap } from '../../store/maps';
import type { AssistantMode } from '../../types';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  mode: AssistantMode;
}

const thinkingCopy = {
  [AssistantModeMap.WRITE]: [
    "Crafting your content...",
    "Applying your brand voice...",
    "Refining the message...",
    "Polishing the language..."
  ],
  [AssistantModeMap.RESEARCH]: [
    "Analyzing market data...",
    "Finding relevant insights...",
    "Connecting the dots...",
    "Synthesizing information..."
  ],
  [AssistantModeMap.DISCUSS]: [
    "Processing your question...",
    "Considering different angles...",
    "Formulating a response...",
    "Preparing insights..."
  ]
};

const models = [
  {
    id: 'deepseek-r1',
    name: 'Deepseek R1',
    provider: 'Deepseek',
    icon: '/logos/deepseek.svg'
  },
  {
    id: 'gpt4-turbo',
    name: 'GPT 4.0',
    provider: 'OpenAI',
    icon: '/logos/openai.svg'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    icon: '/logos/deepseek.svg'
  },
  {
    id: 'claude-sonnet-3.7',
    name: 'Claude Sonnet 3.7',
    provider: 'Anthropic',
    icon: '/logos/anthropic.svg',
    badge: 'NEW'
  }
];

const AssistantPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<AssistantMode>(AssistantModeMap.WRITE);
  const [thinkingStage, setThinkingStage] = useState(0);
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-3.7');
  const [showModelPicker, setShowModelPicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: input,
      mode
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    const interval = setInterval(() => {
      setThinkingStage(prev => (prev + 1) % thinkingCopy[mode].length);
    }, 2000);

    await new Promise(resolve => setTimeout(resolve, 6000));
    clearInterval(interval);

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant' as const,
      content: `Here's my ${mode === AssistantModeMap.WRITE ? 'writing suggestion' : mode === AssistantModeMap.RESEARCH ? 'research findings' : 'thoughts'} about "${input}"...`,
      mode
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
    setThinkingStage(0);
  };

  const getActiveAgent = () => {
    switch (mode) {
      case AssistantModeMap.WRITE:
        return { name: 'Copywriter Agent', badge: 'C', color: 'blue' };
      case AssistantModeMap.RESEARCH:
        return { name: 'Research Agent', badge: 'R', color: 'purple' };
      case AssistantModeMap.DISCUSS:
        return { name: 'Copywriter Agent', badge: 'C', color: 'blue' };
      default:
        return null;
    }
  };

  const activeAgent = getActiveAgent();

  return (
    <div className="q-assistant-panel w-96 rounded-lg flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="q-presence">
              <Logo className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-subtitle text-gray-800">Assistant</h3>
                {activeAgent && (
                  <div className={`px-1.5 py-0.5 bg-${activeAgent.color}-100 text-${activeAgent.color}-700 rounded text-xs font-medium`}>
                    {activeAgent.name}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  className="flex items-center gap-2 text-small text-gray-500 hover:text-gray-700 transition-colors group"
                >
                  <img 
                    src={models.find(m => m.id === selectedModel)?.icon}
                    alt="AI Model"
                    className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <span>{models.find(m => m.id === selectedModel)?.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <AnimatePresence>
                  {showModelPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border p-1 z-10"
                    >
                      {models.map(model => (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedModel(model.id);
                            setShowModelPicker(false);
                          }}
                          className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
                            selectedModel === model.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                          }`}
                        >
                          <img 
                            src={model.icon} 
                            alt={model.provider}
                            className="w-4 h-4"
                          />
                          <div className="text-left flex-1">
                            <div className="text-sm font-medium">{model.name}</div>
                            <div className="text-xs text-gray-500">{model.provider}</div>
                          </div>
                          {model.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded">
                              {model.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
            <div className="q-presence">
              <Logo className="w-12 h-12" />
            </div>
            <p className="text-center text-small">
              {mode === AssistantModeMap.WRITE && "I'll help you write and refine your content. What would you like assistance with?"}
              {mode === AssistantModeMap.RESEARCH && "I'll help you research and gather insights. What topic should we explore?"}
              {mode === AssistantModeMap.DISCUSS && "Let's discuss your content strategy. What's on your mind?"}
            </p>
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'q-assistant-message'
                }`}
              >
                <p className="text-body">{message.content}</p>
              </motion.div>
            </div>
          ))
        )}

        {isProcessing && (
          <div className="flex justify-start">
            <div className="max-w-[80%] q-assistant-message">
              <ProcessingIndicator 
                text={thinkingCopy[mode][thinkingStage]}
                size="sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t space-y-3">
        {/* Input Box */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="luminous-input flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full px-3 py-2 bg-transparent text-body focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Mode Selection */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode(AssistantModeMap.WRITE)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              mode === AssistantModeMap.WRITE 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span className="text-small font-medium">Write</span>
            <div className="px-1.5 py-0.5 bg-blue-500 text-white rounded text-[10px] font-medium">C</div>
          </button>
          <button
            onClick={() => setMode(AssistantModeMap.RESEARCH)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              mode === AssistantModeMap.RESEARCH
                ? 'bg-purple-100 text-purple-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span className="text-small font-medium">Research</span>
            <div className="px-1.5 py-0.5 bg-purple-500 text-white rounded text-[10px] font-medium">R</div>
          </button>
          <button
            onClick={() => setMode(AssistantModeMap.DISCUSS)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              mode === AssistantModeMap.DISCUSS
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-small font-medium">Discuss</span>
            <div className="px-1.5 py-0.5 bg-blue-500 text-white rounded text-[10px] font-medium">C</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantPanel;