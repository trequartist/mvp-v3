import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, Lightbulb, FileText, Save, Wand2, Bot, Sparkles, Hand, Check, Trash2, Layout,
  MessageSquare, ArrowRight, Filter, Tag, Edit2, BookOpen, ChevronDown, ChevronUp, Building,
  Settings2
} from 'lucide-react';
import { useStudioStore } from '../../store';
import { industryNotes, availableModels } from '../../store';
import type { StickyNote, NoteCluster, NotepadItem } from '../../types';
import ProcessingIndicator from '../common/ProcessingIndicator';

const colors = ['bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-pink-100', 'bg-purple-100'];

const processingStages = [
  "Analyzing your input...",
  "Generating creative connections...",
  "Organizing thoughts into themes...",
  "Preparing visual layout..."
];

const BrainstormMode: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [processingStage, setProcessingStage] = useState<number>(-1);
  const [notepadItems, setNotepadItems] = useState<NotepadItem[]>([]);
  const [showNotepad, setShowNotepad] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [draggedNoteId, setDraggedNoteId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-3-7');
  const [showModelPicker, setShowModelPicker] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { updateContentDraft, addBackpocketCard } = useStudioStore();

  const handleMouseDown = (e: React.MouseEvent, noteId: string) => {
    if (e.button !== 0) return;
    if (e.target instanceof HTMLElement && 
        (e.target.closest('button') || e.target.tagName === 'TEXTAREA')) {
      return;
    }

    const note = notes.find(n => n.id === noteId);
    if (!note || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - note.position.x;
    const offsetY = e.clientY - rect.top - note.position.y;
    
    setDraggedNoteId(noteId);
    setDragOffset({ x: offsetX, y: offsetY });
    setExpandedNoteId(null);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      
      requestAnimationFrame(() => {
        setNotes(prev => prev.map(note => {
          if (note.id === noteId) {
            return {
              ...note,
              position: {
                x: Math.max(0, Math.min(e.clientX - rect.left - offsetX, rect.width - 288)),
                y: Math.max(0, Math.min(e.clientY - rect.top - offsetY, rect.height - 200))
              }
            };
          }
          return note;
        }));
      });
    };

    const handleMouseUp = () => {
      setDraggedNoteId(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleNoteDelete = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    setNotes(prev => prev.filter(note => note.id !== noteId));
    setExpandedNoteId(null);
    setNotepadItems(prev => prev.filter(item => item.id !== noteId));
  };

  const handleNoteExpand = (id: string) => {
    if (draggedNoteId) return;
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  const handleNoteSelect = (id: string) => {
    const selectedNote = notes.find(note => note.id === id);
    if (!selectedNote) return;

    setNotepadItems(prev => {
      const exists = prev.some(item => item.id === id);
      if (!exists) {
        return [...prev, {
          id: selectedNote.id,
          content: selectedNote.content,
          group: selectedNote.group || 'Uncategorized',
          isSelected: true
        }];
      }
      return prev;
    });

    setNotes(prev => prev.map(note => ({
      ...note,
      isSelected: note.id === id ? true : note.isSelected
    })));
  };

  const handleNotepadToggle = (id: string) => {
    setNotepadItems(prev => prev.map(item => ({
      ...item,
      isSelected: item.id === id ? !item.isSelected : item.isSelected
    })));

    setNotes(prev => prev.map(note => ({
      ...note,
      isSelected: note.id === id ? !note.isSelected : note.isSelected
    })));
  };

  const handleSaveToBackpocket = () => {
    const selectedItems = notepadItems.filter(item => item.isSelected);
    
    selectedItems.forEach(item => {
      addBackpocketCard({
        id: Date.now().toString() + Math.random(),
        type: 'insight',
        content: item.content,
        source: 'Brainstorming Session',
        tags: [item.group],
        createdAt: Date.now(),
        lastUsed: null
      });
    });

    onClose();
  };

  const generateNotesFromPrompt = async () => {
    if (!prompt.trim()) return;

    setIsGeneratingNotes(true);
    setProcessingStage(0);
    setNotes([]);
    
    const stageInterval = setInterval(() => {
      setProcessingStage(prev => (prev + 1) % 4);
    }, 2000);

    // Simulate AI processing with minimum 8-second delay
    await new Promise(resolve => setTimeout(resolve, 8000));

    // Generate notes from marketing examples
    const marketingNotes = industryNotes.marketing;
    let xOffset = 100;
    let yOffset = 100;

    for (const note of marketingNotes) {
      const newNote: StickyNote = {
        id: Date.now().toString() + Math.random(),
        content: note.content,
        color: colors[Math.floor(Math.random() * colors.length)],
        position: { x: xOffset, y: yOffset },
        isApproved: false,
        group: note.group,
        preview: note.preview
      };

      setNotes(prev => [...prev, newNote]);
      await new Promise(resolve => setTimeout(resolve, 200));

      yOffset += 120;
      if (yOffset > 400) {
        yOffset = 100;
        xOffset += 320;
      }
    }

    clearInterval(stageInterval);
    setProcessingStage(-1);
    setIsGeneratingNotes(false);
    setPrompt('');
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-hidden p-8"
        style={{ cursor: draggedNoteId ? 'grabbing' : 'default' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Let's brainstorm..."
                  className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  if (!canvasRef.current) return;
                  const rect = canvasRef.current.getBoundingClientRect();
                  const newNote: StickyNote = {
                    id: Date.now().toString() + Math.random(),
                    content: '',
                    color: colors[Math.floor(Math.random() * colors.length)],
                    position: {
                      x: Math.random() * (rect.width - 288),
                      y: Math.random() * (rect.height - 200)
                    },
                    isApproved: false,
                    group: 'New Ideas'
                  };
                  setNotes(prev => [...prev, newNote]);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Empty Note
              </button>
            </div>
          </div>

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
              <motion.div
                key={`note-${note.id}`}
                className={`absolute w-72 ${note.color} rounded-lg shadow-lg transition-all duration-200 ${
                  expandedNoteId === note.id ? 'scale-105 z-10' : 'z-0'
                } ${note.isSelected ? 'ring-2 ring-blue-500' : ''} ${
                  draggedNoteId === note.id ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{ 
                  top: note.position.y,
                  left: note.position.x,
                  transition: draggedNoteId === note.id ? 'none' : 'all 0.2s ease'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onMouseDown={(e) => handleMouseDown(e, note.id)}
                onClick={() => handleNoteExpand(note.id)}
              >
                <div className="p-2 flex items-center justify-between border-b border-black/5">
                  <span className="text-xs font-medium text-gray-600">{note.group}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNoteSelect(note.id);
                      }}
                      className={`p-1 rounded transition-colors ${
                        note.isSelected ? 'bg-blue-500 text-white' : 'hover:bg-black/5'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => handleNoteDelete(e, note.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium mb-2">{note.content}</h3>
                  {note.preview && (
                    <p className="text-sm text-gray-600">{note.preview}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l flex flex-col">
        <div className="flex-1 p-4">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Selected Notes ({notepadItems.filter(item => item.isSelected).length})</h3>
            {notepadItems.length > 0 ? (
              <div className="space-y-2">
                {notepadItems.map((item) => (
                  <div
                    key={`notepad-${item.id}`}
                    className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <button
                      onClick={() => handleNotepadToggle(item.id)}
                      className={`p-1 rounded transition-colors ${
                        item.isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <div className="flex-1">
                      <p className="text-sm">{item.content}</p>
                      <span className="text-xs text-gray-500">{item.group}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No notes selected</p>
            )}
          </div>

          {notepadItems.length > 0 && (
            <button
              onClick={handleSaveToBackpocket}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Add Selected to Backpocket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrainstormMode;