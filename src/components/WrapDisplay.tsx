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
        </div>
      )
    },
    {
      title: `${analytics.totalConversations.toLocaleString()}`,
      subtitle: 'Total Conversations',
      content: (
        <div className="text-white/70">
          <p>You had {analytics.totalConversations} unique conversations with ChatGPT this year</p>
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
        </div>
      )
    },
    {
      title: analytics.mostActiveMonth,
      subtitle: 'Your Most Active Month',
      content: (
        <div className="text-white/70">
          <p>You were really grinding in {analytics.mostActiveMonth}</p>
        </div>
      )
    },
    {
      title: analytics.mostActiveDay,
      subtitle: 'Peak Usage Day',
      content: (
        <div className="text-white/70">
          <p>{analytics.mostActiveDay}s hit different</p>
        </div>
      )
    },
    {
      title: `${analytics.mostActiveHour}:00`,
      subtitle: 'Your Power Hour',
      content: (
        <div className="text-white/70">
          <p>Most active at {analytics.mostActiveHour}:00</p>
          <p className="mt-2">{analytics.mostActiveHour >= 22 || analytics.mostActiveHour < 6 ? '🦉 Night owl energy' : '☀️ Early bird vibes'}</p>
        </div>
      )
    },
    {
      title: `${analytics.nightOwlScore}`,
      subtitle: 'Midnight Messages',
      content: (
        <div className="text-white/70">
          <p>Messages sent between midnight and 6am</p>
          <p className="mt-2">{analytics.nightOwlScore > 100 ? 'Sleep is for the weak' : 'You actually sleep!'}</p>
        </div>
      )
    },
    {
      title: analytics.longestConversation.title.slice(0, 40) + '...',
      subtitle: 'Your Longest Conversation',
      content: (
        <div className="text-white/70">
          <p>{analytics.longestConversation.messageCount} messages back and forth</p>
          <p className="mt-2">That&apos;s dedication</p>
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
    {
      title: 'Models Used',
      subtitle: 'Your AI companions',
      content: (
        <div className="text-white/70 space-y-2">
          {Object.entries(analytics.modelUsage).map(([model, count]) => (
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
          <p>You sent {analytics.totalUserMessages.toLocaleString()} messages</p>
          <p>Across {analytics.totalConversations} conversations</p>
          <button
            onClick={onReset}
            className="mt-6 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-white/90 transition"
          >
            Start Over
          </button>
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
