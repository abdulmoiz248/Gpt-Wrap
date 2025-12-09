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
        <div className="text-white/80 space-y-2 sm:space-y-3">
          <p className="text-base sm:text-lg">Ready to see your stats?</p>
          <p className="text-sm sm:text-base text-purple-300">Spoiler: They&apos;re insane 🔥</p>
          <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-1.5 text-xs sm:text-sm">
            <p>📊 {analytics.totalConversations.toLocaleString()} conversations analyzed</p>
            <p>💬 {analytics.totalUserMessages.toLocaleString()} messages sent</p>
            <p>🎯 Your personality type revealed</p>
            <p>🔥 Streak records discovered</p>
          </div>
          <p className="text-xs text-purple-400 mt-3 sm:mt-4">Swipe to explore your year →</p>
        </div>
      )
    },
    {
      title: `${analytics.totalConversations.toLocaleString()}`,
      subtitle: 'Total Conversations',
      content: (
        <div className="text-white/70 text-sm sm:text-base">
          <p>You had {analytics.totalConversations} unique conversations with ChatGPT this year</p>
          <p className="mt-3 sm:mt-4 text-purple-300">That&apos;s {Math.round(analytics.totalConversations / 12)} per month!</p>
        </div>
      )
    },
    {
      title: analytics.personalityType,
      subtitle: 'Your ChatGPT Personality',
      content: (
        <div className="text-white/70 space-y-1 sm:space-y-1.5">
          <p className="text-sm sm:text-base">Based on your usage patterns, you&apos;re a:</p>
          <p className="text-2xl sm:text-3xl font-bold text-purple-300">{analytics.personalityType}</p>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm">Dominant theme: {analytics.dominantTheme}</p>
        </div>
      )
    },
    {
      title: `${analytics.longestStreak.days} Days`,
      subtitle: '🔥 Longest Streak',
      content: (
        <div className="text-white/70 space-y-1 sm:space-y-1.5 text-sm sm:text-base">
          <p>You used ChatGPT for {analytics.longestStreak.days} days straight!</p>
          {analytics.longestStreak.days > 0 && (
            <>
              <p className="text-xs sm:text-sm text-purple-300">From {new Date(analytics.longestStreak.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-xs sm:text-sm text-purple-300">To {new Date(analytics.longestStreak.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base">{analytics.longestStreak.days > 30 ? "Absolutely unstoppable 🚀" : "That's commitment!"}</p>
            </>
          )}
        </div>
      )
    },

    {
      title: `${analytics.totalUserMessages.toLocaleString()}`,
      subtitle: 'Messages Sent',
      content: (
        <div className="text-white/70 text-sm sm:text-base">
          <p>That&apos;s a lot of questions!</p>
          <p className="mt-1 sm:mt-1.5">ChatGPT replied {analytics.totalAssistantMessages.toLocaleString()} times</p>
          <p className="mt-2 sm:mt-3 text-purple-300">{analytics.messagingPace.toFixed(1)} messages per day</p>
        </div>
      )
    },

    {
      title: `${analytics.conversationDepth}`,
      subtitle: 'Avg Messages Per Conversation',
      content: (
        <div className="text-white/70 text-sm sm:text-base">
          <p>You average {analytics.conversationDepth} messages per conversation</p>
          <p className="mt-2 sm:mt-3 text-purple-300">
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
        <div className="text-white/70 text-sm sm:text-base">
          <p>{analytics.mostActiveDay}s hit different</p>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm">Weekend: {analytics.weekendVsWeekday.weekend} msgs</p>
          <p className="text-xs sm:text-sm">Weekday: {analytics.weekendVsWeekday.weekday} msgs</p>
          <p className="mt-2 sm:mt-3 text-purple-300">
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
          <p className="text-sm sm:text-base mb-2 sm:mb-3">Most active at {analytics.mostActiveHour}:00</p>
          <p className="text-xs sm:text-sm">Top 3 productive hours:</p>
          <div className="flex gap-2 sm:gap-3 justify-center mt-1.5 sm:mt-2">
            {analytics.mostProductiveHours.map(h => (
              <span key={h} className="text-xl sm:text-2xl font-bold text-purple-400">{h}:00</span>
            ))}
          </div>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-purple-300">
            {analytics.nightOwlScore > 100 ? '🦉 Night owl detected' : '☀️ Day time warrior'}
          </p>
        </div>
      )
    },
    {
      title: `${analytics.questionToStatementRatio}%`,
      subtitle: 'Question Rate',
      content: (
        <div className="text-white/70 text-sm sm:text-base">
          <p>{analytics.questionToStatementRatio}% of your messages were questions</p>
          <p className="mt-2 sm:mt-3 text-purple-300">
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
        <div className="text-white/70 text-sm sm:text-base">
          <p>You shared code {analytics.codeBlockCount} times</p>
          <p className="mt-2 sm:mt-3 text-purple-300">
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
        <div className="text-white/70 text-sm sm:text-base">
          <p>You had {analytics.multiDayConversations} conversations that spanned multiple days</p>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm">Avg conversation length: {analytics.avgConversationLifespan.toFixed(1)} hours</p>
          <p className="mt-2 sm:mt-3 text-purple-300">
            {analytics.multiDayConversations > 50 ? "Epic project builder 🏗️" : "Focused sessions 🎯"}
          </p>
        </div>
      )
    },
    {
      title: analytics.longestConversation.title.slice(0, 40) + (analytics.longestConversation.title.length > 40 ? '...' : ''),
      subtitle: 'Your Longest Conversation',
      content: (
        <div className="text-white/70 text-sm sm:text-base">
          <p>{analytics.longestConversation.messageCount} messages back and forth</p>
          <p className="mt-2 sm:mt-3 text-purple-300">That&apos;s dedication 🎖️</p>
        </div>
      )
    },
    {
      title: 'Top Topics',
      subtitle: 'What you talked about most',
      content: (
        <div className="text-white/70 space-y-1 sm:space-y-1.5">
          {analytics.topTopics.slice(0, 5).map((topic, i) => (
            <div key={i} className="flex justify-between items-center text-sm sm:text-base">
              <span className="truncate mr-2">#{i + 1} {topic.topic}</span>
              <span className="text-purple-400 shrink-0">{topic.count}x</span>
            </div>
          ))}
        </div>
      )
    },
    ...(analytics.topEmojis.length > 0 ? [{
      title: analytics.topEmojis[0].emoji,
      subtitle: 'Top Chat Emojis',
      content: (
        <div className="text-white/70 space-y-1.5 sm:space-y-2">
          <p className="text-sm sm:text-base">You used emojis {analytics.topEmojis.reduce((a, b) => a + b.count, 0)} times</p>
          <div className="space-y-1 sm:space-y-1.5 mt-2 sm:mt-3">
            {analytics.topEmojis.slice(0, 5).map((emoji, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-2xl sm:text-3xl">{emoji.emoji}</span>
                <span className="text-purple-400 text-sm sm:text-base">{emoji.count}x</span>
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
        <div className="text-white/70 space-y-1 sm:space-y-1.5">
          {Object.entries(analytics.modelUsage).slice(0, 5).map(([model, count]) => (
            <div key={model} className="flex justify-between items-center text-sm sm:text-base">
              <span className="truncate mr-2">{model}</span>
              <span className="text-purple-400 shrink-0 text-xs sm:text-sm">{count} times</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: '2025 Was Your Year',
      subtitle: 'Year of Prompting!',
      content: (
        <div className="text-white/70 space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm md:text-base">From {analytics.firstMessageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} to {analytics.lastMessageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          <div className="bg-white/5 rounded-lg p-2.5 sm:p-3 space-y-1 sm:space-y-1.5 text-xs sm:text-sm">
            <p>✨ {analytics.totalUserMessages.toLocaleString()} messages sent</p>
            <p>💬 {analytics.totalConversations} conversations</p>
            <p>🔥 {analytics.longestStreak.days} day streak</p>
            <p>🎯 {analytics.personalityType}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4 justify-center">
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
                  link.download = `gpt-wrap-2025.png`;
                  link.href = canvas.toDataURL('image/png');
                  link.click();
                } catch (error) {
                  console.error('Failed to generate image:', error);
                }
              }}
              className="bg-gradient-secondary text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:opacity-90 transition text-xs sm:text-sm w-full sm:w-auto"
            >
              📸 Download Wrap
            </button>
            <button
              onClick={onReset}
              className="bg-white/10 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition border border-white/20 text-xs sm:text-sm w-full sm:w-auto"
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-3 sm:p-4 md:p-6">
      <div className="max-w-2xl w-full relative">
        {/* Stacked card effect - background layers - hidden on mobile for performance */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-card backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/5 transform translate-y-2 scale-[0.98] opacity-50"></div>
        <div className="hidden sm:block absolute inset-0 bg-gradient-card backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/5 transform translate-y-1 scale-[0.99] opacity-75"></div>
        
        {/* Main card */}
        <div className="relative bg-gradient-card backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between shadow-2xl">
          <div className="text-center space-y-2 sm:space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1.5 sm:mb-2 animate-fade-in leading-tight">
              {slide.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-300 font-semibold">
              {slide.subtitle}
            </p>
            <div className="mt-3 sm:mt-4">
              {slide.content}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 sm:mt-6">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-sm sm:text-base"
            >
              <span className="hidden sm:inline">← Previous</span>
              <span className="sm:hidden">←</span>
            </button>
            
            <div className="flex gap-1.5 sm:gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Next →</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-3 sm:mt-4 text-white text-xs sm:text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>

    {/* Hidden share card for download */}
    <div id="share-card-hidden" style={{ display: 'none', position: 'absolute', left: '-9999px', top: '0' }}>
      <div 
        style={{ 
          width: '800px', 
          minHeight: '1100px', 
          background: 'linear-gradient(135deg, #581c87 0%, #7e22ce 50%, #be185d 100%)',
          padding: '48px',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ 
              fontSize: '72px', 
              fontWeight: '900', 
              color: 'white',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
             GPTWrapped
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, rgba(168, 85, 247, 0.6))' }}></div>
              <p style={{ fontSize: '20px', color: '#e9d5ff', margin: 0, fontWeight: '300' }}>2025 Year in Review</p>
              <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, rgba(168, 85, 247, 0.6))' }}></div>
            </div>
          </div>

          {/* Hero Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '32px 24px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '64px', fontWeight: '900', color: 'white', lineHeight: 1 }}>
                {analytics.totalConversations.toLocaleString()}
              </div>
              <div style={{ fontSize: '13px', color: '#e9d5ff', marginTop: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Conversations</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '32px 24px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '64px', fontWeight: '900', color: 'white', lineHeight: 1 }}>
                {analytics.totalUserMessages.toLocaleString()}
              </div>
              <div style={{ fontSize: '13px', color: '#e9d5ff', marginTop: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Messages Sent</div>
            </div>
          </div>

          {/* Day Streak - Full Width */}
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '64px', fontWeight: '900', color: 'white', lineHeight: 1 }}>{analytics.longestStreak.days}</div>
              <div style={{ fontSize: '13px', color: '#e9d5ff', marginTop: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Day Streak</div>
            </div>
            <div style={{ fontSize: '60px', marginLeft: '20px' }}>🔥</div>
          </div>

          {/* Personality Highlight */}
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: '#e9d5ff', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em' }}>You Are</div>
              <div style={{ fontSize: '52px', fontWeight: '900', color: 'white', marginTop: '16px', lineHeight: 1.1 }}>
                {analytics.personalityType}
              </div>
             
            </div>
          </div>

          {/* Time Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '28px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', lineHeight: 1 }}>{analytics.mostActiveDay}</div>
              <div style={{ fontSize: '11px', color: '#e9d5ff', marginTop: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Peak Day</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '28px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', lineHeight: 1 }}>{analytics.mostActiveHour}:00</div>
              <div style={{ fontSize: '11px', color: '#e9d5ff', marginTop: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Power Hour</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '28px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', lineHeight: 1 }}>{analytics.conversationDepth}</div>
              <div style={{ fontSize: '11px', color: '#e9d5ff', marginTop: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Avg Depth</div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', marginTop: '8px' }}>
            <div style={{ color: '#d8b4fe', fontSize: '16px', fontWeight: '600' }}>
              {analytics.responseTimePattern}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginTop: '8px' }}>
              {analytics.firstMessageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {analytics.lastMessageDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
