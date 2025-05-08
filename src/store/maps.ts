// Type Maps
export const AgentTypeMap = {
  RESEARCH: 'research',
  DRAFTING: 'drafting',
  AUDIENCE: 'audience'
} as const;

export const MessageTypeMap = {
  USER: 'user',
  ASSISTANT: 'assistant'
} as const;

export const AssistantModeMap = {
  WRITE: 'write',
  RESEARCH: 'research',
  DISCUSS: 'discuss'
} as const;

export const TabMap = {
  IDEAS: 'ideas',
  CONCEPTS: 'concepts',
  POST: 'post'
} as const;

// URL Parameter Maps
export const SearchParamMap = {
  TAB: 'tab',
  MODE: 'mode',
  AGENT: 'agent',
  SEARCH: 'search',
  FILTER: 'filter'
} as const;

// Strategy Document Sections
export const sections = {
  executiveSummary: {
    title: "Executive Summary",
    content: {
      intro: "This comprehensive content strategy establishes Alex Chen as a practical thought leader in the AI automation space while driving qualified leads for NexusAI. Based on analysis of Alex's communication style, target audience needs, and competitive landscape, we've developed a tailored approach with the following core elements:",
      strategicObjectives: [
        "Establish Alex as a trusted expert in AI implementation for small businesses",
        "Generate 50+ qualified leads monthly through LinkedIn content",
        "Increase brand awareness for NexusAI within the small business ecosystem",
        "Position Alex and NexusAI as distinct from enterprise-focused AI solutions",
        "Build a community of small business leaders navigating technology transformation"
      ],
      keyDifferentiators: [
        "Focus on practical implementation rather than theoretical AI capabilities",
        "Demystify complex AI concepts through relatable small business examples",
        "Balance technical credibility with accessibility for non-technical decision-makers",
        "Emphasize human-centered AI that enhances rather than replaces workers",
        "Share authentic founder insights not typically found in corporate content"
      ],
      executionApproach: [
        "Consistent posting cadence (8-10 posts weekly across various formats)",
        "Content organized around five strategic pillars mapped to audience needs",
        "Voice and tone calibrated specifically to Alex's natural communication style",
        "Strategic engagement with target audience conversations and communities",
        "Performance monitoring with monthly optimization and quarterly strategic reviews"
      ],
      conclusion: "This strategy leverages Alex's unique position as both a technical expert and founder who understands small business challenges, creating content that stands out in an increasingly crowded AI conversation dominated by enterprise solutions and technical jargon."
    }
  },
  voiceAnalysis: {
    title: "Voice & Tone Analysis",
    content: {
      characteristics: [
        "Technical but striving to be accessible",
        "Thoughtful and analytical",
        "Occasionally uses metaphors to explain complex concepts",
        "Straightforward with moments of dry humor",
        "Passionate about the practical impact of AI on small businesses"
      ],
      guidelines: [
        "Use first-person perspective with conversational language",
        "Include technical terms when necessary, but always with accessible explanations",
        "Incorporate real-world examples to ground concepts",
        "Keep sentences direct with occasional longer, more nuanced thoughts",
        "Balance optimism about AI with acknowledgment of challenges",
        "Maintain authenticity by occasionally referencing personal experiences as a founder"
      ]
    }
  },
  audience: {
    title: "Target Audience",
    segments: [
      {
        name: "Primary: Small Business Decision-Makers",
        painPoints: ["Limited resources", "Overwhelmed by technology options"],
        interests: ["Practical applications", "ROI", "Simple implementations"],
        preferences: ["Case studies", "Step-by-step guides", "Jargon-free explanations"]
      },
      {
        name: "Secondary: Tech Industry Peers & Potential Partners",
        painPoints: ["Keeping up with AI advancements", "Finding authentic differentiation"],
        interests: ["Technical innovations", "Industry trends", "Collaboration opportunities"],
        preferences: ["Deeper technical insights", "Thought leadership", "Future predictions"]
      },
      {
        name: "Tertiary: Investors & Tech Media",
        painPoints: ["Identifying legitimate AI innovations vs. hype"],
        interests: ["Market potential", "Competitive landscape", "Founder vision"],
        preferences: ["Market analysis", "Growth metrics", "Differentiated viewpoints"]
      }
    ]
  },
  contentPillars: {
    title: "Content Pillars",
    pillars: [
      {
        title: "Practical AI Implementation",
        points: [
          "Focus on demystifying AI implementation for small businesses",
          "Showcase real-world applications with tangible results",
          "Address common misconceptions and implementation challenges",
          "Connect to NexusAI's mission of making AI accessible"
        ]
      },
      {
        title: "The Human Side of AI",
        points: [
          "Explore how AI enhances rather than replaces human work",
          "Discuss ethical considerations and responsible AI development",
          "Share stories of how AI tools change workflows and business outcomes",
          "Relate to NexusAI's approach to human-centered design"
        ]
      },
      {
        title: "Founder's Journey",
        points: [
          "Share honest insights from building NexusAI",
          "Discuss challenges, pivots, and lessons learned",
          "Connect personal experiences to broader entrepreneurship themes",
          "Build relatability while establishing credibility"
        ]
      },
      {
        title: "AI Ecosystem Trends",
        points: [
          "Analyze emerging trends with balanced perspective",
          "Cut through hype cycles with evidence-based assessments",
          "Provide forward-looking insights without overpromising",
          "Position Alex as a thoughtful interpreter of the AI landscape"
        ]
      },
      {
        title: "Small Business Transformation",
        points: [
          "Highlight stories of small businesses evolving with technology",
          "Address specific pain points and solutions",
          "Connect technological adoption to business outcomes",
          "Showcase NexusAI's impact without being overtly promotional"
        ]
      }
    ]
  },
  formats: {
    title: "Content Formats & Cadence",
    recommendations: [
      {
        type: "Highly Recommended",
        formats: [
          {
            name: "Text posts with 2-3 paragraphs",
            cadence: "3x weekly"
          },
          {
            name: "Carousel posts breaking down complex topics",
            cadence: "1x weekly"
          },
          {
            name: "Polls + insights follow-up",
            cadence: "2x monthly"
          },
          {
            name: "Day in the life posts",
            cadence: "1x monthly"
          }
        ]
      },
      {
        type: "Recommended",
        formats: [
          {
            name: "Short-form video explanations",
            cadence: "1x monthly"
          },
          {
            name: "Industry news commentary",
            cadence: "As relevant"
          },
          {
            name: "LinkedIn articles",
            cadence: "1x monthly"
          },
          {
            name: "Simple infographics",
            cadence: "2x monthly"
          }
        ]
      },
      {
        type: "Experimental",
        formats: [
          {
            name: "LinkedIn Live Q&A",
            cadence: "1x quarterly"
          },
          {
            name: "Ask Me Anything threads",
            cadence: "1x monthly"
          },
          {
            name: "Collaborative posts",
            cadence: "As opportunities arise"
          }
        ]
      }
    ]
  },
  hashtags: {
    title: "Strategic Hashtag Usage",
    categories: [
      {
        name: "Primary Hashtags",
        description: "Include in most posts",
        tags: ["#AIforSmallBusiness", "#PracticalAI", "#TechFounder"]
      },
      {
        name: "Secondary Hashtags",
        description: "Rotate based on content",
        tags: ["#AIImplementation", "#SmallBusinessTech", "#StartupJourney", "#AITrends", "#TechEntrepreneurship", "#ResponsibleAI"]
      },
      {
        name: "Trending/Niche Hashtags",
        description: "Use selectively",
        tags: ["Industry-specific tags", "Event-related tags", "Trending AI community tags"]
      }
    ]
  },
  engagement: {
    title: "Engagement Strategy",
    strategies: {
      reactive: [
        "Respond to all comments within 24 hours",
        "Engage with thoughtful questions to foster discussion",
        "Thank people for sharing content and adding insights"
      ],
      proactive: [
        "Comment on relevant posts from industry leaders",
        "Support other founders with authentic insights",
        "Engage with target customers' business content",
        "Participate in relevant LinkedIn groups"
      ]
    }
  },
  metrics: {
    title: "Success Metrics",
    categories: [
      {
        name: "Growth Metrics",
        targets: [
          "Follower growth rate (target: 10% monthly)",
          "Average post reach (target: 25% of follower count)",
          "Profile view increase (target: 15% quarterly)"
        ]
      },
      {
        name: "Engagement Metrics",
        targets: [
          "Comment-to-like ratio (target: >10%)",
          "Shares per post (target: >5% of impressions)",
          "Carousel completion rate (target: >50%)"
        ]
      },
      {
        name: "Business Impact Metrics",
        targets: [
          "Website visits from LinkedIn (target: 500 monthly)",
          "Lead form completions (target: 50 monthly)",
          "Sales conversations attributed to LinkedIn (target: 25 monthly)"
        ]
      }
    ]
  },
  integration: {
    title: "Integration with Overall Marketing Strategy",
    points: [
      "Amplifying key messages from NexusAI's website and blog",
      "Supporting product launches and feature announcements",
      "Providing a personal dimension to company news",
      "Creating shareable content for team members and partners",
      "Establishing credibility that supports sales conversations"
    ],
    review: "The strategy will be reviewed monthly with performance analysis and quarterly with comprehensive assessment and adjustments."
  }
} as const;