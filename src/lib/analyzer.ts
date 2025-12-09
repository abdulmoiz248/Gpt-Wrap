import { Conversation, WrapAnalytics } from '@/types';

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

  conversations.forEach(conv => {
    const messages = Object.values(conv.mapping).filter(node => node.message !== null);
    let convMessageCount = 0;
    
    messages.forEach(node => {
      const msg = node.message!;
      
      if (msg.author.role === 'user') {
        totalUserMessages++;
        convMessageCount++;
        
        const parts = msg.content.parts || [];
        const text = parts.join(' ');
        totalWords += text.split(/\s+/).filter(w => w.length > 0).length;
        
        text.split(/\s+/).forEach(word => {
          const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (clean.length > 4 && !['about', 'would', 'could', 'should', 'there', 'their', 'which'].includes(clean)) {
            topicWords[clean] = (topicWords[clean] || 0) + 1;
          }
        });
        
        if (msg.create_time) {
          const date = new Date(msg.create_time * 1000);
          
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
    
    if (convMessageCount > longestConv.messageCount) {
      longestConv = { title: conv.title, messageCount: convMessageCount };
    }
    
    if (conv.create_time) {
      topConvs.push({
        title: conv.title,
        date: new Date(conv.create_time * 1000).toLocaleDateString()
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
    topConversations: topConvs.slice(0, 5)
  };
};
