import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Link, FileText, Brain, Sparkles, ArrowRight, Check, Target } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Logo from '../common/Logo';
import ProcessingIndicator from '../common/ProcessingIndicator';

interface DeepLearnOnboardingProps {
  onComplete: () => void;
}

const DeepLearnOnboarding: React.FC<DeepLearnOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'upload' | 'processing' | 'profile' | 'goals' | 'final'>('upload');
  const [files, setFiles] = useState<File[]>([]);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    },
    multiple: true,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const handleSubmitFiles = async () => {
    setStep('processing');
    setIsProcessing(true);

    // Simulate processing stages
    const stages = [
      "Analyzing documents...",
      "Processing LinkedIn data...",
      "Extracting key insights...",
      "Building user profile..."
    ];

    for (const [index] of stages.entries()) {
      setProcessingStage(index);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsProcessing(false);
    setStep('profile');
  };

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl"
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-surface-secondary to-white border-b">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <Logo className="w-10 h-10" />
                    <motion.div
                      className="absolute inset-0 bg-kiwi rounded-full opacity-20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Welcome to Q</h2>
                    <p className="text-sm text-gray-500">Let's get to know you better</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Upload Your Documents</h3>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-500 mt-2">Supports PDF, DOC, DOCX</p>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                        >
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Add Your Links</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={linkedInUrl}
                        onChange={(e) => setLinkedInUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kiwi/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blog or Website
                      </label>
                      <input
                        type="url"
                        value={blogUrl}
                        onChange={(e) => setBlogUrl(e.target.value)}
                        placeholder="https://yourblog.com"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kiwi/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSubmitFiles}
                    disabled={files.length === 0 && !linkedInUrl}
                    className="flex items-center gap-2 px-6 py-2 bg-kiwi text-white rounded-lg hover:bg-kiwi-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'processing':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-night via-transparent to-teal opacity-10 rounded-full blur-3xl" />
            <div className="relative">
              <ProcessingIndicator
                text="Deep Learning in Progress"
                subText={[
                  "Analyzing documents...",
                  "Processing LinkedIn data...",
                  "Extracting key insights...",
                  "Building user profile..."
                ][processingStage]}
                size="lg"
              />
            </div>
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-surface-secondary to-white border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-kiwi/10 rounded-lg">
                  <Brain className="w-6 h-6 text-kiwi" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Your Profile Analysis</h2>
                  <p className="text-sm text-gray-500">Here's what I've learned about you, Alex</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-medium mb-2">Professional Background</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Founder & CEO at NexusAI (Current)</li>
                      <li>• Expert in AI implementation for small businesses</li>
                      <li>• Guided 200+ companies through AI adoption</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-medium mb-2">Core Beliefs</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• AI should enhance, not replace human capabilities</li>
                      <li>• Cultural understanding is key to successful AI implementation</li>
                      <li>• Small businesses deserve enterprise-grade AI solutions</li>
                      <li>• Technology should adapt to humans, not vice versa</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-medium mb-2">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "AI Implementation",
                        "Financial Inclusion",
                        "Cultural Innovation",
                        "Small Business Tech",
                        "Product Strategy"
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-kiwi/10 text-kiwi-dark rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-medium mb-2">Leadership Philosophy</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Focus on practical solutions over theoretical possibilities</li>
                      <li>• Build for real-world impact, not just technological advancement</li>
                      <li>• Lead through experience sharing and authentic insights</li>
                      <li>• Emphasize human-centered design in all solutions</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-medium mb-2">Industry Perspectives</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Traditional financial systems overlook cultural nuances</li>
                      <li>• AI's future lies in specialized, context-aware solutions</li>
                      <li>• Small businesses are underserved by current AI offerings</li>
                      <li>• Cultural adaptation is key to global financial inclusion</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-medium mb-2">Writing Style</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Technical but accessible</p>
                      <p>• Thoughtful and analytical</p>
                      <p>• Uses metaphors to explain complex concepts</p>
                      <p>• Straightforward with moments of dry humor</p>
                      <p>• Passionate about practical AI impact</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep('goals')}
                  className="flex items-center gap-2 px-6 py-2 bg-kiwi text-white rounded-lg hover:bg-kiwi-dark transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'goals':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-surface-secondary to-white border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal/10 rounded-lg">
                  <Target className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Set Your Goals</h2>
                  <p className="text-sm text-gray-500">Help me understand what you want to achieve</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are your main content goals?
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/20 min-h-[100px]"
                  placeholder="e.g., Establish thought leadership in AI, Share startup journey insights..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How much time can you dedicate to content creation weekly?
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/20">
                  <option>1-2 hours</option>
                  <option>3-5 hours</option>
                  <option>6-10 hours</option>
                  <option>10+ hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What topics would you like to focus on?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "AI Implementation",
                    "Startup Journey",
                    "Product Strategy",
                    "Team Building",
                    "Industry Trends",
                    "Technical Deep Dives",
                    "Leadership",
                    "Innovation"
                  ].map((topic) => (
                    <label
                      key={topic}
                      className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-surface transition-colors"
                    >
                      <input type="checkbox" className="text-kiwi rounded" />
                      <span className="text-sm">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep('final')}
                  className="flex items-center gap-2 px-6 py-2 bg-kiwi text-white rounded-lg hover:bg-kiwi-dark transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'final':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-kiwi via-teal to-night opacity-10 rounded-full blur-3xl" />
              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-kiwi/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-kiwi" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Preparing Your Strategy</h2>
                  <p className="text-gray-600">Just a moment while I put everything together...</p>
                </div>
                <ProcessingIndicator
                  text="Creating your content strategy"
                  subText="Analyzing patterns and optimizing recommendations"
                  size="lg"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  <button
                    onClick={onComplete}
                    className="px-6 py-2 bg-kiwi text-white rounded-lg hover:bg-kiwi-dark transition-colors"
                  >
                    View Your Strategy
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface flex">
      <div className="flex-1 p-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="w-1/3 bg-night text-white p-8 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-white">Deep Learning Progress</h2>
          <p className="text-gray-200">Analyzing your professional profile and content style</p>
        </div>

        <div className="flex-1 space-y-4">
          {[
            { label: "Document Analysis", complete: step !== 'upload' },
            { label: "LinkedIn Processing", complete: step !== 'upload' },
            { label: "Profile Generation", complete: step === 'profile' || step === 'goals' || step === 'final' },
            { label: "Goal Setting", complete: step === 'goals' || step === 'final' },
            { label: "Strategy Creation", complete: step === 'final' }
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-4 rounded-lg ${
                item.complete ? 'bg-kiwi/20' : 'bg-white/5'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.complete ? 'bg-kiwi' : 'bg-white/10'
              }`}>
                <Check className={`w-4 h-4 ${item.complete ? 'text-white' : 'text-white/50'}`} />
              </div>
              <span className={item.complete ? 'text-white' : 'text-white/70'}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeepLearnOnboarding;