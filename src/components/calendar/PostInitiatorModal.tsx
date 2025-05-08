import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, Sparkles, Calendar, Clock, Target, Mic,
  MessageSquare, X, ChevronDown, FileText, ArrowRight,
  Bot, Upload, ChevronRight, Edit2, Users, ChevronUp,
  Plus, Save, Trash2, ListChecks
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { voiceNotes, useStudioStore } from '../../store';
import { Button, Card, Input, Modal } from '../shared';
import ProcessingIndicator from '../common/ProcessingIndicator';
import type { ContentBrief as ContentBriefType } from '../../types';

interface PostInitiatorModalProps {
  selectedDate: Date | null;
  onClose: () => void;
  onSubmit: (route: 'concepts' | 'editor') => void;
}

const contentPillars = [
  { id: 'financial', name: 'Financial Inclusion', color: 'blue' },
  { id: 'cultural', name: 'Cultural Innovation', color: 'purple' },
  { id: 'ai', name: 'AI Innovation', color: 'green' },
  { id: 'product', name: 'Product Strategy', color: 'orange' }
];

const postFormats = [
  { id: 'strategic', name: 'Strategic Prediction' },
  { id: 'insight', name: 'Innovation Insight' },
  { id: 'analysis', name: 'Impact Analysis' },
  { id: 'cultural', name: 'Cultural Lens' }
];

const PostInitiatorModal: React.FC<PostInitiatorModalProps> = ({ selectedDate, onClose, onSubmit }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [date, setDate] = useState(selectedDate || new Date());
  const [time, setTime] = useState('09:00');
  const [selectedPillar, setSelectedPillar] = useState(contentPillars[0].id);
  const [selectedFormat, setSelectedFormat] = useState(postFormats[0].id);
  const [showBriefDetails, setShowBriefDetails] = useState(false);
  const [isEditingBrief, setIsEditingBrief] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const { contentBrief, updateContentBrief } = useStudioStore();
  const [editedBrief, setEditedBrief] = useState<ContentBriefType>(contentBrief);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: acceptedFiles => {}
  });

  const handleBriefSave = () => {
    updateContentBrief({
      ...editedBrief,
      lastUpdated: Date.now()
    });
    setIsEditingBrief(false);
  };

  const addItem = (field: keyof ContentBriefType) => {
    if (Array.isArray(editedBrief[field])) {
      setEditedBrief({
        ...editedBrief,
        [field]: [...(editedBrief[field] as string[]), '']
      });
    }
  };

  const removeItem = (field: keyof ContentBriefType, index: number) => {
    if (Array.isArray(editedBrief[field])) {
      setEditedBrief({
        ...editedBrief,
        [field]: (editedBrief[field] as string[]).filter((_, i) => i !== index)
      });
    }
  };

  const handleSubmit = async (route: 'concepts' | 'editor') => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onSubmit(route);
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title="Create Post" 
      size="sm"
      transitionDuration={0.2}
    >
      {isProcessing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-12 flex flex-col items-center justify-center"
        >
          <ProcessingIndicator 
            text="Preparing Concept Explorer"
            subText="Analyzing your content strategy..."
            size="lg"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col max-h-[85vh]"
        >
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Content Brief */}
              <div 
                className={`bg-gray-50 rounded-lg transition-all ${showBriefDetails ? 'ring-1 ring-blue-500' : ''}`}
              >
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium mb-0.5">Content Brief</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 truncate max-w-[200px]">
                          {(isEditingBrief ? editedBrief : contentBrief).targetAudience[0]}
                        </span>
                        {(isEditingBrief ? editedBrief : contentBrief).targetAudience.length > 1 && (
                          <span className="text-xs text-gray-400">
                            +{(isEditingBrief ? editedBrief : contentBrief).targetAudience.length - 1} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isEditingBrief) {
                          handleBriefSave();
                        } else {
                          setIsEditingBrief(true);
                          setShowBriefDetails(true);
                        }
                      }}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        isEditingBrief 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      {isEditingBrief ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => !isEditingBrief && setShowBriefDetails(!showBriefDetails)}
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                    >
                      {showBriefDetails ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {showBriefDetails && (
                  <div className="px-3 pb-3 border-t border-gray-100">
                    <div className="pt-3 space-y-3 max-h-[400px] overflow-y-auto">
                      <div>
                        <h3 className="text-xs font-medium text-gray-600 mb-1">Objective</h3>
                        {isEditingBrief ? (
                          <textarea
                            value={editedBrief.objective}
                            onChange={(e) => setEditedBrief({ ...editedBrief, objective: e.target.value })}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            rows={2}
                          />
                        ) : (
                          <p className="text-sm text-gray-700">{contentBrief.objective}</p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xs font-medium text-gray-600">Target Audience</h3>
                          {isEditingBrief && (
                            <button
                              onClick={() => addItem('targetAudience')}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(isEditingBrief ? editedBrief : contentBrief).targetAudience.map((audience, index) => (
                            <div key={index} className="flex items-center gap-1">
                              {isEditingBrief ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    value={audience}
                                    onChange={(e) => {
                                      const newAudience = [...editedBrief.targetAudience];
                                      newAudience[index] = e.target.value;
                                      setEditedBrief({ ...editedBrief, targetAudience: newAudience });
                                    }}
                                    className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                                  />
                                  <button
                                    onClick={() => removeItem('targetAudience', index)}
                                    className="p-1 hover:bg-red-100 rounded transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              ) : (
                                <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                                  {audience}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xs font-medium text-gray-600">Key Points</h3>
                          {isEditingBrief && (
                            <button
                              onClick={() => addItem('keyPoints')}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <ul className="space-y-1">
                          {(isEditingBrief ? editedBrief : contentBrief).keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              {isEditingBrief ? (
                                <div className="flex-1 flex items-center gap-1">
                                  <input
                                    value={point}
                                    onChange={(e) => {
                                      const newPoints = [...editedBrief.keyPoints];
                                      newPoints[index] = e.target.value;
                                      setEditedBrief({ ...editedBrief, keyPoints: newPoints });
                                    }}
                                    className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                  />
                                  <button
                                    onClick={() => removeItem('keyPoints', index)}
                                    className="p-1 hover:bg-red-100 rounded transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-700">{point}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xs font-medium text-gray-600">Tone & Style</h3>
                          {isEditingBrief && (
                            <button
                              onClick={() => addItem('tone')}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(isEditingBrief ? editedBrief : contentBrief).tone.map((tone, index) => (
                            <div key={index} className="flex items-center gap-1">
                              {isEditingBrief ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    value={tone}
                                    onChange={(e) => {
                                      const newTone = [...editedBrief.tone];
                                      newTone[index] = e.target.value;
                                      setEditedBrief({ ...editedBrief, tone: newTone });
                                    }}
                                    className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                                  />
                                  <button
                                    onClick={() => removeItem('tone', index)}
                                    className="p-1 hover:bg-red-100 rounded transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              ) : (
                                <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs">
                                  {tone}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xs font-medium text-gray-600">Keywords</h3>
                          {isEditingBrief && (
                            <button
                              onClick={() => addItem('keywords')}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(isEditingBrief ? editedBrief : contentBrief).keywords.map((keyword, index) => (
                            <div key={index} className="flex items-center gap-1">
                              {isEditingBrief ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    value={keyword}
                                    onChange={(e) => {
                                      const newKeywords = [...editedBrief.keywords];
                                      newKeywords[index] = e.target.value;
                                      setEditedBrief({ ...editedBrief, keywords: newKeywords });
                                    }}
                                    className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                  />
                                  <button
                                    onClick={() => removeItem('keywords', index)}
                                    className="p-1 hover:bg-red-100 rounded transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              ) : (
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                                  {keyword}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {isEditingBrief && (
                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => {
                              setEditedBrief(contentBrief);
                              setIsEditingBrief(false);
                            }}
                            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleBriefSave}
                            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Settings */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Pillar</label>
                  <select 
                    value={selectedPillar}
                    onChange={(e) => setSelectedPillar(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {contentPillars.map(pillar => (
                      <option key={pillar.id} value={pillar.id}>{pillar.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Format</label>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {postFormats.map(format => (
                      <option key={format.id} value={format.id}>{format.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Copywriter Instructions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <label className="text-sm font-medium">Instructions for Copywriter Agent</label>
                  </div>
                  <button
                    onClick={() => setIsVoiceMode(!isVoiceMode)}
                    className={`p-1.5 rounded transition-colors ${
                      isVoiceMode ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                </div>
                {isVoiceMode ? (
                  <button className="w-full h-24 bg-purple-50 rounded-lg border-2 border-dashed border-purple-200 flex items-center justify-center gap-2 text-sm text-purple-700 hover:bg-purple-100 transition-colors">
                    <Mic className="w-4 h-4" />
                    Click to record instructions
                  </button>
                ) : (
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Add specific instructions or context for the Copywriter Agent..."
                    className="w-full p-2.5 border rounded-lg text-sm bg-purple-50/50 placeholder:text-purple-600/50 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    rows={2}
                  />
                )}
              </div>

              {/* Schedule & Upload */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Date</label>
                  <Input
                    type="date"
                    value={date.toISOString().split('T')[0]}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    className="!py-1.5 !text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Time</label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="!py-1.5 !text-sm"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div {...getRootProps()} className="border border-dashed rounded-lg p-2 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <input {...getInputProps()} />
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Upload className="w-3.5 h-3.5" />
                  {acceptedFiles.length > 0 ? `${acceptedFiles.length} files selected` : 'Add files'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t bg-gray-50">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="primary"
                  icon={PenTool}
                  onClick={() => handleSubmit('editor')}
                  className="flex items-center justify-center gap-2 p-3"
                >
                  Post Editor
                </Button>
                <Button
                  variant="secondary"
                  icon={Sparkles}
                  onClick={() => handleSubmit('concepts')}
                  className="flex items-center justify-center gap-2 p-3"
                >
                  Explore Concepts
                </Button>
              </div>
            </div>
          </motion.div>
      )}
    </Modal>
  );
};

export default PostInitiatorModal;