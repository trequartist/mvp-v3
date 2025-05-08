import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Lightbulb, FileText, Save, Wand2 } from 'lucide-react';
import type { StickyNote } from '../../types';

interface BrainstormModalProps {
  onClose: () => void;
  onSave: (notes: string[]) => void;
}

const colors = ['bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-pink-100', 'bg-purple-100'];

const generateContent = (notes: StickyNote[]): string => {
  const validNotes = notes.filter(note => note.content.trim().length > 0);
  if (validNotes.length === 0) return '';

  // Group notes by color to identify themes
  const notesByColor = validNotes.reduce((acc, note) => {
    if (!acc[note.color]) acc[note.color] = [];
    acc[note.color].push(note.content);
    return acc;
  }, {} as Record<string, string[]>);

  // Generate a structured output
  let output = '';
  
  // Introduction
  output += "Based on our brainstorming session, here's a structured analysis:\n\n";

  // Main themes (by color groups)
  Object.entries(notesByColor).forEach(([color, notes], index) => {
    const themeNumber = index + 1;
    output += `Theme ${themeNumber}:\n`;
    notes.forEach(note => {
      output += `• ${note}\n`;
    });
    output += '\n';
  });

  // Synthesis
  output += "Key Insights:\n";
  validNotes.slice(0, 3).forEach(note => {
    output += `- ${note.content}\n`;
  });

  return output;
};

const BrainstormModal: React.FC<BrainstormModalProps> = ({ onClose, onSave }) => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [isNotepadMode, setIsNotepadMode] = useState(false);
  const [draggedNote, setDraggedNote] = useState<string | null>(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addNote = () => {
    const newNote: StickyNote = {
      id: Date.now().toString(),
      content: '',
      color: colors[Math.floor(Math.random() * colors.length)],
      position: { x: 50 + Math.random() * 100, y: 50 + Math.random() * 100 }
    };
    setNotes([...notes, newNote]);
  };

  const updateNoteContent = (id: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  const handleDragStart = (id: string) => {
    setDraggedNote(id);
  };

  const handleDrag = (e: React.DragEvent, id: string) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNotes(notes.map(note =>
      note.id === id ? { ...note, position: { x, y } } : note
    ));
  };

  const handleSave = async () => {
    const noteContents = notes
      .map(note => note.content.trim())
      .filter(content => content.length > 0);

    if (noteContents.length === 0) {
      onClose();
      return;
    }

    setIsGeneratingContent(true);
    const generatedContent = generateContent(notes);
    setIsGeneratingContent(false);

    onSave([generatedContent]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-[90vw] h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Brainstorming Session</h2>
            <button
              onClick={() => setIsNotepadMode(!isNotepadMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isNotepadMode ? <Lightbulb className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              {isNotepadMode ? 'Canvas Mode' : 'Notepad Mode'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isGeneratingContent}
            >
              {isGeneratingContent ? (
                <>
                  <Wand2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Generate & Save
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isNotepadMode ? (
          <div className="flex-1 p-6 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
              <h3 className="font-medium mb-4">Organized Notes</h3>
              <ul className="space-y-2">
                {notes.map((note, index) => (
                  <li key={note.id} className="flex items-start gap-2">
                    <span className="font-medium min-w-[1.5rem]">{index + 1}.</span>
                    <p className="flex-1">{note.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex-1 relative overflow-hidden" ref={canvasRef}>
            <button
              onClick={addNote}
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>
            
            {notes.map((note) => (
              <motion.div
                key={note.id}
                className={`absolute w-48 ${note.color} rounded-lg shadow-lg cursor-move`}
                style={{ top: note.position.y, left: note.position.x }}
                draggable
                onDragStart={() => handleDragStart(note.id)}
                onDrag={(e) => handleDrag(e, note.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <textarea
                  className={`w-full p-3 ${note.color} rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Type your idea..."
                  rows={4}
                  value={note.content}
                  onChange={(e) => updateNoteContent(note.id, e.target.value)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BrainstormModal;