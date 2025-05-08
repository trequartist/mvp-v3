import React from 'react';
import { ChevronDown, Target, Users, ListChecks, MessageSquare, Sparkles } from 'lucide-react';
import { Collapsible, Card } from '../shared';
import { useStudioStore } from '../../store';

const CollapsibleBrief: React.FC = () => {
  const { contentBrief } = useStudioStore();

  const title = (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Target className="w-4 h-4 text-blue-600" />
      </div>
      <div>
        <h3 className="font-medium">Content Brief</h3>
        <p className="text-sm text-gray-500">{contentBrief.objective}</p>
      </div>
    </div>
  );

  return (
    <Card>
      <Collapsible title={title}>
        <div className="p-6 border-t space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <h4 className="font-medium">Objective</h4>
                </div>
                <p className="text-sm text-gray-600">{contentBrief.objective}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <h4 className="font-medium">Target Audience</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contentBrief.targetAudience.map((audience, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                      {audience}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="w-4 h-4 text-green-500" />
                  <h4 className="font-medium">Key Points</h4>
                </div>
                <ul className="space-y-2">
                  {contentBrief.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-sm text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                  <h4 className="font-medium">Tone & Style</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contentBrief.tone.map((tone, index) => (
                    <span key={index} className="px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                      {tone}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <h4 className="font-medium">Keywords</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contentBrief.keywords.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Desired Outcome</h4>
                <p className="text-sm text-gray-600">{contentBrief.desiredOutcome}</p>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>
    </Card>
  );
};

export default CollapsibleBrief;