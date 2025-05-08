import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, FileText, Target, Users, MessageSquare, 
  Sparkles, PenTool, Bot, ArrowRight, Edit2, Check,
  ThumbsUp, ThumbsDown, Brain, Lightbulb, Zap, Clock,
  BarChart, Globe, Share2, Heart, MessageCircle, Send,
  Play, Images, X
} from 'lucide-react';
import Header from '../layout/Header';
import { Button, Card, Modal } from '../shared';
import { sections } from '../../store/maps';
import Logo from '../common/Logo';
import ProcessingIndicator from '../common/ProcessingIndicator';
import AssistantDock from '../layout/AssistantDock';

interface StrategyRoomProps {
  onBack: () => void;
}

interface StyleTestQuestion {
  id: string;
  content: string;
  hook: string;
  body: string;
  rating: number | null;
  feedback: string;
}

const styleTestQuestions: StyleTestQuestion[] = [
  {
    id: '1',
    content: "How well does this tone and structure resonate with your style?",
    hook: "The Hidden Power of Cultural Context in AI 🚀",
    body: `The next wave of AI innovation won't be defined by who has the biggest models – it will be led by those who truly understand cultural context.

At NexusAI, we're seeing this firsthand. Our culturally-aware AI systems are achieving what seemed impossible: 3-4x higher accuracy in risk assessment while increasing approval rates by 156%.

Why? Because we're finally measuring what matters. Traditional AI systems, built on Western assumptions, miss the rich tapestry of informal financial relationships that define how billions actually manage money.

The future belongs to AI that doesn't just process data, but understands the cultural DNA of human behavior. This isn't just about better technology – it's about building AI that truly serves everyone.

Thoughts? What role do you see cultural understanding playing in the future of AI?

#AIInnovation #FinancialInclusion #CulturalIntelligence`,
    rating: null,
    feedback: ''
  },
  {
    id: '2',
    content: "Does this technical depth and narrative style match your preferences?",
    hook: "Why Most AI Companies Are Solving the Wrong Problem 🤔",
    body: `Just had a fascinating conversation with a founder building AI for emerging markets that completely changed my perspective.

The problem isn't technology – we have incredible models that can process millions of data points in seconds. The real challenge? Most AI systems are culturally blind.

Here's what we discovered at NexusAI:
• Traditional AI models miss 68% of relevant cultural signals
• Culturally-aware systems show 2.8x better accuracy
• Local context improves user trust by 312%

But the most interesting finding? When we combined transformer-based language models with cultural context engines, we didn't just improve performance – we unlocked entirely new use cases that weren't possible before.

This is why I believe the next unicorns won't be built on model size, but on cultural intelligence.

What are your thoughts on the role of cultural understanding in AI development?

#AIStrategy #Innovation #EmergingMarkets`,
    rating: null,
    feedback: ''
  }
];

const StrategyRoom: React.FC<StrategyRoomProps> = ({ onBack }) => {
  const [showStyleTest, setShowStyleTest] = useState(false);
  const [currentSection, setCurrentSection] = useState('executiveSummary');
  const [isProcessingFeedback, setIsProcessingFeedback] = useState(false);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [showAssistant, setShowAssistant] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExamplePost, setShowExamplePost] = useState(null);

  const handleStyleRating = async (rating: number) => {
    const updatedQuestions = [...styleTestQuestions];
    updatedQuestions[currentQuestionIndex].rating = rating;
    
    if (currentQuestionIndex < styleTestQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsProcessingFeedback(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsProcessingFeedback(false);
      setShowStyleTest(false);
    }
  };

  const backButton = (
    <Button
      variant="outline"
      size="sm"
      icon={ChevronLeft}
      onClick={onBack}
    >
      Back to Calendar
    </Button>
  );

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'executiveSummary':
        return (
          <div className="prose prose-blue max-w-none">
            <h2>Executive Summary</h2>
            <p className="text-gray-600">{sections.executiveSummary.content.intro}</p>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Strategic Objectives</h3>
                <ul className="space-y-2">
                  {sections.executiveSummary.content.strategicObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-1" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Key Differentiators</h3>
                <ul className="space-y-2">
                  {sections.executiveSummary.content.keyDifferentiators.map((diff, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-blue-500 mt-1" />
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Execution Approach</h3>
                <ul className="space-y-2">
                  {sections.executiveSummary.content.executionApproach.map((approach, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-purple-500 mt-1" />
                      <span>{approach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'voiceAnalysis':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Voice & Tone Analysis</h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-4">Voice Characteristics</h3>
              <ul className="space-y-2">
                {sections.voiceAnalysis.content.characteristics.map((char, index) => (
                  <li key={index} className="flex items-center gap-2 text-blue-800">
                    <Check className="w-4 h-4 text-blue-600" />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-purple-900 mb-4">Writing Guidelines</h3>
              <ul className="space-y-2">
                {sections.voiceAnalysis.content.guidelines.map((guide, index) => (
                  <li key={index} className="flex items-center gap-2 text-purple-800">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                    {guide}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-indigo-900">Style Test Available</h3>
                    <p className="text-sm text-indigo-700">Fine-tune your content preferences</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  onClick={() => setShowStyleTest(true)}
                >
                  Take Style Test
                </Button>
              </div>
            </div>
          </div>
        );

      case 'audience':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Target Audience</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {sections.audience.segments.map((segment, index) => (
                <div key={index} className="bg-white rounded-lg border p-6 space-y-4">
                  <h3 className="text-lg font-medium">{segment.name}</h3>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Pain Points</h4>
                    <ul className="space-y-1">
                      {segment.painPoints.map((point, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                    <ul className="space-y-1">
                      {segment.interests.map((interest, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          {interest}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Content Preferences</h4>
                    <ul className="space-y-1">
                      {segment.preferences.map((pref, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          {pref}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contentPillars':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Content Pillars</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {sections.contentPillars.pillars.map((pillar, index) => (
                <div key={index} className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium mb-4">{pillar.title}</h3>
                  <ul className="space-y-3">
                    {pillar.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="p-1 bg-blue-100 rounded-lg mt-1">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'formats':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Content Formats & Cadence</h2>
            
            {sections.formats.recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b">
                  <h3 className="text-lg font-semibold">{rec.type}</h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    {rec.formats.map((format, i) => (
                      <div key={i} className="group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              {format.name.includes('video') ? (
                                <Play className="w-4 h-4 text-blue-600" />
                              ) : format.name.includes('Carousel') ? (
                                <Images className="w-4 h-4 text-blue-600" />
                              ) : format.name.includes('article') ? (
                                <FileText className="w-4 h-4 text-blue-600" />
                              ) : (
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{format.name}</h4>
                              <p className="text-sm text-blue-600">{format.cadence}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Success Metrics</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {sections.metrics.categories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium mb-4">{category.name}</h3>
                  <ul className="space-y-3">
                    {category.targets.map((target, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="p-1 bg-green-100 rounded-lg mt-1">
                          <Target className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-600">{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Strategy Room" 
        subtitle="Fine-tune your content strategy"
        leftContent={backButton}
      />

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Strategy Document */}
          <div className="col-span-12">
            <Card className="h-full">
              <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Content Strategy</h2>
                      <p className="text-sm text-gray-500">Alex Chen, Founder & CEO of NexusAI</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Edit2}
                    onClick={() => setShowAssistant(true)}
                  >
                    Edit with AI
                  </Button>
                </div>
              </div>

              <div className="flex min-h-[calc(100vh-300px)]">
                {/* Navigation */}
                <div className="w-64 border-r p-4 space-y-2">
                  {[
                    { id: 'executiveSummary', label: 'Executive Summary', icon: FileText },
                    { id: 'voiceAnalysis', label: 'Voice & Tone', icon: MessageSquare },
                    { id: 'audience', label: 'Target Audience', icon: Users },
                    { id: 'contentPillars', label: 'Content Pillars', icon: Target },
                    { id: 'formats', label: 'Formats & Cadence', icon: PenTool },
                    { id: 'metrics', label: 'Success Metrics', icon: Brain }
                  ].map(section => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(section.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        currentSection === section.id 
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {renderSectionContent()}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Style Test Modal */}
      <Modal
        isOpen={showStyleTest}
        onClose={() => setShowStyleTest(false)}
        title="Content Style Test"
        size="lg"
      >
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isProcessingFeedback ? (
            <div className="py-12">
              <ProcessingIndicator 
                text="Processing your preferences"
                subText="Updating content strategy..."
                size="lg"
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-xl font-semibold mb-2">
                  {styleTestQuestions[currentQuestionIndex].content}
                </h3>
                <p className="text-gray-600">
                  Rate how well this post matches your preferred style and tone
                </p>
              </div>

              {/* LinkedIn Post Preview */}
              <div className="max-w-2xl mx-auto bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                {/* Author Header */}
                <div className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-inner">
                    <span className="bg-gradient-to-br from-white/20 to-transparent bg-clip-text">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Alex Chen</h4>
                    <p className="text-sm text-gray-500">Founder & CEO at NexusAI • Building the future of AI</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-4">
                  <h3 className="font-bold text-lg mb-4">
                    {styleTestQuestions[currentQuestionIndex].hook}
                  </h3>
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {styleTestQuestions[currentQuestionIndex].body}
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="px-4 py-3 border-t flex items-center gap-6 text-gray-600 bg-gray-50">
                  <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">247</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">42</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">18</span>
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="max-w-xl mx-auto">
                <h4 className="text-center text-sm font-medium text-gray-700 mb-4">
                  Rate how well this matches your preferred style (1-6):
                </h4>
                <div className="grid grid-cols-6 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleStyleRating(rating)}
                      className="group relative p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="block text-2xl font-medium mb-1">{rating}</span>
                      <span className="block text-xs text-gray-500">
                        {rating === 1 ? 'Poor' : rating === 6 ? 'Perfect' : ''}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional feedback (optional):
                  </label>
                  <textarea
                    className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    rows={3}
                    placeholder="Share your thoughts about this post's style, tone, and structure..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Assistant Dock */}
      <AssistantDock mode="calendar" />
    </div>
  );
};

export default StrategyRoom;