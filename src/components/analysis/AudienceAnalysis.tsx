import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users2, ThumbsUp, AlertCircle, Target, X, BarChart, ChevronRight, Lightbulb, Bot, Check, MessageSquare, TrendingUp, Brain, CheckCircle, FileText, Sparkles } from 'lucide-react';
import ProcessingIndicator from '../common/ProcessingIndicator';

interface AudienceAnalysisProps {
  onClose: () => void;
}

interface AudienceSegment {
  id: string;
  title: string;
  description: string[];
  icon: React.ElementType;
}

const audienceSegments: AudienceSegment[] = [
  {
    id: 'technical',
    title: "Technical Founders",
    description: [
      "Building AI/ML companies",
      "Deep technical expertise",
      "Product-focused",
      "Early-stage startups",
      "Looking for strategic insights"
    ],
    icon: Brain
  },
  {
    id: 'vcs',
    title: "VCs & Investors",
    description: [
      "Investing in AI/ML startups",
      "Portfolio company advisors",
      "Market trend analysis",
      "Investment thesis development",
      "Pattern recognition expertise"
    ],
    icon: TrendingUp
  },
  {
    id: 'yc',
    title: "YC Community",
    description: [
      "Current/alumni founders",
      "Early employees",
      "Startup ecosystem builders",
      "Technical talent",
      "Industry innovators"
    ],
    icon: Users2
  }
];

const processingStages = [
  {
    icon: Brain,
    label: "Analyzing audience segments..."
  },
  {
    icon: MessageSquare,
    label: "Evaluating content resonance..."
  },
  {
    icon: FileText,
    label: "Identifying key insights..."
  },
  {
    icon: Sparkles,
    label: "Generating recommendations..."
  }
];

const AudienceAnalysis: React.FC<AudienceAnalysisProps> = ({ onClose }) => {
  const [step, setStep] = useState<'select' | 'processing' | 'results'>('select');
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [processingStage, setProcessingStage] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleAnalyze = async () => {
    setStep('processing');
    
    // Simulate AI processing with staged animations
    for (let i = 0; i < processingStages.length; i++) {
      setProcessingStage(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    setStep('results');
    setShowResults(true);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-xl flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Audience Impact Analysis</h2>
              <p className="text-sm text-gray-500">Analyze how your content resonates with different audience segments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium mb-2">Select Target Audience Segments</h3>
                  <p className="text-gray-500">Choose the audience segments you want to analyze your content against</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {audienceSegments.map((segment) => {
                    const Icon = segment.icon;
                    const isSelected = selectedSegments.includes(segment.id);
                    
                    return (
                      <button
                        key={segment.id}
                        onClick={() => handleSegmentSelect(segment.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected 
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected ? 'bg-purple-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              isSelected ? 'text-purple-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected 
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-300'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <h4 className="font-medium mb-2">{segment.title}</h4>
                        <ul className="text-sm space-y-1">
                          {segment.description.map((item, index) => (
                            <li key={index} className="text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleAnalyze}
                    disabled={selectedSegments.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Bot className="w-4 h-4" />
                    Analyze Content
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12"
              >
                <div className="flex flex-col items-center gap-8">
                  <ProcessingIndicator 
                    text={processingStages[processingStage].label}
                    size="lg"
                  />
                  
                  <div className="w-full max-w-md">
                    <div className="flex justify-between mb-2">
                      {processingStages.map((stage, index) => {
                        const Icon = stage.icon;
                        const isActive = index === processingStage;
                        const isPast = index < processingStage;
                        
                        return (
                          <div
                            key={index}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isActive ? 'bg-purple-100 text-purple-600 scale-110' :
                              isPast ? 'bg-green-100 text-green-600' :
                              'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500"
                        animate={{
                          width: `${((processingStage + 1) / processingStages.length) * 100}%`
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'results' && showResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="divide-y"
              >
                {/* Score Overview */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Analysis Results</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Overall Score</span>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        8.6/10
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium text-green-900">Clarity</h4>
                      </div>
                      <div className="text-2xl font-semibold text-green-700">9.2</div>
                      <p className="text-xs text-green-600 mt-1">Clear investment thesis</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <h4 className="font-medium text-blue-900">Engagement</h4>
                      </div>
                      <div className="text-2xl font-semibold text-blue-700">8.5</div>
                      <p className="text-xs text-blue-600 mt-1">Strong discussion potential</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <h4 className="font-medium text-purple-900">Impact</h4>
                      </div>
                      <div className="text-2xl font-semibold text-purple-700">8.1</div>
                      <p className="text-xs text-purple-600 mt-1">Actionable insights</p>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ThumbsUp className="w-5 h-5 text-gray-700" />
                    <h3 className="text-lg font-semibold">Key Strengths</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-white border rounded-lg">
                      <p className="text-gray-800 leading-relaxed">
                        Your distinction between general AI and specialized agents offers founders a clear investment thesis. The "narrow focus + specialization + agentic execution = 10x improvement" formula is memorable and actionable. The copywriting example concretizes the concept effectively.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-gray-700" />
                    <h3 className="text-lg font-semibold">Areas for Improvement</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-white border rounded-lg">
                      <p className="text-gray-800 leading-relaxed">
                        The post lacks specific signals for identifying high-potential domains for this approach. "Agentic capabilities" remains abstract despite your example—founders need a clearer operational definition. You don't address how these specialized solutions defend against Big Tech encroachment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Audience Impact */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-gray-700" />
                    <h3 className="text-lg font-semibold">Audience Impact</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: BarChart,
                        title: "Technical Followers",
                        content: "Want deeper technical differentiation",
                        sentiment: "neutral"
                      },
                      {
                        icon: Target,
                        title: "Founders",
                        content: "Need more guidance on execution and domain selection",
                        sentiment: "improvement"
                      },
                      {
                        icon: BarChart,
                        title: "VCs",
                        content: "Question whether this creates sustainable moats",
                        sentiment: "concern"
                      },
                      {
                        icon: Users2,
                        title: "YC Community",
                        content: "Will connect this to portfolio companies they know",
                        sentiment: "positive"
                      }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className={`p-4 bg-white border rounded-lg space-y-3 transition-colors ${
                          item.sentiment === 'positive' ? 'hover:border-green-300' :
                          item.sentiment === 'improvement' ? 'hover:border-yellow-300' :
                          item.sentiment === 'concern' ? 'hover:border-red-300' :
                          'hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-gray-700" />
                          <h4 className="font-medium">{item.title}</h4>
                        </div>
                        <p className="text-sm text-gray-700">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Insight */}
                <div className="p-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">Key Insight</h4>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          The post crystallizes your perspective on AI's future value creation but would benefit from tactical guidance on identifying and validating these opportunities—precisely what your followers value most from you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step === 'results' && showResults && (
          <div className="flex justify-end gap-3 p-4 border-t flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
            >
              Apply Insights
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AudienceAnalysis;