import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, ArrowRight, Bot, Sparkles, 
  MessageSquare, Brain, FileText 
} from 'lucide-react';
import { Button, Card, Modal } from '../shared';
import ProcessingIndicator from '../common/ProcessingIndicator';
import type { PostConcept } from '../../types';

interface ConceptsPickerProps {
  onClose: () => void;
  onSubmit: (route: 'editor' | 'calendar') => void;
}

const ConceptsPicker: React.FC<ConceptsPickerProps> = ({ onClose, onSubmit }) => {
  const [concepts, setConcepts] = useState<PostConcept[]>([
    {
      id: '1',
      hook: "Why Traditional Credit Scores Are Failing the Next Billion Users",
      description: "Explore how cultural biases in traditional credit scoring systems create barriers to financial inclusion.",
      approved: false
    },
    {
      id: '2',
      hook: "The Hidden Power of Cultural Context in FinTech",
      description: "Examining successful FinTech innovations that leverage local cultural understanding.",
      approved: false
    },
    {
      id: '3',
      hook: "Beyond Generic AI: The Rise of Cultural Intelligence in Finance",
      description: "How specialized AI systems are revolutionizing financial services through cultural adaptation.",
      approved: false
    },
    {
      id: '4',
      hook: "What Traditional Finance Gets Wrong About Trust",
      description: "Understanding and bridging the trust gap in digital financial services across cultures.",
      approved: false
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<PostConcept | null>(null);
  const [showThoughtProcess, setShowThoughtProcess] = useState(false);

  const handleApprove = (id: string) => {
    setConcepts(prev => prev.map(concept => ({
      ...concept,
      approved: concept.id === id
    })));
  };

  const handleReject = (id: string) => {
    setConcepts(prev => prev.filter(concept => concept.id !== id));
  };

  const generateMoreConcepts = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newConcepts: PostConcept[] = [
      {
        id: Date.now().toString(),
        hook: "AI Financial Copilots: The Next Evolution",
        description: "How personalized AI assistants are transforming financial decision-making.",
        approved: false
      },
      // Add more concepts as needed
    ];

    setConcepts(prev => [...prev, ...newConcepts]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {concepts.map((concept) => (
            <Card
              key={concept.id}
              className={`p-6 ${concept.approved ? 'ring-2 ring-green-500' : ''}`}
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold text-lg">{concept.hook}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={X}
                    onClick={() => handleReject(concept.id)}
                  />
                  <Button
                    variant={concept.approved ? 'primary' : 'outline'}
                    size="sm"
                    icon={Check}
                    onClick={() => handleApprove(concept.id)}
                  />
                </div>
              </div>
              <p className="text-gray-600 mb-4">{concept.description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Brain}
                  onClick={() => {
                    setSelectedConcept(concept);
                    setShowThoughtProcess(true);
                  }}
                >
                  See thought process
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Sparkles}
                  onClick={() => setSelectedConcept(concept)}
                >
                  Flesh it out more
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="secondary"
            icon={Bot}
            onClick={generateMoreConcepts}
            loading={isGenerating}
          >
            Generate More Concepts
          </Button>
        </div>

        {concepts.some(c => c.approved) && (
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => onSubmit('calendar')}
            >
              Save to Calendar
            </Button>
            <Button
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onSubmit('editor')}
            >
              Create Post Now
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showThoughtProcess && selectedConcept && (
          <Modal
            isOpen={true}
            onClose={() => setShowThoughtProcess(false)}
            title="AI Thought Process"
            size="lg"
          >
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
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConceptsPicker;