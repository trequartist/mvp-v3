import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, MessageSquare, Sparkles, Brain, ArrowRight, Lightbulb } from 'lucide-react';
import ProcessingIndicator from '../common/ProcessingIndicator';
import Logo from '../common/Logo';

interface IdeaTuningModalProps {
  note: StickyNote;
  position: { x: number; y: number };
  onClose: () => void;
  onUpdate: (id: string, content: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
}

const quickPrompts = [
  { id: 'expand', text: 'Flesh this idea out', icon: Brain },
  { id: 'examples', text: 'Add concrete examples', icon: MessageSquare },
  { id: 'improve', text: 'Suggest improvements', icon: Sparkles }
];

const IdeaTuningModal: React.FC<IdeaTuningModalProps> = ({ note, position, onClose, onUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent, quickPrompt?: string) => {
    e.preventDefault();
    if ((!input.trim() && !quickPrompt) || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: quickPrompt || input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    let assistantMessage: Message;
    
    if (quickPrompt === 'Flesh this idea out') {
      assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Prompt engineering isn't obsolete yet—but it's rapidly becoming yesterday's best practice.

Here's an angle worth exploring in your next narrative: Prompt engineering was the necessary bridge that connected us to large language models. It helped clarify our requests to the AI, nudging it toward better answers. But there's a new player—Model Context Protocol (MCP)—that changes the game entirely.

MCP introduces explicit, structured context management, which doesn't just help AI respond—it empowers the model to truly understand and maintain coherence across complex conversations and tasks. It's the difference between repeatedly reminding someone of context in every sentence versus having an ongoing, intuitive dialogue.

Consider positioning MCP not merely as the next evolution, but as the foundational shift toward genuinely conversational AI. The question for your narrative could be: Are you still optimizing prompts, or are you ready to manage context strategically?

What resonates more with your audience—continuing prompt adjustments or shifting to comprehensive context management? Something to reflect on as you frame your story.`
      };
    } else {
      assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Here's a suggestion to improve your idea: "${input}"...`
      };
    }

    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Logo className="w-8 h-8 text-blue-600" />
              <motion.div
                className="absolute inset-0 bg-blue-500 rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h3 className="font-medium">AI Assistant</h3>
              <p className="text-sm text-gray-500">Enhance your ideas</p>
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
                  onClick={(e) => handleSubmit(e, prompt.text)}
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
              <p>Ask me how to improve this idea!</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gradient-to-br from-gray-50 to-white border shadow-sm'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">AI Suggestion</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white border shadow-sm">
                <ProcessingIndicator 
                  text="Thinking..."
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this idea..."
              className="flex-1 px-4 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default IdeaTuningModal;