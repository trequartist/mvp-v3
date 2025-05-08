import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Check, X, ArrowUpRight } from 'lucide-react';
import { useStudioStore } from '../../store';
import type { StickyNote as StickyNoteType } from '../../types';
import IdeaTuningModal from './IdeaTuningModal';
import PromoteIdeaModal from './PromoteIdeaModal';
import Logo from '../common/Logo';

interface StickyNoteProps {
  note: StickyNoteType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
  onPositionUpdate: (id: string, position: { x: number; y: number }) => void;
  boardRef: React.RefObject<HTMLDivElement>;
}

const StickyNote: React.FC<StickyNoteProps> = ({
  note,
  onDelete,
  onUpdate,
  onPositionUpdate,
  boardRef
}) => {
  const [showTuning, setShowTuning] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const noteRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const { addConcept, concepts } = useStudioStore();
  const isPromoted = concepts.some(concept => concept.origin === 'ideas' && concept.sourceId === note.id);

  useEffect(() => {
    setContent(note.content);
  }, [note.content]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    if (e.target instanceof HTMLElement && 
        (e.target.closest('button') || e.target.tagName === 'TEXTAREA')) {
      return;
    }

    e.preventDefault();
    const board = boardRef.current;
    const noteElement = noteRef.current;
    if (!board || !noteElement) return;

    const boardRect = board.getBoundingClientRect();
    const noteRect = noteElement.getBoundingClientRect();

    dragOffset.current = {
      x: e.clientX - noteRect.left,
      y: e.clientY - noteRect.top
    };

    setIsDragging(true);

    const handleDrag = (e: MouseEvent) => {
      if (!board) return;

      const boardRect = board.getBoundingClientRect();
      const maxX = boardRect.width - noteRect.width;
      const maxY = boardRect.height - noteRect.height;

      let newX = e.clientX - boardRect.left - dragOffset.current.x;
      let newY = e.clientY - boardRect.top - dragOffset.current.y;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      requestAnimationFrame(() => {
        onPositionUpdate(note.id, { x: newX, y: newY });
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
  };

  const handlePromote = (hook: string, description: string) => {
    addConcept({
      id: Date.now().toString(),
      hook,
      description,
      approved: false,
      origin: 'ideas',
      sourceId: note.id
    });
    setShowPromoteModal(false);
  };

  return (
    <>
      <motion.div
        ref={noteRef}
        style={{
          position: 'absolute',
          top: note.position.y,
          left: note.position.x,
          touchAction: 'none',
          willChange: 'transform',
          zIndex: isDragging ? 50 : 'auto'
        }}
        className={`
          w-72 rounded-lg select-none backdrop-blur-[2px]
          ${note.color}
          ${isDragging ? 'cursor-grabbing shadow-xl' : 'cursor-grab hover:shadow-lg'}
          ${isPromoted ? 'ring-2 ring-blue-500/50' : ''}
          transition-shadow duration-200
        `}
        animate={{ 
          scale: isDragging ? 1.02 : 1,
        }}
        transition={{ 
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.8
        }}
        onMouseDown={handleDragStart}
      >
        {/* Header */}
        <div className="p-3 flex items-center justify-between border-b border-black/5 bg-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onUpdate(note.id, content);
                    setIsEditing(false);
                  }}
                  className="p-1.5 hover:bg-white/30 rounded transition-colors"
                >
                  <Check className="w-4 h-4 text-green-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setContent(note.content);
                    setIsEditing(false);
                  }}
                  className="p-1.5 hover:bg-white/30 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-red-600" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 hover:bg-white/30 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTuning(true)}
                  className="p-1.5 hover:bg-white/30 rounded transition-colors relative group"
                >
                  <div className="relative">
                    <Logo className="w-6 h-6 text-blue-600" />
                    <motion.div
                      className="absolute inset-0 bg-blue-500 rounded-full opacity-20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPromoteModal(true)}
                  className="p-1.5 hover:bg-white/30 rounded transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                </motion.button>
              </>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(note.id)}
            className="p-1.5 hover:bg-red-100 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 bg-white/10 backdrop-blur-[1px] rounded-b-lg">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 bg-transparent resize-none focus:outline-none placeholder:text-gray-500/50"
              placeholder="Write your idea here..."
            />
          ) : (
            <p className="text-gray-700 break-words">{note.content}</p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showTuning && (
          <IdeaTuningModal
            note={note}
            position={note.position}
            onClose={() => setShowTuning(false)}
            onUpdate={onUpdate}
          />
        )}
        {showPromoteModal && (
          <PromoteIdeaModal
            note={note}
            onClose={() => setShowPromoteModal(false)}
            onPromote={handlePromote}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyNote;