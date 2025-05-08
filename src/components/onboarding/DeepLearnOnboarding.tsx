import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Link, FileText, Brain, Sparkles, ArrowRight, Check, Target, Bot, Search, Database } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Logo from '../common/Logo';
import ProcessingIndicator from '../common/ProcessingIndicator';

interface DeepLearnOnboardingProps {
  onComplete: () => void;
}

const DeepLearnOnboarding: React.FC<DeepLearnOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'upload' | 'processing'>('upload');
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

    // Simulate deep learning stages
    const stages = [
      "Analyzing documents and extracting key information...",
      "Processing LinkedIn profile data...",
      "Scanning online presence and publications...",
      "Identifying writing patterns and style...",
      "Analyzing industry expertise and focus areas...",
      "Detecting thought leadership themes...",
      "Cross-referencing with market trends...",
      "Synthesizing insights..."
    ];

    let currentStage = 0;
    const stageInterval = setInterval(() => {
      currentStage = (currentStage + 1) % stages.length;
      setProcessingStage(currentStage);
    }, 3000);

    // Simulate completion after all stages
    setTimeout(() => {
      clearInterval(stageInterval);
      onComplete();
    }, stages.length * 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface flex">
      <div className="flex-1 p-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'upload' ? (
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
                      <p className="text-sm text-gray-500">Let's analyze your content style</p>
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
                      <span>Start Analysis</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
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
                    "Analyzing documents and extracting key information...",
                    "Processing LinkedIn profile data...",
                    "Scanning online presence and publications...",
                    "Identifying writing patterns and style...",
                    "Analyzing industry expertise and focus areas...",
                    "Detecting thought leadership themes...",
                    "Cross-referencing with market trends...",
                    "Synthesizing insights..."
                  ][processingStage]}
                  size="lg"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-1/3 bg-night text-white p-8 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-white">Deep Learning Progress</h2>
          <p className="text-gray-200">Analyzing your professional profile and content style</p>
        </div>

        <div className="flex-1 space-y-4">
          {[
            { 
              icon: FileText,
              label: "Document Analysis",
              description: "Extracting insights from uploaded content",
              complete: step === 'processing'
            },
            { 
              icon: Search,
              label: "LinkedIn Processing",
              description: "Analyzing professional background",
              complete: step === 'processing'
            },
            { 
              icon: Bot,
              label: "Pattern Recognition",
              description: "Identifying writing style and themes",
              complete: step === 'processing'
            },
            { 
              icon: Database,
              label: "Market Analysis",
              description: "Cross-referencing industry trends",
              complete: step === 'processing'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-3 p-4 rounded-lg ${
                item.complete ? 'bg-kiwi/20' : 'bg-white/5'
              }`}
              animate={item.complete ? {
                backgroundColor: ['rgba(123, 166, 13, 0.2)', 'rgba(123, 166, 13, 0.3)', 'rgba(123, 166, 13, 0.2)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.complete ? 'bg-kiwi' : 'bg-white/10'
              }`}>
                <item.icon className={`w-5 h-5 ${item.complete ? 'text-white' : 'text-white/50'}`} />
              </div>
              <div>
                <span className={`block font-medium ${item.complete ? 'text-white' : 'text-white/70'}`}>
                  {item.label}
                </span>
                <span className="block text-sm text-white/50">
                  {item.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeepLearnOnboarding;