'use client';

import { useState } from 'react';
import { WrapAnalytics } from '@/types';
import ShareCard from './ShareCard';

interface WrapDisplayProps {
  analytics: WrapAnalytics;
  onReset: () => void;
}

export default function WrapDisplay({ analytics, onReset }: WrapDisplayProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showShareCard, setShowShareCard] = useState(false);

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
              <p className="text-sm text-purple-300">From {analytics.longestStreak.startDate}</p>
              <p className="text-sm text-purple-300">To {analytics.longestStreak.endDate}</p>
              <p className="mt-4">{analytics.longestStreak.days > 30 ? "Absolutely unstoppable 🚀" : "That's commitment!"}</p>
            </>
          )}
        </div>
      )
    },
    {
      title: `${analytics.productivityScore}/100`,
      subtitle: 'Productivity Score',
      content: (
        <div className="text-white/70 space-y-3">
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-1000"
              style={{ width: `${analytics.productivityScore}%` }}
            />
          </div>
          <p className="text-lg">
            {analytics.productivityScore > 80 ? "You're crushing it! 💪" : 
             analytics.productivityScore > 50 ? "Solid work ethic 👍" : 
             "Quality over quantity 🎯"}
          </p>
          <p className="text-sm text-purple-300">Based on activity, streaks, and engagement</p>
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
          <p className="text-lg">From {analytics.firstMessageDate?.toLocaleDateString()} to {analytics.lastMessageDate?.toLocaleDateString()}</p>
          <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
            <p>✨ {analytics.totalUserMessages.toLocaleString()} messages sent</p>
            <p>💬 {analytics.totalConversations} conversations</p>
            <p>🔥 {analytics.longestStreak.days} day streak</p>
            <p>⚡ {analytics.productivityScore}/100 productivity</p>
            <p>🎯 {analytics.personalityType}</p>
          </div>
          <div className="flex gap-3 mt-6 justify-center">
            <button
              onClick={() => setShowShareCard(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:from-purple-500 hover:to-pink-500 transition"
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

  if (showShareCard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black p-4">
        <div className="max-w-4xl w-full">
          <ShareCard analytics={analytics} onDownload={() => {}} />
          <div className="text-center mt-6">
            <button
              onClick={() => setShowShareCard(false)}
              className="text-white/60 hover:text-white transition"
            >
              ← Back to slides
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/10 min-h-[500px] flex flex-col justify-between">
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
  );
}
