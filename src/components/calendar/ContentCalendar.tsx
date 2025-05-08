import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import Header from '../layout/Header';
import { Button, Card } from '../shared';
import { useStudioStore } from '../../store';
import AssistantDock from '../layout/AssistantDock';
import StrategyRoom from '../strategy/StrategyRoom';

interface ContentCalendarProps {
  onCreatePost: () => void;
}

interface Post {
  id: string;
  title: string;
  date: Date;
  contentPillar: string;
  contentType: string;
  brief: {
    topic: string;
    targetAudience?: string;
    objective?: string;
    desiredAction?: string;
    idea?: {
      title: string;
      description: string;
    };
    concept?: {
      hook: string;
      description: string;
    };
    research?: {
      statistics?: string[];
      patterns?: string[];
      examples?: string[];
    };
    draft?: {
      content: string;
      alternativeHooks?: string[];
      hashtags?: string[];
    };
  };
}

const mockPosts: Post[] = [
  // Week 1
  {
    id: 'w1-mon',
    title: "AI Implementation Failures",
    date: new Date(2025, 2, 3),
    contentPillar: 'Practical AI Implementation',
    contentType: 'Text Post',
    brief: {
      topic: 'AI Implementation Challenges',
      targetAudience: 'Small business owners and decision-makers considering AI adoption',
      objective: "Position Alex as an implementation expert and generate interest in NexusAI's approach",
      desiredAction: 'Comments sharing implementation experiences, connection requests',
      idea: {
        title: 'AI Implementation Failures - cautionary but helpful',
        description: 'Generate awareness of common pitfalls based on real client experiences, paired with solutions.'
      },
      concept: {
        hook: "After helping 200+ small businesses implement AI, I've identified 3 implementation mistakes that kill ROI. Here's how to avoid them.",
        description: "Outline the three most common implementation mistakes specific to small businesses, each paired with a practical solution and mini-example from NexusAI's client base."
      },
      research: {
        statistics: [
          "85% of AI projects fail to deliver on their intended outcomes (Gartner)",
          "Implementation issues account for 64% of AI adoption challenges (McKinsey)",
          "76% of small businesses cite limited technical expertise as main challenge"
        ],
        patterns: [
          "Technology-first approach without clear business objectives",
          "Lack of data readiness assessment before implementation",
          "Insufficient staff training and change management"
        ],
        examples: [
          "Retail business increased customer response rate by 26% after implementing limited-scope chatbot",
          "Accounting firm reduced document processing time by 63% with targeted AI implementation",
          "Service business eliminated 15 hours of weekly schedule management with focused AI tool"
        ]
      },
      draft: {
        content: `Small businesses are wasting millions on failed AI implementations. After guiding 200+ companies through this process at NexusAI, I've seen these three critical mistakes repeatedly:

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

#PracticalAI #SmallBusinessTech`,
        alternativeHooks: [
          "The 3 reasons most small business AI implementations fail (and how to make sure yours doesn't)",
          "I've watched 200+ small businesses implement AI. The successful ones avoided these 3 critical mistakes.",
          "Want AI implementation that actually delivers ROI? Avoid these 3 mistakes I've seen sink too many small businesses.",
          "Here's why your AI implementation will probably fail (and how to prevent it)",
          "Your AI implementation doesn't have a technology problem. It has these 3 execution problems."
        ],
        hashtags: ['#PracticalAI', '#SmallBusinessTech', '#AIImplementation']
      }
    }
  },
  {
    id: 'w1-wed',
    title: "The Pivot That Saved NexusAI",
    date: new Date(2025, 2, 5),
    contentPillar: "Founder's Journey",
    contentType: 'Text Post',
    brief: {
      topic: 'The pivot that saved NexusAI',
      targetAudience: 'Fellow entrepreneurs and potential investors',
      objective: 'Show adaptability and customer-centricity',
      desiredAction: 'Comments sharing similar pivot experiences',
      concept: {
        hook: "Six months into building NexusAI, we realized our initial product was completely wrong. Here's the uncomfortable customer conversation that saved us.",
        description: "Narrative of how initial assumptions were invalidated by customer feedback, and how listening led to the successful product approach used today."
      }
    }
  },
  {
    id: 'w1-thu',
    title: "5 Signs Your Business Processes Need Automation",
    date: new Date(2025, 2, 6),
    contentPillar: 'Practical AI Implementation',
    contentType: 'Carousel',
    brief: {
      topic: '5 Signs Your Business Processes Need Automation',
      targetAudience: "Business owners uncertain if they're ready for AI",
      objective: 'Help businesses self-identify as automation-ready',
      desiredAction: 'Self-assessment and comments with additional signs',
      concept: {
        hook: "Not all business processes are ready for AI. Here's how to know which ones are.",
        description: "Visual guide to help businesses identify the specific characteristics that make processes good candidates for AI automation, with examples of each sign in action."
      }
    }
  },
  {
    id: 'w1-fri',
    title: "OpenAI Announcement Analysis",
    date: new Date(2025, 2, 7),
    contentPillar: 'AI Ecosystem Trends',
    contentType: 'Industry Commentary',
    brief: {
      topic: 'Response to latest OpenAI announcement',
      targetAudience: 'Small business leaders confused by technical announcements',
      objective: 'Demonstrate thought leadership and practical interpretation',
      desiredAction: 'Shares and saves as a useful reference',
      concept: {
        hook: "OpenAI just announced [feature X]. Here's what it actually means for your small business (without the hype).",
        description: "Break down the technical announcement into practical business implications, with specific use cases relevant to small business operations."
      }
    }
  },
  // Week 2
  {
    id: 'w2-mon',
    title: "AI Augmentation vs. Replacement",
    date: new Date(2025, 2, 10),
    contentPillar: 'The Human Side of AI',
    contentType: 'Text Post',
    brief: {
      topic: 'Augmentation vs. Replacement',
      description: "Discuss how NexusAI customers are using automation to enhance their teams' capabilities rather than replace workers."
    }
  },
  {
    id: 'w2-tue',
    title: "Beyond the Hype: What's Actually Possible with AI Today",
    date: new Date(2025, 2, 11),
    contentPillar: 'AI Ecosystem Trends',
    contentType: 'LinkedIn Article',
    brief: {
      topic: "Beyond the Hype: What's Actually Possible with AI Today",
      description: "Cut through exaggerated claims with practical assessment of current AI capabilities."
    }
  }
  // Additional weeks follow same pattern...
];

const contentPillars = {
  'Practical AI Implementation': 'bg-blue-100 text-blue-700',
  'Cultural Innovation': 'bg-purple-100 text-purple-700',
  'AI Ecosystem Trends': 'bg-green-100 text-green-700',
  'The Human Side of AI': 'bg-orange-100 text-orange-700',
  'Small Business Transformation': 'bg-yellow-100 text-yellow-700',
  "Founder's Journey": 'bg-pink-100 text-pink-700'
};

const ContentCalendar: React.FC<ContentCalendarProps> = ({ onCreatePost }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [showStrategyRoom, setShowStrategyRoom] = useState(false);
  const { setSelectedPostDate } = useStudioStore();

  const backButton = (
    <Button
      variant="outline"
      size="sm"
      icon={ChevronLeft}
      onClick={() => setShowStrategyRoom(true)}
    >
      Back to Strategy
    </Button>
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getPostsForDate = (date: Date) => {
    return mockPosts.filter(post => 
      post.date.getDate() === date.getDate() &&
      post.date.getMonth() === date.getMonth() &&
      post.date.getFullYear() === date.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedPostDate(date);
    onCreatePost();
  };

  if (showStrategyRoom) {
    return <StrategyRoom onBack={() => setShowStrategyRoom(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Content Calendar" 
        subtitle="Schedule and manage your content"
        leftContent={backButton}
      />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              icon={ChevronLeft}
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            />
            <h2 className="text-lg font-medium">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <Button
              variant="outline"
              size="sm"
              icon={ChevronRight}
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            />
          </div>

          <Button
            variant="primary"
            icon={Plus}
            onClick={() => {
              setSelectedPostDate(new Date());
              onCreatePost();
            }}
          >
            Create Post
          </Button>
        </div>

        <Card>
          <div className="p-3 border-b">
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-600">Content Pillars:</span>
              <div className="flex items-center gap-4">
                {Object.entries(contentPillars).map(([pillar, classes]) => (
                  <div key={pillar} className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-xs ${classes}`}>
                      {pillar}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
            
            {getDaysInMonth(currentMonth).map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="bg-white p-2 min-h-[100px]" />;
              }

              const posts = getPostsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              const isHovered = hoveredDate?.toDateString() === date.toDateString();

              return (
                <motion.div
                  key={date.toISOString()}
                  className={`relative bg-white p-2 min-h-[100px] cursor-pointer transition-all duration-200
                    ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}
                    ${isHovered ? 'bg-gray-50' : ''}
                    hover:bg-gray-50
                  `}
                  onClick={() => handleDateClick(date)}
                  onMouseEnter={() => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${isToday ? 'font-medium text-blue-600' : ''}`}>
                      {date.getDate()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {posts.map(post => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-1.5 rounded text-xs transition-colors ${
                          contentPillars[post.contentPillar as keyof typeof contentPillars]
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="font-medium">{post.contentType}</span>
                        </div>
                        <p className="font-medium line-clamp-2">{post.title}</p>
                      </motion.div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {isHovered && posts.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Plus className="w-5 h-5 text-gray-400" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      <AssistantDock mode="calendar" />
    </div>
  );
};

export default ContentCalendar;