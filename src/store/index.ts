import { create } from 'zustand';
import type { AgentType, AssistantMessage, ContentBrief, PostConcept, BackpocketCard } from '../types';
import { industryNotes, defaultConcepts, contentBrief, postDraft } from './industryNotes';

interface DraftVersion {
  id: string;
  content: string;
  timestamp: number;
}

interface StudioState {
  // UI State
  showStudio: boolean;
  setShowStudio: (show: boolean) => void;
  
  // Post Initiator State
  showPostInitiator: boolean;
  setShowPostInitiator: (show: boolean) => void;
  initialTab: 'ideas' | 'concepts' | 'post';
  setInitialTab: (tab: 'ideas' | 'concepts' | 'post') => void;
  
  // Assistant State
  isAssistantVisible: boolean;
  showAssistant: () => void;
  hideAssistant: () => void;
  
  // Content State
  contentDraft: string;
  updateContentDraft: (draft: string) => void;
  draftVersions: DraftVersion[];
  addDraftVersion: (content: string) => void;
  restoreDraftVersion: (id: string) => void;
  
  // Post Date State
  selectedPostDate: Date | null;
  setSelectedPostDate: (date: Date | null) => void;
  
  // Agent State
  activeAgent: AgentType | null;
  setActiveAgent: (agent: AgentType | null) => void;
  agents: {
    type: AgentType;
    activeModel: string;
  }[];
  updateAgentModel: (type: AgentType, modelId: string) => void;
  
  // Messages State
  assistantMessages: AssistantMessage[];
  addAssistantMessage: (message: AssistantMessage) => void;
  
  // Brief State
  contentBrief: ContentBrief;
  updateContentBrief: (brief: ContentBrief) => void;

  // Action State
  actionSummary: {
    action: string;
    result: string;
    timestamp: number;
    agentType: AgentType;
  } | null;

  // Concepts State
  concepts: PostConcept[];
  addConcept: (concept: PostConcept) => void;
  updateConcept: (id: string, updates: Partial<PostConcept>) => void;
  removeConcept: (id: string) => void;

  // Backpocket State
  backpocketCards: BackpocketCard[];
  addBackpocketCard: (card: BackpocketCard) => void;
  removeBackpocketCard: (id: string) => void;

  // Text Selection Handler
  handleTextSelect: (text: string) => any[];

  // Add new onboarding state
  isOnboarded: boolean;
  completeOnboarding: () => void;
}

const defaultDrafts = [
  {
    id: 'draft-1',
    content: postDraft,
    timestamp: Date.now() - 1000 * 60 * 60 * 2 // 2 hours ago
  },
  {
    id: 'draft-2',
    content: postDraft,
    timestamp: Date.now() - 1000 * 60 * 30 // 30 minutes ago
  }
];

export const useStudioStore = create<StudioState>((set) => ({
  showStudio: false,
  setShowStudio: (show) => set({ showStudio: show }),
  
  showPostInitiator: false,
  setShowPostInitiator: (show) => set({ showPostInitiator: show }),
  
  initialTab: 'ideas',
  setInitialTab: (tab) => set({ initialTab: tab }),
  
  isAssistantVisible: false,
  showAssistant: () => set({ isAssistantVisible: true }),
  hideAssistant: () => set({ isAssistantVisible: false }),
  
  contentDraft: postDraft,
  updateContentDraft: (draft) => set({ contentDraft: draft }),
  
  draftVersions: defaultDrafts,
  addDraftVersion: (content) => set((state) => ({
    draftVersions: [
      ...state.draftVersions,
      {
        id: Date.now().toString(),
        content,
        timestamp: Date.now()
      }
    ]
  })),
  restoreDraftVersion: (id) => set((state) => {
    const version = state.draftVersions.find(v => v.id === id);
    if (version) {
      return { contentDraft: version.content };
    }
    return {};
  }),
  
  selectedPostDate: null,
  setSelectedPostDate: (date) => set({ selectedPostDate: date }),
  
  activeAgent: null,
  setActiveAgent: (agent) => set({ activeAgent: agent }),
  
  agents: [
    { type: 'research', activeModel: 'perplexity-sonar' },
    { type: 'drafting', activeModel: 'claude-3-sonnet' },
    { type: 'audience', activeModel: 'anthropic-haiku' }
  ],
  updateAgentModel: (type, modelId) => set((state) => ({
    agents: state.agents.map(agent =>
      agent.type === type ? { ...agent, activeModel: modelId } : agent
    )
  })),
  
  assistantMessages: [],
  addAssistantMessage: (message) => set((state) => ({
    assistantMessages: [...state.assistantMessages, message]
  })),
  
  contentBrief: contentBrief,
  updateContentBrief: (brief) => set({ contentBrief: brief }),

  actionSummary: null,

  concepts: defaultConcepts,
  addConcept: (concept) => set((state) => ({
    concepts: [...state.concepts, concept]
  })),
  updateConcept: (id, updates) => set((state) => ({
    concepts: state.concepts.map(concept =>
      concept.id === id ? { ...concept, ...updates } : concept
    )
  })),
  removeConcept: (id) => set((state) => ({
    concepts: state.concepts.filter(concept => concept.id !== id)
  })),

  backpocketCards: [],
  addBackpocketCard: (card) => set((state) => ({
    backpocketCards: [...state.backpocketCards, card]
  })),
  removeBackpocketCard: (id) => set((state) => ({
    backpocketCards: state.backpocketCards.filter(card => card.id !== id)
  })),

  handleTextSelect: (text: string) => {
    const mockPosts = [
      {
        id: 'w1-mon',
        brief: {
          draft: {
            alternativeHooks: [
              "The 3 reasons most small business AI implementations fail (and how to make sure yours doesn't)",
              "I've watched 200+ small businesses implement AI. The successful ones avoided these 3 critical mistakes.",
              "Want AI implementation that actually delivers ROI? Avoid these 3 mistakes I've seen sink too many small businesses.",
              "Here's why your AI implementation will probably fail (and how to prevent it)",
              "Your AI implementation doesn't have a technology problem. It has these 3 execution problems."
            ]
          }
        }
      }
    ];

    return mockPosts[0].brief.draft.alternativeHooks.map((hook, index) => ({
      id: (index + 1).toString(),
      content: hook,
      type: 'alternative'
    }));
  },

  isOnboarded: false,
  completeOnboarding: () => set({ isOnboarded: true }),
}));

export const availableModels = [
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Latest model with enhanced writing capabilities',
    icon: '/logos/anthropic.svg',
    badge: 'NEW'
  },
  {
    id: 'perplexity-sonar',
    name: 'Perplexity Sonar',
    provider: 'Perplexity',
    description: 'Specialized in research and analysis',
    icon: '/logos/deepseek.svg'
  },
  {
    id: 'gpt4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Advanced language model with broad capabilities',
    icon: '/logos/openai.svg'
  }
];

export { industryNotes };