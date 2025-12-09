'use client';

import { useState } from 'react';
import { WrapAnalytics } from '@/types';

interface WrapDisplayProps {
  analytics: WrapAnalytics;
  onReset: () => void;
}

export default function WrapDisplay({ analytics, onReset }: WrapDisplayProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '2025',
      subtitle: 'Your ChatGPT Year in Review',
      content: (
        <div className="text-white/80">
          <p className="text-xl">Ready to see your stats?</p>
          <p className="mt-2 text-sm text-purple-300">Spoiler: They&apos;re insane 🔥</p>
        </div>
      )
    },
    {
      title: `${analytics.totalConversations.toLocaleString()}`,
      subtitle: 'Total Conversations',
      content: (
        <div className="text-white/70">
          <p>You had {analytics.totalConversations} unique conversations with ChatGPT this year</p>
          <p className="mt-4 text-purple-300">That&apos;s {Math.round(analytics.totalConversations / 12)} per month!</p>
        </div>
      )
    },
    {
      title: analytics.personalityType,
      subtitle: 'Your ChatGPT Personality',
      content: (
        <div className="text-white/70 space-y-2">
          <p className="text-lg">Based on your usage patterns, you&apos;re a:</p>
          <p className="text-3xl font-bold text-purple-300">{analytics.personalityType}</p>
          <p className="mt-4 text-sm">Dominant theme: {analytics.dominantTheme}</p>
        </div>
      )
    },
    {
      title: `${analytics.longestStreak.days} Days`,
      subtitle: '🔥 Longest Streak',
      content: (
        <div className="text-white/70 space-y-2">
          <p className="text-xl">You used ChatGPT for {analytics.longestStreak.days} days straight!</p>
          {analytics.longestStreak.days > 0 && (
            <>
              <p className="text-sm text-purple-300">From {new Date(analytics.longestStreak.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-sm text-purple-300">To {new Date(analytics.longestStreak.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              <p className="mt-4">{analytics.longestStreak.days > 30 ? "Absolutely unstoppable 🚀" : "That's commitment!"}</p>
            </>
          )}
        </div>
      )
    },

    {
      title: `${analytics.totalUserMessages.toLocaleString()}`,
      subtitle: 'Messages Sent',
      content: (
        <div className="text-white/70">
          <p>That&apos;s a lot of questions!</p>
          <p className="mt-2">ChatGPT replied {analytics.totalAssistantMessages.toLocaleString()} times</p>
          <p className="mt-4 text-purple-300">{analytics.messagingPace.toFixed(1)} messages per day</p>
        </div>
      )
    },

    {
      title: `${analytics.conversationDepth}`,
      subtitle: 'Avg Messages Per Conversation',
      content: (
        <div className="text-white/70">
          <p>You average {analytics.conversationDepth} messages per conversation</p>
          <p className="mt-4 text-purple-300">
            {analytics.conversationDepth > 20 ? "You dive deep! 🌊" : 
             analytics.conversationDepth > 10 ? "Thoughtful discussions 💭" : 
             "Quick and efficient ⚡"}
          </p>
        </div>
      )
    },
    {
      title: analytics.mostActiveDay,
      subtitle: 'Peak Usage Day',
      content: (
        <div className="text-white/70">
          <p>{analytics.mostActiveDay}s hit different</p>
          <p className="mt-4 text-sm">Weekend: {analytics.weekendVsWeekday.weekend} msgs</p>
          <p className="text-sm">Weekday: {analytics.weekendVsWeekday.weekday} msgs</p>
          <p className="mt-4 text-purple-300">
            {analytics.weekendVsWeekday.weekend > analytics.weekendVsWeekday.weekday 
              ? "Weekend warrior 🎮" 
              : "Weekday grinder 💼"}
          </p>
        </div>
      )
    },
    {
      title: analytics.responseTimePattern,
      subtitle: 'Your Working Style',
      content: (
        <div className="text-white/70">
          <p className="text-lg mb-4">Most active at {analytics.mostActiveHour}:00</p>
          <p>Top 3 productive hours:</p>
          <div className="flex gap-3 justify-center mt-3">
            {analytics.mostProductiveHours.map(h => (
              <span key={h} className="text-2xl font-bold text-purple-400">{h}:00</span>
            ))}
          </div>
          <p className="mt-4 text-sm text-purple-300">
            {analytics.nightOwlScore > 100 ? '🦉 Night owl detected' : '☀️ Day time warrior'}
          </p>
        </div>
      )
    },
    {
      title: `${analytics.questionToStatementRatio}%`,
      subtitle: 'Question Rate',
      content: (
        <div className="text-white/70">
          <p>{analytics.questionToStatementRatio}% of your messages were questions</p>
          <p className="mt-4 text-purple-300">
            {analytics.questionToStatementRatio > 70 ? "Eternally curious 🤔" : 
             analytics.questionToStatementRatio > 40 ? "Balanced learner 📖" : 
             "Statement maker 💬"}
          </p>
        </div>
      )
    },
    {
      title: `${analytics.codeBlockCount.toLocaleString()}`,
      subtitle: 'Code Blocks Shared',
      content: (
        <div className="text-white/70">
          <p>You shared code {analytics.codeBlockCount} times</p>
          <p className="mt-4 text-purple-300">
            {analytics.codeBlockCount > 500 ? "Absolute dev legend 👨‍💻" : 
             analytics.codeBlockCount > 100 ? "Code enthusiast 🚀" : 
             analytics.codeBlockCount > 0 ? "Dabbling in code 💻" : 
             "Non-technical explorer 🌟"}
          </p>
        </div>
      )
    },
    {
      title: `${analytics.multiDayConversations}`,
      subtitle: 'Multi-Day Conversations',
      content: (
        <div className="text-white/70">
          <p>You had {analytics.multiDayConversations} conversations that spanned multiple days</p>
          <p className="mt-4 text-sm">Avg conversation length: {analytics.avgConversationLifespan.toFixed(1)} hours</p>
          <p className="mt-4 text-purple-300">
            {analytics.multiDayConversations > 50 ? "Epic project builder 🏗️" : "Focused sessions 🎯"}
          </p>
        </div>
      )
    },
    {
      title: analytics.longestConversation.title.slice(0, 40) + (analytics.longestConversation.title.length > 40 ? '...' : ''),
      subtitle: 'Your Longest Conversation',
      content: (
        <div className="text-white/70">
          <p>{analytics.longestConversation.messageCount} messages back and forth</p>
          <p className="mt-4 text-purple-300">That&apos;s dedication 🎖️</p>
        </div>
      )
    },
    {
      title: 'Top Topics',
      subtitle: 'What you talked about most',
      content: (
        <div className="text-white/70 space-y-2">
          {analytics.topTopics.slice(0, 5).map((topic, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-lg">#{i + 1} {topic.topic}</span>
              <span className="text-purple-400">{topic.count}x</span>
            </div>
          ))}
        </div>
      )
    },
    ...(analytics.topEmojis.length > 0 ? [{
      title: analytics.topEmojis[0].emoji,
      subtitle: 'Your Top Emoji',
      content: (
        <div className="text-white/70 space-y-3">
          <p>You used emojis {analytics.topEmojis.reduce((a, b) => a + b.count, 0)} times</p>
          <div className="space-y-2 mt-4">
            {analytics.topEmojis.slice(0, 5).map((emoji, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-3xl">{emoji.emoji}</span>
                <span className="text-purple-400">{emoji.count}x</span>
              </div>
            ))}
          </div>
        </div>
      )
    }] : []),
    {
      title: 'Models Used',
      subtitle: 'Your AI companions',
      content: (
        <div className="text-white/70 space-y-2">
          {Object.entries(analytics.modelUsage).slice(0, 5).map(([model, count]) => (
            <div key={model} className="flex justify-between items-center">
              <span className="text-lg">{model}</span>
              <span className="text-purple-400">{count} times</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: '2025 Was Your Year',
      subtitle: 'Thanks for using ChatGPT',
      content: (
        <div className="text-white/70 space-y-4">
          <p className="text-lg">From {analytics.firstMessageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} to {analytics.lastMessageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
            <p>✨ {analytics.totalUserMessages.toLocaleString()} messages sent</p>
            <p>💬 {analytics.totalConversations} conversations</p>
            <p>🔥 {analytics.longestStreak.days} day streak</p>
            <p>🎯 {analytics.personalityType}</p>
          </div>
          <div className="flex gap-3 mt-6 justify-center">
            <button
              onClick={async () => {
                try {
                  const html2canvas = (await import('html2canvas')).default;
                  const card = document.getElementById('share-card-hidden');
                  if (!card) return;
                  
                  // Clone the card to avoid modifying the original
                  const clone = card.cloneNode(true) as HTMLElement;
                  clone.style.display = 'block';
                  clone.style.position = 'fixed';
                  clone.style.left = '0';
                  clone.style.top = '0';
                  clone.style.zIndex = '-1';
                  document.body.appendChild(clone);
                  
                  // Wait for fonts and styles to load
                  await new Promise(resolve => setTimeout(resolve, 100));
                  
                  const canvas = await html2canvas(clone, {
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                  });
                  
                  document.body.removeChild(clone);
                  
                  const link = document.createElement('a');
                  link.download = `gpt-rewind-2025.png`;
                  link.href = canvas.toDataURL('image/png');
                  link.click();
                } catch (error) {
                  console.error('Failed to generate image:', error);
                }
              }}
              className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:from-purple-500 hover:to-pink-500 transition"
            >
              📸 Download Wrap
            </button>
            <button
              onClick={onReset}
              className="bg-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition border border-white/20"
            >
              Start Over
            </button>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-black to-black p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-linear-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/10 min-h-[500px] flex flex-col justify-between">
          <div className="text-center space-y-6">
            <h2 className="text-7xl font-bold text-white mb-4 animate-fade-in">
              {slide.title}
            </h2>
            <p className="text-2xl text-purple-300 font-semibold">
              {slide.subtitle}
            </p>
            <div className="mt-8">
              {slide.content}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-white w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="text-center mt-4 text-white/40 text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>

    {/* Hidden share card for download */}
    <div id="share-card-hidden" style={{ display: 'none', position: 'absolute', left: '-9999px', top: '0' }}>
      <div 
        style={{ width: '1200px', minHeight: '1600px', background: 'linear-gradient(to bottom right, #581c87, #000000, #000000)', padding: '48px', borderRadius: '24px', border: '1px solid rgba(168, 85, 247, 0.3)' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: 'white' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ fontSize: '72px', fontWeight: 'bold', background: 'linear-gradient(to right, #c084fc, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              GPT Rewind 2025
            </h1>
            <p style={{ fontSize: '24px', color: '#d8b4fe', margin: 0 }}>My ChatGPT Year Wrapped</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '48px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#c084fc' }}>{analytics.totalConversations.toLocaleString()}</div>
              <div style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Conversations</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#f9a8d4' }}>{analytics.totalUserMessages.toLocaleString()}</div>
              <div style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Messages Sent</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#c084fc' }}>{analytics.longestStreak.days} 🔥</div>
              <div style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Day Streak</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#f9a8d4' }}>{analytics.conversationDepth}</div>
              <div style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Avg Depth</div>
            </div>
          </div>

          <div style={{ background: 'rgba(147, 51, 234, 0.2)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '32px' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.7)' }}>I&apos;m a</div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>{analytics.personalityType}</div>
              <div style={{ fontSize: '20px', color: '#d8b4fe', marginTop: '16px' }}>{analytics.dominantTheme}</div>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Top Topics</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {analytics.topTopics.slice(0, 5).map((topic, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}>#{i + 1} {topic.topic}</span>
                  <span style={{ color: '#c084fc', fontWeight: '600' }}>{topic.count}x</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#c084fc' }}>{analytics.mostActiveDay}</div>
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Peak Day</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f9a8d4' }}>{analytics.mostActiveHour}:00</div>
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Power Hour</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#c084fc' }}>{analytics.questionToStatementRatio}%</div>
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Questions</div>
            </div>
          </div>

          {analytics.codeBlockCount > 0 && (
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#c084fc' }}>{analytics.codeBlockCount.toLocaleString()}</div>
                <div style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Code Blocks Shared 💻</div>
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
              {analytics.firstMessageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {analytics.lastMessageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div style={{ color: '#d8b4fe', fontSize: '18px', fontWeight: '600' }}>
              {analytics.responseTimePattern}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
