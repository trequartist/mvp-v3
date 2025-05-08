import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PenTool, Users2, X, Bot, Send, Settings2, ArrowRight } from 'lucide-react';
import { useStudioStore } from '../../store';
import { availableModels } from '../../store';
import type { AgentType } from '../../types';
import Logo from '../common/Logo';
import ProcessingIndicator from '../common/ProcessingIndicator';
import AudienceAnalysis from '../analysis/AudienceAnalysis';
import ResearchAgentModal from '../agents/ResearchAgentModal';
import CopywriterAgentModal from '../agents/CopywriterAgentModal';
import { Button, Card, Modal } from '../shared';

interface AgentCardProps {
  agent: typeof agents[0];
  isActive: boolean;
  modelId: string;
  onSelect: () => void;
  onOpenSettings: () => void;
}

const agents = [
  { 
    type: 'research' as AgentType, 
    name: 'Research Agent',
    icon: Search,
    bgColor: 'bg-blue-100',
    description: "Enhances your content with relevant data and insights"
  },
  { 
    type: 'drafting' as AgentType, 
    name: 'Copywriter Agent',
    icon: PenTool,
    bgColor: 'bg-blue-200',
    description: "Refines and enhances your content"
  },
  { 
    type: 'audience' as AgentType, 
    name: 'Audience Panel',
    icon: Users2,
    bgColor: 'bg-purple-200',
    description: "Get feedback from your target audience"
  }
];

const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive, modelId, onSelect, onOpenSettings }) => {
  const Icon = agent.icon;
  const currentModel = availableModels.find(m => m.id === modelId);

  return (
    <Card 
      className={`w-full p-3 ${agent.bgColor} transition-all duration-200`}
      interactive
    >
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-2 flex-1 cursor-pointer"
          onClick={onSelect}
        >
          <Icon className="w-4 h-4" />
          <span className="font-medium text-sm">{agent.name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={Settings2}
          onClick={onOpenSettings}
          className="!p-1 hover:bg-white/30"
        />
      </div>
      {currentModel && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <img 
            src={currentModel.icon} 
            alt={currentModel.provider}
            className="w-3.5 h-3.5 object-contain opacity-60"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-[11px] text-gray-600">{currentModel.name}</span>
          {currentModel.badge && (
            <span className="px-1 py-0.5 text-[9px] bg-pink-50 text-pink-600 rounded">
              {currentModel.badge}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

interface SettingsModalProps {
  agent: typeof agents[0];
  modelId: string;
  onClose: () => void;
  onModelChange: (modelId: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ agent, modelId, onClose, onModelChange }) => {
  return (
    <Modal 
      isOpen={true} 
      onClose={onClose}
      title={`${agent.name} Settings`}
      size="sm"
    >
      <div className="p-4">
        <h4 className="text-xs font-medium text-gray-700 mb-2">Select AI Model</h4>
        <div className="space-y-1.5">
          {availableModels.map(model => (
            <Card
              key={model.id}
              interactive
              onClick={() => {
                onModelChange(model.id);
                onClose();
              }}
              className={`flex items-center gap-2 p-2 ${
                model.id === modelId 
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-transparent'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <img 
                  src={model.icon} 
                  alt={model.provider}
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{model.name}</span>
                  {model.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-pink-50 text-pink-600 rounded">
                      {model.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{model.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Modal>
  );
};

const AgentGallery: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [settingsAgent, setSettingsAgent] = useState<typeof agents[0] | null>(null);
  const [showAudienceAnalysis, setShowAudienceAnalysis] = useState(false);
  const [showResearchAgent, setShowResearchAgent] = useState(false);
  const [showCopywriterAgent, setShowCopywriterAgent] = useState(false);
  const { activeAgent, setActiveAgent, agents: storeAgents, updateAgentModel } = useStudioStore();

  const handleAgentSelect = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    setActiveAgent(agent.type);
    
    if (agent.type === 'audience') {
      setShowAudienceAnalysis(true);
    } else if (agent.type === 'research') {
      setShowResearchAgent(true);
    } else if (agent.type === 'drafting') {
      setShowCopywriterAgent(true);
    }
  };

  return (
    <>
      <motion.div 
        className="w-72 bg-white rounded-lg p-4 flex flex-col gap-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-1.5">
          {agents.map((agent) => {
            const isActive = activeAgent === agent.type;
            const storeAgent = storeAgents.find(a => a.type === agent.type);
            
            return (
              <AgentCard
                key={agent.type}
                agent={agent}
                isActive={isActive}
                modelId={storeAgent?.activeModel || ''}
                onSelect={() => handleAgentSelect(agent)}
                onOpenSettings={() => setSettingsAgent(agent)}
              />
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {showAudienceAnalysis && (
          <AudienceAnalysis onClose={() => setShowAudienceAnalysis(false)} />
        )}
        {showResearchAgent && (
          <ResearchAgentModal onClose={() => setShowResearchAgent(false)} />
        )}
        {showCopywriterAgent && (
          <CopywriterAgentModal onClose={() => setShowCopywriterAgent(false)} />
        )}
        {settingsAgent && (
          <SettingsModal
            agent={settingsAgent}
            modelId={storeAgents.find(a => a.type === settingsAgent.type)?.activeModel || ''}
            onClose={() => setSettingsAgent(null)}
            onModelChange={(modelId) => updateAgentModel(settingsAgent.type, modelId)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AgentGallery;