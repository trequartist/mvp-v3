import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Hash, Plus, Settings2 } from 'lucide-react';
import { useStudioStore } from '../../store';
import { industryNotes, availableModels } from '../../store';
import type { StickyNote } from '../../types';
import ProcessingIndicator from '../common/ProcessingIndicator';
import StickyNote from './StickyNote';

const colors = ['bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-pink-100', 'bg-purple-100'];

const processingStages = [
  "Analyzing your input...",
  "Generating creative connections...",
  "Organizing thoughts into themes...",
  "Preparing visual layout..."
];

const IdeasTab: React.FC = () => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [prompt, setPrompt] = useState('');
  const [numIdeas, setNumIdeas] = useState(3);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [processingStage, setProcessingStage] = useState<number>(-1);
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-3-7');
  const [showModelPicker, setShowModelPicker] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const generateNotesFromPrompt = async () => {
    if (!prompt.trim() || !boardRef.current) return;

    setIsGeneratingNotes(true);
    setProcessingStage(0);
    setNotes([]);
    
    const stageInterval = setInterval(() => {
      setProcessingStage(prev => (prev + 1) % 4);
    }, 2000);

    // Simulate AI processing with minimum 8-second delay
    await new Promise(resolve => setTimeout(resolve, 8000));

    // Calculate board dimensions
    const boardRect = boardRef.current.getBoundingClientRect();
    const boardWidth = boardRect.width - 300; // Leave space for note width
    const boardHeight = boardRect.height - 200; // Leave space for note height

    // Generate notes based on numIdeas
    const marketingNotes = industryNotes.marketing.slice(0, numIdeas);
    
    // Calculate grid layout
    const cols = Math.min(3, numIdeas);
    const rows = Math.ceil(numIdeas / cols);
    const colWidth = boardWidth / cols;
    const rowHeight = boardHeight / rows;

    for (let i = 0; i < marketingNotes.length; i++) {
      const note = marketingNotes[i];
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Calculate position with some random offset for natural feel
      const baseX = col * colWidth + 40;
      const baseY = row * rowHeight + 40;
      const randomOffset = 20;

      const newNote: StickyNote = {
        id: Date.now().toString() + Math.random(),
        content: note.content,
        color: colors[Math.floor(Math.random() * colors.length)],
        position: {
          x: baseX + (Math.random() * randomOffset - randomOffset/2),
          y: baseY + (Math.random() * randomOffset - randomOffset/2)
        },
        isApproved: false,
        group: note.group,
        preview: note.preview
      };

      setNotes(prev => [...prev, newNote]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    clearInterval(stageInterval);
    setProcessingStage(-1);
    setIsGeneratingNotes(false);
    setPrompt('');
  };

  const handleNoteDelete = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleNoteUpdate = (id: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  const handleNotePositionUpdate = (id: string, position: { x: number; y: number }) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, position } : note
    ));
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Controls */}
      <div className="p-6 bg-white border-b">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Let's brainstorm..."
                className="w-full px-4 py-3 text-lg bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 bg-white border rounded-xl px-4 shadow-sm">
              <Hash className="w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="1"
                max="10"
                value={numIdeas}
                onChange={(e) => setNumIdeas(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-12 py-4 text-lg focus:outline-none"
              />
              <span className="text-sm text-gray-500">ideas</span>
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
            <button
              onClick={generateNotesFromPrompt}
              disabled={!prompt.trim() || isGeneratingNotes}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              Generate Ideas
            </button>
            <button
              onClick={() => {
                if (!boardRef.current) return;
                const rect = boardRef.current.getBoundingClientRect();
                const newNote: StickyNote = {
                  id: Date.now().toString() + Math.random(),
                  content: '',
                  color: colors[Math.floor(Math.random() * colors.length)],
                  position: {
                    x: Math.random() * (rect.width - 300) + 40,
                    y: Math.random() * (rect.height - 200) + 40
                  },
                  isApproved: false,
                  group: 'New Ideas'
                };
                setNotes(prev => [...prev, newNote]);
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Idea Manually
            </button>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={boardRef}
          className="absolute inset-0 m-6"
          style={{
            background: `
              linear-gradient(to right, #f8fafc 1px, transparent 1px),
              linear-gradient(to bottom, #f8fafc 1px, transparent 1px),
              radial-gradient(circle, #f1f5f9 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 24px 24px, 12px 12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <AnimatePresence>
            {isGeneratingNotes && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <ProcessingIndicator 
                  text="Generating Ideas..."
                  subText={processingStages[processingStage]}
                  size="lg"
                />
              </motion.div>
            )}

            {notes.map((note) => (
              <StickyNote
                key={note.id}
                note={note}
                onDelete={handleNoteDelete}
                onUpdate={handleNoteUpdate}
                onPositionUpdate={handleNotePositionUpdate}
                boardRef={boardRef}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IdeasTab;