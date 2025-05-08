import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, ListChecks, MessageSquare, Sparkles, Clock, ChevronDown, ChevronUp, Edit2, Save, X } from 'lucide-react';
import { useStudioStore } from '../../store';
import type { ContentBrief as ContentBriefType } from '../../types';

const ContentBrief: React.FC = () => {
  const { contentBrief, updateContentBrief } = useStudioStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBrief, setEditedBrief] = useState<ContentBriefType>(contentBrief);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="bg-white">
      <div 
        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
          isExpanded ? 'border-b' : ''
        }`}
        onClick={() => !isEditing && setIsExpanded(!isExpanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-medium">Content Brief</h2>
            <span className="text-sm text-gray-500">{contentBrief.objective}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Users className="w-3.5 h-3.5" />
            <span>{contentBrief.targetAudience.join(', ')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated {formatTime(contentBrief.lastUpdated)}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
              setIsExpanded(true);
            }}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-medium">Objective</h3>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editedBrief.objective}
                      onChange={(e) => setEditedBrief({ ...editedBrief, objective: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{contentBrief.objective}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <h3 className="text-sm font-medium">Target Audience</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(isEditing ? editedBrief : contentBrief).targetAudience.map((audience, index) => (
                      <div key={index} className="flex items-center gap-1">
                        {isEditing ? (
                          <input
                            value={audience}
                            onChange={(e) => {
                              const newAudience = [...editedBrief.targetAudience];
                              newAudience[index] = e.target.value;
                              setEditedBrief({ ...editedBrief, targetAudience: newAudience });
                            }}
                            className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                          />
                        ) : (
                          <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                            {audience}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ListChecks className="w-4 h-4 text-green-600" />
                    <h3 className="text-sm font-medium">Key Points</h3>
                  </div>
                  <ul className="space-y-2">
                    {(isEditing ? editedBrief : contentBrief).keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {isEditing ? (
                          <input
                            value={point}
                            onChange={(e) => {
                              const newPoints = [...editedBrief.keyPoints];
                              newPoints[index] = e.target.value;
                              setEditedBrief({ ...editedBrief, keyPoints: newPoints });
                            }}
                            className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                          />
                        ) : (
                          <span className="text-sm text-gray-600">{point}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-orange-600" />
                    <h3 className="text-sm font-medium">Tone & Style</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(isEditing ? editedBrief : contentBrief).tone.map((tone, index) => (
                      <div key={index} className="flex items-center gap-1">
                        {isEditing ? (
                          <input
                            value={tone}
                            onChange={(e) => {
                              const newTone = [...editedBrief.tone];
                              newTone[index] = e.target.value;
                              setEditedBrief({ ...editedBrief, tone: newTone });
                            }}
                            className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                          />
                        ) : (
                          <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                            {tone}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-medium">Keywords</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(isEditing ? editedBrief : contentBrief).keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center gap-1">
                        {isEditing ? (
                          <input
                            value={keyword}
                            onChange={(e) => {
                              const newKeywords = [...editedBrief.keywords];
                              newKeywords[index] = e.target.value;
                              setEditedBrief({ ...editedBrief, keywords: newKeywords });
                            }}
                            className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          />
                        ) : (
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {keyword}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Desired Outcome</h3>
                  {isEditing ? (
                    <textarea
                      value={editedBrief.desiredOutcome}
                      onChange={(e) => setEditedBrief({ ...editedBrief, desiredOutcome: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{contentBrief.desiredOutcome}</p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 p-4 border-t">
                <button
                  onClick={() => {
                    setEditedBrief(contentBrief);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateContentBrief({
                      ...editedBrief,
                      lastUpdated: Date.now()
                    });
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentBrief;