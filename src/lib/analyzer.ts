import { Conversation, WrapAnalytics } from '@/types';

const calculateStreak = (dates: Date[]): { days: number; startDate: string; endDate: string } => {
  if (dates.length === 0) return { days: 0, startDate: '', endDate: '' };
  
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  const uniqueDays = Array.from(new Set(sortedDates.map(d => d.toDateString())));
  
  let maxStreak = 1;
  let currentStreak = 1;
  let maxStart = 0;
  let maxEnd = 0;
  let currentStart = 0;
  
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]);
    const curr = new Date(uniqueDays[i]);
    const diffDays = Math.floor((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
        maxStart = currentStart;
        maxEnd = i;
      }
    } else {
      currentStreak = 1;
      currentStart = i;
    }
  }
  
  return {
    days: maxStreak,
    startDate: uniqueDays[maxStart],
    endDate: uniqueDays[maxEnd] || uniqueDays[maxStart]
  };
};

const determinePersonalityType = (analytics: any): string => {
  const { nightOwlScore, totalUserMessages, questionToStatementRatio, topTopics, codeBlockCount, avgSessionLength, conversationDepth, weekendVsWeekday } = analytics;
  
  const topWords = topTopics.slice(0, 15).map((t: any) => t.topic);
  const codeWords = ['code', 'debug', 'error', 'function', 'typescript', 'javascript', 'python', 'react', 'component', 'syntax'];
  const designWords = ['design', 'color', 'layout', 'style', 'interface', 'creative', 'visual'];
  const dataWords = ['data', 'analysis', 'chart', 'graph', 'database', 'query', 'model'];
  const writingWords = ['write', 'content', 'article', 'story', 'blog', 'copy', 'draft'];
  const businessWords = ['business', 'strategy', 'marketing', 'sales', 'growth', 'revenue'];
  const learningWords = ['learn', 'tutorial', 'understand', 'explain', 'teach', 'guide'];
  
  const codeScore = topWords.filter((w: string) => codeWords.includes(w)).length;
  const designScore = topWords.filter((w: string) => designWords.includes(w)).length;
  const dataScore = topWords.filter((w: string) => dataWords.includes(w)).length;
  const writingScore = topWords.filter((w: string) => writingWords.includes(w)).length;
  const businessScore = topWords.filter((w: string) => businessWords.includes(w)).length;
  const learningScore = topWords.filter((w: string) => learningWords.includes(w)).length;
  
  // Night owl behavior
  if (nightOwlScore > totalUserMessages * 0.4) return "Midnight Maverick";
  if (nightOwlScore > totalUserMessages * 0.25) return "Night Owl Thinker";
  
  // Weekend warrior
  if (weekendVsWeekday && weekendVsWeekday.weekend > weekendVsWeekday.weekday * 0.6) return "Weekend Warrior";
  
  // Code-focused
  if (codeBlockCount > totalUserMessages * 0.5 && codeScore >= 3) return "Code Ninja";
  if (codeScore >= 4 || (codeBlockCount > totalUserMessages * 0.3)) return "Code Warrior";
  if (codeScore >= 2 && dataScore >= 2) return "Tech Architect";
  
  // Data & Analytics
  if (dataScore >= 3) return "Data Whisperer";
  
  // Creative & Design
  if (designScore >= 3) return "Creative Visionary";
  if (writingScore >= 3) return "Content Craftsman";
  
  // Business focused
  if (businessScore >= 3) return "Strategic Thinker";
  
  // Question/Learning patterns
  if (questionToStatementRatio > 0.75) return "Curious Explorer";
  if (questionToStatementRatio > 0.6 && learningScore >= 2) return "Knowledge Seeker";
  if (learningScore >= 3) return "Lifelong Learner";
  
  // Session patterns
  if (avgSessionLength > 5) return "Deep Diver";
  if (avgSessionLength > 3 && conversationDepth > 20) return "Marathon Thinker";
  
  // Volume-based
  if (totalUserMessages > 2000) return "Power User";
  if (totalUserMessages > 1000) return "Dedicated Collaborator";
  if (totalUserMessages > 500 && conversationDepth > 15) return "Engaged Partner";
  
  // Balanced approach
  if (conversationDepth > 25) return "Thorough Analyst";
  if (questionToStatementRatio > 0.4 && questionToStatementRatio < 0.6) return "Balanced Thinker";
  
  return "Thoughtful Learner";
};

const determineDominantTheme = (topTopics: Array<{ topic: string; count: number }>): string => {
  const techWords = ['code', 'api', 'function', 'error', 'debug', 'typescript', 'javascript', 'python', 'react', 'component', 'syntax', 'backend', 'frontend', 'server'];
  const creativeWords = ['design', 'create', 'idea', 'story', 'write', 'content', 'creative', 'visual', 'artistic', 'inspiration'];
  const learningWords = ['learn', 'understand', 'explain', 'help', 'tutorial', 'guide', 'study', 'research', 'knowledge'];
  const dataWords = ['data', 'analysis', 'analytics', 'chart', 'visualization', 'statistics', 'metrics', 'insights', 'database', 'query'];
  const businessWords = ['business', 'strategy', 'marketing', 'sales', 'revenue', 'growth', 'customer', 'product', 'market'];
  const aiWords = ['model', 'training', 'machine', 'neural', 'chatgpt', 'openai', 'prompt', 'generation', 'intelligence'];
  const webWords = ['website', 'nextjs', 'tailwind', 'responsive', 'deploy', 'vercel', 'hosting', 'domain'];
  const mobileWords = ['mobile', 'android', 'ios', 'flutter', 'native', 'app'];
  const devopsWords = ['docker', 'kubernetes', 'deploy', 'cicd', 'pipeline', 'cloud', 'aws', 'azure'];
  const securityWords = ['security', 'authentication', 'encryption', 'vulnerability', 'token', 'auth'];
  const mathWords = ['algorithm', 'optimization', 'complexity', 'performance', 'efficiency', 'computation'];
  const writingWords = ['article', 'blog', 'writing', 'copy', 'content', 'documentation', 'readme'];
  
  const topWords = topTopics.slice(0, 15).map(t => t.topic);
  const topCounts = topTopics.slice(0, 15).reduce((sum, t) => sum + t.count, 0);
  
  const calculateScore = (words: string[]) => {
    const matches = topTopics.filter(t => words.includes(t.topic)).slice(0, 15);
    const count = matches.reduce((sum, t) => sum + t.count, 0);
    return topCounts > 0 ? (count / topCounts) * matches.length : 0;
  };
  
  const scores = {
    tech: calculateScore(techWords),
    creative: calculateScore(creativeWords),
    learning: calculateScore(learningWords),
    data: calculateScore(dataWords),
    business: calculateScore(businessWords),
    ai: calculateScore(aiWords),
    web: calculateScore(webWords),
    mobile: calculateScore(mobileWords),
    devops: calculateScore(devopsWords),
    security: calculateScore(securityWords),
    math: calculateScore(mathWords),
    writing: calculateScore(writingWords)
  };
  
  const maxScore = Math.max(...Object.values(scores));
  
  if (scores.ai === maxScore && scores.ai > 0) return "AI & Machine Learning";
  if (scores.data === maxScore && scores.data > 0) return "Data Science & Analytics";
  if (scores.web === maxScore && scores.web > 0) return "Web Development";
  if (scores.mobile === maxScore && scores.mobile > 0) return "Mobile Development";
  if (scores.devops === maxScore && scores.devops > 0) return "DevOps & Infrastructure";
  if (scores.security === maxScore && scores.security > 0) return "Security & Authentication";
  if (scores.tech === maxScore && scores.tech > 0) return "Technical Development";
  if (scores.business === maxScore && scores.business > 0) return "Business & Strategy";
  if (scores.creative === maxScore && scores.creative > 0) return "Creative Projects";
  if (scores.writing === maxScore && scores.writing > 0) return "Content & Writing";
  if (scores.math === maxScore && scores.math > 0) return "Algorithms & Optimization";
  if (scores.learning === maxScore && scores.learning > 0) return "Knowledge & Learning";
  
  return "General Exploration";
};

export const analyzeConversations = (conversations: Conversation[]): WrapAnalytics => {
  let totalUserMessages = 0;
  let totalAssistantMessages = 0;
  let totalWords = 0;
  let firstMessageDate: Date | null = null;
  let lastMessageDate: Date | null = null;
  let nightOwlCount = 0;
  
  const monthCounts: Record<string, number> = {};
  const dayCounts: Record<string, number> = {};
  const hourCounts: number[] = new Array(24).fill(0);
  const modelUsage: Record<string, number> = {};
  const topicWords: Record<string, number> = {};
  
  let longestConv = { title: '', messageCount: 0 };
  const topConvs: Array<{ title: string; date: string }> = [];
  
  // Advanced analytics
  const allDates: Date[] = [];
  const weekCounts: Record<string, number> = {};
  let weekendCount = 0;
  let weekdayCount = 0;
  let totalSessionTime = 0;
  let questionCount = 0;
  let statementCount = 0;
  let codeBlockCount = 0;
  const emojiCounts: Record<string, number> = {};
  let multiDayConvCount = 0;
  const conversationLifespans: number[] = [];

  conversations.forEach(conv => {
    const messages = Object.values(conv.mapping).filter(node => node.message !== null);
    let convMessageCount = 0;
    let convFirstTime: number | null = null;
    let convLastTime: number | null = null;
    
    messages.forEach(node => {
      const msg = node.message!;
      
      if (msg.author.role === 'user') {
        totalUserMessages++;
        convMessageCount++;
        
        const parts = msg.content.parts || [];
        const text = parts.join(' ');
        totalWords += text.split(/\s+/).filter(w => w.length > 0).length;
        
        // Count questions vs statements
        if (text.includes('?')) questionCount++;
        else statementCount++;
        
        // Extract emojis (excluding numbers and basic punctuation)
        const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        const emojis = text.match(emojiRegex);
        if (emojis) {
          emojis.forEach(emoji => {
            // Filter out digits and basic ASCII
            if (emoji.length > 1 || emoji.charCodeAt(0) > 127) {
              emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1;
            }
          });
        }
        
        // Count code blocks
        if (text.includes('```') || text.includes('`')) {
          codeBlockCount++;
        }
        
        text.split(/\s+/).forEach(word => {
          const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
          const codeKeywords = ['const', 'import', 'export', 'return', 'function', 'async', 'await', 'class', 'interface', 'string', 'number', 'boolean', 'object', 'array', 'undefined', 'typeof', 'instanceof', 'error', 'console', 'require', 'module', 'component', 'props', 'state', 'render', 'useState', 'useEffect', 'about', 'would', 'could', 'should', 'there', 'their', 'which', 'these', 'those', 'where', 'while', 'false', 'value', 'change', 'added', 'using'];
          if (clean.length > 4 && !codeKeywords.includes(clean) && !/^\d+$/.test(clean)) {
            topicWords[clean] = (topicWords[clean] || 0) + 1;
          }
        });
        
        if (msg.create_time) {
          const date = new Date(msg.create_time * 1000);
          allDates.push(date);
          
          if (!convFirstTime) convFirstTime = msg.create_time;
          convLastTime = msg.create_time;
          
          if (!firstMessageDate || date < firstMessageDate) {
            firstMessageDate = date;
          }
          if (!lastMessageDate || date > lastMessageDate) {
            lastMessageDate = date;
          }
          
          const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
          monthCounts[month] = (monthCounts[month] || 0) + 1;
          
          const day = date.toLocaleString('en-US', { weekday: 'long' });
          dayCounts[day] = (dayCounts[day] || 0) + 1;
          
          // Week tracking
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          const weekKey = weekStart.toISOString().split('T')[0];
          weekCounts[weekKey] = (weekCounts[weekKey] || 0) + 1;
          
          // Weekend vs Weekday
          const dayOfWeek = date.getDay();
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekendCount++;
          } else {
            weekdayCount++;
          }
          
          const hour = date.getHours();
          hourCounts[hour]++;
          
          if (hour >= 0 && hour < 6) {
            nightOwlCount++;
          }
        }
      }
      
      if (msg.author.role === 'assistant') {
        totalAssistantMessages++;
        
        const modelSlug = msg.metadata?.model_slug || 'unknown';
        modelUsage[modelSlug] = (modelUsage[modelSlug] || 0) + 1;
      }
    });
    
    // Calculate conversation lifespan
    if (convFirstTime && convLastTime) {
      const lifespan = (convLastTime - convFirstTime) / 3600; // hours
      conversationLifespans.push(lifespan);
      if (lifespan > 24) multiDayConvCount++;
      totalSessionTime += lifespan;
    }
    
    if (convMessageCount > longestConv.messageCount) {
      longestConv = { title: conv.title, messageCount: convMessageCount };
    }
    
    if (conv.create_time) {
      topConvs.push({
        title: conv.title,
        date: new Date(conv.create_time * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
  });

  const mostActiveMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const mostActiveDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const mostActiveHour = hourCounts.indexOf(Math.max(...hourCounts));
  
  const topTopics = Object.entries(topicWords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([topic, count]) => ({ topic, count }));

  const monthlyActivity = Object.entries(monthCounts)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([month, count]) => ({ month, count }));

  const avgResponseLength = totalAssistantMessages > 0 
    ? Math.round(totalWords / totalAssistantMessages) 
    : 0;
    
  // Advanced calculations
  const longestStreak = calculateStreak(allDates);
  const busiestWeek = Object.entries(weekCounts).sort((a, b) => b[1] - a[1])[0];
  const avgSessionLength = conversationLifespans.length > 0 
    ? conversationLifespans.reduce((a, b) => a + b, 0) / conversationLifespans.length 
    : 0;
    
  const questionToStatementRatio = statementCount > 0 
    ? questionCount / (questionCount + statementCount) 
    : 0;
    
  const topEmojis = Object.entries(emojiCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([emoji, count]) => ({ emoji, count }));
    
  const mostProductiveHours = hourCounts
    .map((count, hour) => ({ hour, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(h => h.hour);
    
  const avgConversationLifespan = avgSessionLength;
  
  // Productivity score (0-100)
  const productivityScore = Math.min(100, Math.round(
    (totalUserMessages / 10) + 
    (longestStreak.days * 2) + 
    (codeBlockCount / 5) + 
    (conversations.length / 5)
  ));
  
  // Conversation depth (avg messages per conversation)
  const conversationDepth = conversations.length > 0 
    ? Math.round((totalUserMessages + totalAssistantMessages) / conversations.length) 
    : 0;
    
  const messagingPace = totalUserMessages / Math.max(1, longestStreak.days);
  
  const tempAnalytics = {
    totalUserMessages,
    nightOwlScore: nightOwlCount,
    questionToStatementRatio,
    topTopics,
    codeBlockCount,
    avgSessionLength,
    conversationDepth,
    weekendVsWeekday: { weekend: weekendCount, weekday: weekdayCount }
  };
  
  const personalityType = determinePersonalityType(tempAnalytics);
  const dominantTheme = determineDominantTheme(topTopics);
  
  const responseTimePattern = mostActiveHour >= 9 && mostActiveHour <= 17 
    ? "9-to-5 Grinder" 
    : mostActiveHour >= 22 || mostActiveHour <= 2 
    ? "Midnight Warrior" 
    : "Flexible Thinker";

  return {
    totalConversations: conversations.length,
    totalUserMessages,
    totalAssistantMessages,
    totalWords,
    firstMessageDate,
    lastMessageDate,
    mostActiveMonth,
    mostActiveDay,
    mostActiveHour,
    longestConversation: longestConv,
    nightOwlScore: nightOwlCount,
    topTopics,
    modelUsage,
    monthlyActivity,
    hourlyActivity: hourCounts,
    avgResponseLength,
    topConversations: topConvs.slice(0, 5),
    
    // Advanced metrics
    longestStreak,
    averageSessionLength: Math.round(avgSessionLength * 10) / 10,
    totalTimeSpent: Math.round(totalSessionTime),
    busiestWeek: busiestWeek ? { week: busiestWeek[0], count: busiestWeek[1] } : { week: 'N/A', count: 0 },
    messagingPace: Math.round(messagingPace * 10) / 10,
    weekendVsWeekday: { weekend: weekendCount, weekday: weekdayCount },
    productivityScore,
    conversationDepth,
    topEmojis,
    questionToStatementRatio: Math.round(questionToStatementRatio * 100),
    codeBlockCount,
    mostProductiveHours,
    avgConversationLifespan: Math.round(avgConversationLifespan * 10) / 10,
    multiDayConversations: multiDayConvCount,
    personalityType,
    dominantTheme,
    responseTimePattern
  };
};
