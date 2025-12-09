'use client';

import { WrapAnalytics } from '@/types';
import { useRef } from 'react';

interface ShareCardProps {
  analytics: WrapAnalytics;
  onDownload: () => void;
}

export default function ShareCard({ analytics, onDownload }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!cardRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `gpt-rewind-2025.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <div 
        ref={cardRef} 
        className="bg-gradient-primary p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/30 mx-auto"
        style={{ maxWidth: '800px', minHeight: '1100px' }}
      >
        <div className="space-y-6 text-white">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GPT Rewind 2025
            </h1>
            <p className="text-lg text-purple-300">My ChatGPT Year Wrapped</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* Total Conversations */}
            <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-purple-400">{analytics.totalConversations.toLocaleString()}</div>
              <div className="text-sm text-white/70 mt-1">Conversations</div>
            </div>

            {/* Messages Sent */}
            <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-pink-400">{analytics.totalUserMessages.toLocaleString()}</div>
              <div className="text-sm text-white/70 mt-1">Messages Sent</div>
            </div>

            {/* Longest Streak */}
            <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-purple-400">{analytics.longestStreak.days} 🔥</div>
              <div className="text-sm text-white/70 mt-1">Day Streak</div>
            </div>

            {/* Productivity Score */}
            <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-pink-400">{analytics.productivityScore}/100</div>
              <div className="text-sm text-white/70 mt-1">Productivity</div>
            </div>
          </div>

          {/* Personality Section */}
          <div className="bg-gradient-card p-6 rounded-2xl border border-white/10 mt-6">
            <div className="text-center space-y-2">
              <div className="text-base text-white/70">I&apos;m a</div>
              <div className="text-3xl font-bold text-white">{analytics.personalityType}</div>
              <div className="text-base text-purple-300 mt-3">{analytics.dominantTheme}</div>
            </div>
          </div>

          {/* Top Topics */}
          <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10">
            <div className="text-lg font-bold text-white mb-3">Top Topics</div>
            <div className="space-y-2">
              {analytics.topTopics.slice(0, 5).map((topic, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-white/90">#{i + 1} {topic.topic}</span>
                  <span className="text-purple-400 font-semibold text-sm">{topic.count}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-purple-400">{analytics.mostActiveDay}</div>
              <div className="text-xs text-white/70">Peak Day</div>
            </div>
            <div className="bg-white/5 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-pink-400">{analytics.mostActiveHour}:00</div>
              <div className="text-xs text-white/70">Power Hour</div>
            </div>
            <div className="bg-white/5 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-purple-400">{analytics.conversationDepth}</div>
              <div className="text-xs text-white/70">Avg Depth</div>
            </div>
          </div>

          {/* Code Stats */}
          {analytics.codeBlockCount > 0 && (
            <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{analytics.codeBlockCount.toLocaleString()}</div>
                <div className="text-sm text-white/70 mt-1">Code Blocks Shared 💻</div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8 space-y-1">
            <div className="text-white/50 text-xs">
              {analytics.firstMessageDate?.toLocaleDateString()} - {analytics.lastMessageDate?.toLocaleDateString()}
            </div>
            <div className="text-purple-300 text-sm font-semibold">
              {analytics.responseTimePattern}
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center space-y-2 sm:space-y-3">
        <button
          onClick={downloadImage}
          className="bg-gradient-secondary hover:opacity-90 text-white font-semibold py-2.5 sm:py-3 px-8 sm:px-10 rounded-full transition-all transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
        >
          📸 Download as Image
        </button>
        <p className="text-white/60 text-xs sm:text-sm">Share your wrap on LinkedIn, Twitter, or Instagram!</p>
      </div>
    </div>
  );
}
