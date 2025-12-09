export interface ChatGPTMessage {
  id: string;
  author: {
    role: 'user' | 'assistant' | 'system';
    name: string | null;
    metadata: Record<string, any>;
  };
  create_time: number | null;
  update_time: number | null;
  content: {
    content_type: string;
    parts: string[];
  };
  status: string;
  end_turn: boolean | null;
  weight: number;
  metadata: Record<string, any>;
  recipient: string;
  channel: string | null;
}

export interface MappingNode {
  id: string;
  message: ChatGPTMessage | null;
  parent: string | null;
  children: string[];
}

export interface Conversation {
  title: string;
  create_time: number;
  update_time: number;
  mapping: Record<string, MappingNode>;
  moderation_results: any[];
  current_node: string;
  plugin_ids: string[] | null;
  conversation_id: string;
  conversation_template_id: string | null;
  gizmo_id: string | null;
  is_archived: boolean;
  safe_urls: string[];
  default_model_slug: string;
  conversation_origin: string | null;
  voice: string | null;
}

export interface WrapAnalytics {
  totalConversations: number;
  totalUserMessages: number;
  totalAssistantMessages: number;
  totalWords: number;
  firstMessageDate: Date | null;
  lastMessageDate: Date | null;
  mostActiveMonth: string;
  mostActiveDay: string;
  mostActiveHour: number;
  longestConversation: {
    title: string;
    messageCount: number;
  };
  nightOwlScore: number;
  topTopics: Array<{ topic: string; count: number }>;
  modelUsage: Record<string, number>;
  monthlyActivity: Array<{ month: string; count: number }>;
  hourlyActivity: number[];
  avgResponseLength: number;
  topConversations: Array<{ title: string; date: string }>;
  
  // Advanced metrics
  longestStreak: { days: number; startDate: string; endDate: string };
  averageSessionLength: number;
  totalTimeSpent: number;
  busiestWeek: { week: string; count: number };
  messagingPace: number;
  weekendVsWeekday: { weekend: number; weekday: number };
  productivityScore: number;
  conversationDepth: number;
  topEmojis: Array<{ emoji: string; count: number }>;
  questionToStatementRatio: number;
  codeBlockCount: number;
  mostProductiveHours: number[];
  avgConversationLifespan: number;
  multiDayConversations: number;
  personalityType: string;
  dominantTheme: string;
  responseTimePattern: string;
}
