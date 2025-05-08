export const industryNotes = {
  marketing: [
    {
      id: 'context-1',
      content: "Context is king—Model Context Protocol ends your AI hallucinations",
      group: "Value Proposition",
      preview: "Eliminate AI hallucinations with proper context management"
    },
    {
      id: 'context-2',
      content: "Prompt engineering is outdated; Model Context Protocol is the upgrade",
      group: "Product Positioning",
      preview: "Moving beyond traditional prompt engineering"
    },
    {
      id: 'context-3',
      content: "Powerful LLM, weak context? Model Context Protocol fixes that",
      group: "Problem Solution",
      preview: "Enhancing LLM performance through context"
    },
    {
      id: 'context-4',
      content: "Stop overwhelming your AI—Model Context Protocol simplifies context management",
      group: "User Benefits",
      preview: "Streamlined approach to managing AI context"
    },
    {
      id: 'context-5',
      content: "Context drift hurting accuracy? Model Context Protocol keeps LLMs precise",
      group: "Problem Solution",
      preview: "Maintaining accuracy through proper context management"
    }
  ]
};

export const defaultConcepts = [
  {
    id: 'concept-1',
    hook: "After helping 200+ small businesses implement AI, I've identified 3 implementation mistakes that kill ROI. Here's how to avoid them.",
    description: "Outline the three most common implementation mistakes specific to small businesses, each paired with a practical solution and mini-example from NexusAI's client base.",
    approved: false,
    thoughtProcess: "This concept addresses a critical pain point while establishing authority through real experience. The structure (problem + solution) provides immediate value.",
    expandedContent: {
      keyPoints: [
        "Trying to transform everything at once",
        "Buying tools before understanding processes",
        "Neglecting staff training and adoption",
        "Focus on single high-impact process first"
      ],
      marketValidation: "85% of AI projects fail to deliver on intended outcomes (Gartner), with implementation issues accounting for 64% of challenges (McKinsey).",
      implementation: "Structure as problem-solution pairs with real examples from NexusAI's client base."
    }
  },
  {
    id: 'concept-2',
    hook: "The 3 reasons most small business AI implementations fail (and how to make sure yours doesn't)",
    description: "Explore the three most common pitfalls in AI implementation for small businesses, with practical solutions and real-world examples.",
    approved: false,
    thoughtProcess: "Direct approach that speaks to business owners' fears while offering solutions. Establishes authority through pattern recognition.",
    expandedContent: {
      keyPoints: [
        "Overambitious scope leads to failure",
        "Process documentation before tool selection",
        "Human-centered implementation approach",
        "Start small, show wins, then expand"
      ],
      marketValidation: "76% of small businesses cite limited technical expertise as their main AI implementation challenge.",
      implementation: "Use client success stories to illustrate each point, focusing on measurable outcomes."
    }
  }
];

export const contentBrief = {
  objective: "Position Alex as an implementation expert and generate interest in NexusAI's approach",
  targetAudience: ["Small business owners and decision-makers considering AI adoption"],
  keyPoints: [
    "Common AI implementation mistakes",
    "Practical solutions with real examples",
    "Importance of focused approach",
    "Human-centered implementation"
  ],
  tone: ["Practical", "Experience-based", "Solution-oriented"],
  keywords: ["AI Implementation", "Small Business", "ROI", "Automation"],
  desiredOutcome: "Generate discussion about implementation experiences and position NexusAI as implementation experts",
  lastUpdated: Date.now()
};

export const postDraft = `Small businesses are wasting millions on failed AI implementations. After guiding 200+ companies through this process at NexusAI, I've seen these three critical mistakes repeatedly:

Mistake #1: Boiling the ocean
Trying to transform everything at once is a recipe for failure. One client wanted to simultaneously automate three major systems.

Solution: Start with a single, high-impact process. They refocused on inventory only and saw 40% time savings within weeks, creating momentum for future projects.

Mistake #2: Tools before process clarity
Buying software before documenting your current workflow is backward. A client purchased an AI-powered CRM but couldn't configure it because they hadn't mapped their sales process.

Solution: Thoroughly document how things work today—including exceptions—before evaluating tools. This becomes your implementation roadmap.

Mistake #3: Forgetting the humans
Technology without adoption is just expensive shelfware. One client's automation achieved only 15% usage because staff weren't properly trained and involved.

Solution: Include end-users from day one, focus on their pain points, and design around making their jobs better, not just faster.

What's been your experience? Any implementation pitfalls or successes to share?

#PracticalAI #SmallBusinessTech`;