import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PenTool, Bot, MessageSquare, Wand2, ArrowRight, Sparkles, Check, Send } from 'lucide-react';
import { useStudioStore } from '../../store';
import ProcessingIndicator from '../common/ProcessingIndicator';

interface CopywriterAgentModalProps {
  onClose: () => void;
}

const quickActions = [
  {
    id: 'clarity',
    title: 'Enhance Clarity',
    description: 'Make the message clearer and more direct',
    icon: Sparkles
  },
  {
    id: 'impact',
    title: 'Boost Impact',
    description: 'Strengthen key points and examples',
    icon: Wand2
  },
  {
    id: 'cultural',
    title: 'Cultural Resonance',
    description: 'Adapt tone for cultural sensitivity',
    icon: MessageSquare
  }
];

const CopywriterAgentModal: React.FC<CopywriterAgentModalProps> = ({ onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedbackQuery, setFeedbackQuery] = useState('');
  const { contentDraft, updateContentDraft } = useStudioStore();

  const improvements = {
    'clarity': {
      title: "Clarity Improvements",
      before: "The future of personal finance won't be shaped by generic AI assistants – it will be transformed by deeply personalized financial copilots that understand your unique context and culture.",
      after: "AI is revolutionizing personal finance, but not through generic assistants. The real transformation is coming from AI copilots that deeply understand your cultural context and unique financial needs.",
      explanation: "The revised version is more direct and emphasizes the key distinction more clearly. It also brings the cultural aspect forward, which is central to your message."
    },
    'impact': {
      title: "Impact Enhancement",
      before: "Companies using these specialized credit systems see 3-4x higher approval rates while maintaining strong repayment performance. Not because they're lowering standards, but because they're finally measuring the right things in the right context.",
      after: "These specialized credit systems are achieving what seemed impossible: 3-4x higher approval rates with zero compromise on repayment performance. Why? Because they're the first to truly measure creditworthiness through a cultural lens.",
      explanation: "The enhanced version creates more impact by highlighting the counterintuitive nature of the result and using more powerful language to explain the reason."
    },
    'cultural': {
      title: "Cultural Adaptation",
      before: "Traditional systems rely on limited data points and often exclude those without conventional credit histories.",
      after: "Traditional credit systems, built on Western financial assumptions, overlook the rich tapestry of informal financial relationships and community trust networks that define how billions of people actually manage money.",
      explanation: "The revised version acknowledges diverse financial practices more explicitly and uses more culturally inclusive language."
    }
  };

  const handleQuickAction = async (actionId: string) => {
    setSelectedAction(actionId);
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackQuery.trim()) return;
    
    setSelectedAction(null);
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setSelectedAction('clarity'); // Simulated result
  };

  const applyChange = async (newText: string) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedContent = contentDraft.replace(
      improvements[selectedAction as keyof typeof improvements].before,
      newText
    );
    updateContentDraft(updatedContent);
    
    setIsProcessing(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl max-h-[85vh] flex flex-col"
      >
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PenTool className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Copywriter Agent</h3>
              <p className="text-sm text-gray-500">Powered by Claude 3.7 Sonnet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleFeedback} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={feedbackQuery}
                onChange={(e) => setFeedbackQuery(e.target.value)}
                placeholder="Ask for specific writing feedback..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="flex flex-col items-center gap-3 p-6 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-center group"
                >
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-12"
              >
                <ProcessingIndicator 
                  text="Analyzing and improving content..."
                  subText="Applying writing expertise"
                  size="lg"
                />
              </motion.div>
            )}

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-12 flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-lg font-medium text-green-600">Changes applied successfully!</p>
              </motion.div>
            )}

            {selectedAction && !isProcessing && !showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-medium mb-2">{improvements[selectedAction as keyof typeof improvements].title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Bot className="w-4 h-4" />
                    <span>Suggested improvement</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">Current Version</span>
                    </div>
                    <p className="text-gray-600">{improvements[selectedAction as keyof typeof improvements].before}</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-700">Improved Version</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">Recommended</span>
                      </div>
                      <button
                        onClick={() => applyChange(improvements[selectedAction as keyof typeof improvements].after)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        Apply Change
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-blue-800">{improvements[selectedAction as keyof typeof improvements].after}</p>
                  </div>

                  <div className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">Why this works better</span>
                    </div>
                    <p className="text-gray-600">{improvements[selectedAction as keyof typeof improvements].explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CopywriterAgentModal;