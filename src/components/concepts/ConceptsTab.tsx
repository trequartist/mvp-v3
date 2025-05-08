import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, ArrowRight, Sparkles, Brain, FileText, 
  MessageSquare, Plus, Send, X, Lightbulb, ArrowUpRight, Settings2,
  Hash
} from 'lucide-react';
import { useStudioStore } from '../../store';
import { availableModels } from '../../store';
import type { PostConcept } from '../../types';
import ConceptTuningModal from './ConceptTuningModal';
import Logo from '../common/Logo';
import ProcessingIndicator from '../common/ProcessingIndicator';
import { Button, Card } from '../shared';

const frameColors = [
  'from-yellow-200 via-yellow-100 to-yellow-50',
  'from-blue-200 via-blue-100 to-blue-50',
  'from-green-200 via-green-100 to-green-50',
  'from-pink-200 via-pink-100 to-pink-50',
  'from-purple-200 via-purple-100 to-purple-50'
];

const ConceptsTab: React.FC = () => {
  const { concepts, addConcept, updateConcept, removeConcept } = useStudioStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<PostConcept | null>(null);
  const [showThoughtProcess, setShowThoughtProcess] = useState(false);
  const [input, setInput] = useState('');
  const [numConcepts, setNumConcepts] = useState(3);
  const [isProcessingInput, setIsProcessingInput] = useState(false);
  const [showTuning, setShowTuning] = useState<string | null>(null);
  const [isPromoting, setIsPromoting] = useState(false);
  const [promotingConcept, setPromotingConcept] = useState<PostConcept | null>(null);
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-3-7');
  const [showModelPicker, setShowModelPicker] = useState(false);

  const handleRemove = (id: string) => {
    removeConcept(id);
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessingInput) return;

    setIsProcessingInput(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate the requested number of concepts
    const newConcepts = Array.from({ length: numConcepts }, (_, i) => ({
      id: (Date.now() + i).toString(),
      hook: `Community-Driven Financial Trust Networks ${i + 1}`,
      description: "How cultural understanding is reshaping trust mechanisms in digital finance.",
      approved: false
    }));

    newConcepts.forEach(concept => addConcept(concept));
    setInput('');
    setIsProcessingInput(false);
  };

  const handlePromoteToPost = async (concept: PostConcept) => {
    setPromotingConcept(concept);
    setIsPromoting(true);

    const stages = [
      "Analyzing concept structure...",
      "Extracting key themes...",
      "Applying brand voice...",
      "Generating initial draft...",
      "Refining content...",
      "Finalizing post..."
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsPromoting(false);
    setPromotingConcept(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="p-6 bg-white border-b">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your concept idea..."
                className="w-full px-4 py-3 text-lg bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 bg-white border rounded-xl px-4 shadow-sm">
              <Hash className="w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="1"
                max="10"
                value={numConcepts}
                onChange={(e) => setNumConcepts(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-12 py-4 text-lg focus:outline-none"
              />
              <span className="text-sm text-gray-500">concepts</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowModelPicker(!showModelPicker)}
                className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Model: {availableModels.find(m => m.id === selectedModel)?.name}</span>
              </button>
              {showModelPicker && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border p-2 z-10">
                  {availableModels.map(model => (
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
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{model.name}</div>
                        <div className="text-xs text-gray-500">{model.description}</div>
                      </div>
                      {model.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded">
                          {model.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="primary"
              icon={Sparkles}
              onClick={handleInputSubmit}
              loading={isProcessingInput}
              className="flex-1"
            >
              Generate Concepts
            </Button>
            <Button
              variant="secondary"
              icon={Plus}
              onClick={() => {
                addConcept({
                  id: Date.now().toString(),
                  hook: '',
                  description: '',
                  approved: false
                });
              }}
              className="flex-1"
            >
              Add Concept Manually
            </Button>
          </div>
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {concepts.map((concept, index) => (
              <div key={concept.id} className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-br ${frameColors[index % frameColors.length]} rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <Card className="relative bg-white overflow-hidden transition-all duration-200">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                        </div>
                        {concept.origin === 'ideas' && (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                            From Ideas
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemove(concept.id)}
                        className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{concept.hook}</h3>
                    <p className="text-gray-600">{concept.description}</p>
                  </div>

                  <div className="p-4 bg-gray-50 grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowTuning(concept.id)}
                      className="relative p-2 rounded-lg transition-all group"
                    >
                      <div className="relative w-10 h-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-lg opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/20 to-white/40 rounded-lg" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Logo className="w-7 h-7 text-white" />
                        </div>
                        <motion.div
                          className="absolute -inset-1 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.15, 0, 0.15]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="absolute -inset-2 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0, 0.1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3
                          }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent_70%)] rounded-lg" />
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePromoteToPost(concept)}
                      className="flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                      <span className="text-sm font-medium">Create Post</span>
                    </motion.button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showThoughtProcess && selectedConcept && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-xl shadow-xl"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">AI Thought Process</h2>
                <Button
                  variant="outline"
                  size="sm"
                  icon={X}
                  onClick={() => setShowThoughtProcess(false)}
                />
              </div>
              <div className="p-6 space-y-4">
                <Card className="p-4 bg-blue-50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Brain className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Concept Analysis</h4>
                      <p className="text-sm text-blue-800">
                        This concept leverages the intersection of AI technology and cultural understanding, 
                        addressing a critical gap in current financial services. It resonates with both 
                        technical and business audiences while maintaining thought leadership positioning.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        )}

        {showTuning && (
          <ConceptTuningModal
            conceptId={showTuning}
            onClose={() => setShowTuning(null)}
          />
        )}

        {isPromoting && promotingConcept && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8"
            >
              <ProcessingIndicator 
                text="Creating Post Draft"
                subText="The Copywriter Agent is crafting your content..."
                size="lg"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConceptsTab;