import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight, Bot, BookOpen, TrendingUp, FileText, Save, Sparkles, Send } from 'lucide-react';
import { useStudioStore } from '../../store';
import ProcessingIndicator from '../common/ProcessingIndicator';

interface ResearchAgentModalProps {
  onClose: () => void;
}

const quickLinks = [
  {
    id: 'market-size',
    title: 'Market Size & Growth',
    description: 'Global financial inclusion market trends',
    icon: TrendingUp
  },
  {
    id: 'case-studies',
    title: 'Success Stories',
    description: 'Case studies of cultural adaptation in FinTech',
    icon: FileText
  },
  {
    id: 'competitors',
    title: 'Competitor Analysis',
    description: 'Cultural approaches in financial services',
    icon: Search
  },
  {
    id: 'innovation',
    title: 'Innovation Trends',
    description: 'Latest in culturally-aware financial AI',
    icon: Sparkles
  }
];

const ResearchAgentModal: React.FC<ResearchAgentModalProps> = ({ onClose }) => {
  const [isResearching, setIsResearching] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addBackpocketCard } = useStudioStore();

  const researchResults = {
    'market-size': {
      title: "Global Financial Inclusion Market Analysis",
      insights: [
        {
          content: "Alternative credit scoring market expected to grow 315% by 2027, driven by AI adoption in emerging markets",
          source: "FinTech Market Report 2024",
          tags: ["Market Growth", "Credit Scoring", "AI"]
        },
        {
          content: "Cultural adaptation in financial services increases user adoption by 2.4x in Southeast Asian markets",
          source: "Regional FinTech Study",
          tags: ["Cultural Impact", "User Adoption", "Southeast Asia"]
        }
      ]
    },
    'case-studies': {
      title: "Cultural Adaptation Success Stories",
      insights: [
        {
          content: "Indonesian FinTech achieved 89% reduction in defaults by incorporating local community trust networks into AI risk assessment",
          source: "Case Study Analysis",
          tags: ["Success Story", "Risk Assessment", "Community Trust"]
        },
        {
          content: "African mobile banking platform saw 4.2x growth after integrating traditional savings circle features",
          source: "Impact Report",
          tags: ["Mobile Banking", "Traditional Finance", "Growth"]
        }
      ]
    },
    'competitors': {
      title: "Competitor Landscape Analysis",
      insights: [
        {
          content: "Leading FinTechs investing 40% more in cultural adaptation features compared to previous year",
          source: "Industry Analysis",
          tags: ["Competition", "Investment", "Adaptation"]
        },
        {
          content: "Emerging trend: 72% of successful FinTech expansions prioritized cultural research over technical features",
          source: "Market Research",
          tags: ["Trends", "Strategy", "Expansion"]
        }
      ]
    },
    'innovation': {
      title: "Innovation Trends in Financial Inclusion",
      insights: [
        {
          content: "AI systems incorporating cultural context show 2.8x better accuracy in credit risk assessment",
          source: "Technical Research",
          tags: ["AI", "Innovation", "Risk Assessment"]
        },
        {
          content: "New framework combining traditional trust metrics with AI increases approval rates by 156% while maintaining default rates",
          source: "Innovation Report",
          tags: ["Framework", "Trust Metrics", "Performance"]
        }
      ]
    }
  };

  const handleQuickLink = async (linkId: string) => {
    setSelectedLink(linkId);
    setIsResearching(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsResearching(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSelectedLink(null);
    setIsResearching(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsResearching(false);
    setSelectedLink('market-size'); // Simulated result
  };

  const saveToBackpocket = (insight: any) => {
    addBackpocketCard({
      id: Date.now().toString(),
      type: 'research',
      content: insight.content,
      source: insight.source,
      tags: insight.tags,
      createdAt: Date.now(),
      lastUsed: null
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl max-h-[85vh] flex flex-col"
      >
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Research Agent</h3>
              <p className="text-sm text-gray-500">Powered by Perplexity Sonar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-100/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask a research question..."
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

          <div className="grid grid-cols-2 gap-4 mb-6">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleQuickLink(link.id)}
                  className="flex items-start gap-3 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{link.title}</h4>
                    <p className="text-sm text-gray-500">{link.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {isResearching && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-12"
              >
                <ProcessingIndicator 
                  text="Researching insights..."
                  subText="Analyzing market data and reports"
                  size="lg"
                />
              </motion.div>
            )}

            {selectedLink && !isResearching && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{researchResults[selectedLink as keyof typeof researchResults].title}</h3>
                  <span className="text-sm text-gray-500">2 relevant insights found</span>
                </div>

                <div className="space-y-4">
                  {researchResults[selectedLink as keyof typeof researchResults].insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-50 rounded-lg space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Research Insight</span>
                        </div>
                        <button
                          onClick={() => saveToBackpocket(insight)}
                          className="flex items-center gap-1.5 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                        >
                          <Save className="w-3 h-3" />
                          Save to Backpocket
                        </button>
                      </div>

                      <p className="text-gray-700">{insight.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {insight.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">Source: {insight.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ResearchAgentModal;