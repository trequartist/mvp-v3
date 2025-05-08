import { create } from 'zustand';
import { createSearchParamsStore } from 'nuqs/zustand';
import type { AgentType, AssistantMessage, ContentBrief, PostConcept } from '../types';
import { industryNotes, defaultConcepts } from './industryNotes';
import { SearchParamMap } from './maps';

// URL Search Params Store
export const useSearchParams = createSearchParamsStore({
  [SearchParamMap.TAB]: {
    defaultValue: 'ideas',
    parse: (value) => value,
    serialize: (value) => value
  },
  [SearchParamMap.MODE]: {
    defaultValue: 'write',
    parse: (value) => value,
    serialize: (value) => value
  },
  [SearchParamMap.AGENT]: {
    defaultValue: null,
    parse: (value) => value,
    serialize: (value) => value
  },
  [SearchParamMap.SEARCH]: {
    defaultValue: '',
    parse: (value) => value,
    serialize: (value) => value
  },
  [SearchParamMap.FILTER]: {
    defaultValue: null,
    parse: (value) => value,
    serialize: (value) => value
  }
});

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

  // Text Selection Handler
  handleTextSelect: (text: string) => any[];
}

const defaultDrafts = [
  {
    id: 'draft-1',
    content: `The future of personal finance won't be shaped by generic AI assistants – it will be transformed by deeply personalized financial copilots that understand your unique context and culture.

Companies using these specialized credit systems see 3-4x higher approval rates while maintaining strong repayment performance. Not because they're lowering standards, but because they're finally measuring the right things in the right context.

Traditional systems rely on limited data points and often exclude those without conventional credit histories. By incorporating cultural context and alternative data sources, we can build more inclusive financial systems that work for everyone.

The next wave of fintech innovation will be driven by AI that doesn't just process numbers, but truly understands the cultural fabric of how different communities think about and handle money.`,
    timestamp: Date.now() - 1000 * 60 * 60 * 2 // 2 hours ago
  },
  {
    id: 'draft-2',
    content: `AI is revolutionizing personal finance, but not through generic assistants. The real transformation is coming from AI copilots that deeply understand your cultural context and unique financial needs.

These specialized credit systems are achieving what seemed impossible: 3-4x higher approval rates with zero compromise on repayment performance. Why? Because they're the first to truly measure creditworthiness through a cultural lens.

Traditional credit systems, built on Western financial assumptions, overlook the rich tapestry of informal financial relationships and community trust networks that define how billions of people actually manage money.

The future belongs to AI systems that don't just process transactions, but understand the cultural DNA of financial behavior across different communities.`,
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
  
  contentDraft: defaultDrafts[1].content,
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
  
  contentBrief: {
    objective: "Create thought leadership content on AI and financial inclusion",
    targetAudience: ["FinTech founders", "Investors", "Industry innovators"],
    keyPoints: [
      "AI's role in financial inclusion",
      "Cultural adaptation in FinTech",
      "Building trust across markets"
    ],
    tone: ["Professional", "Visionary", "Authoritative"],
    keywords: ["AI", "FinTech", "Financial Inclusion", "Innovation"],
    desiredOutcome: "Position as a thought leader in culturally-aware AI financial solutions",
    lastUpdated: Date.now()
  },
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

  handleTextSelect: (text: string) => {
    return [
      {
        id: '1',
        content: 'Make it more impactful: "The next decade of fintech innovation will be defined not by generic AI, but by culturally-aware financial copilots that understand the unique ways different communities think about and manage money."',
        type: 'alternative'
      },
      {
        id: '2',
        content: 'Add supporting data: "Studies show that AI systems incorporating cultural context achieve 2.8x better accuracy in credit risk assessment while increasing approval rates by 156%."',
        type: 'alternative'
      },
      {
        id: '3',
        content: 'Make more human: "Forget generic AI assistants – the real game-changer in personal finance will be AI copilots that truly get your cultural background and unique financial story."',
        type: 'alternative'
      }
    ];
  }
}));

export { industryNotes };