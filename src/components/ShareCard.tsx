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
        backgroundColor: '#000000',
        scale: 2,
        logging: false,
        windowWidth: 1200,
        windowHeight: 1600,
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
    <div className="space-y-6">
      <div 
        ref={cardRef} 
        className="bg-gradient-to-br from-purple-900 via-black to-black p-12 rounded-3xl border border-purple-500/30"
        style={{ width: '1200px', minHeight: '1600px' }}
      >
        <div className="space-y-8 text-white">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GPT Rewind 2025
            </h1>
            <p className="text-2xl text-purple-300">My ChatGPT Year Wrapped</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            {/* Total Conversations */}
            <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-purple-400">{analytics.totalConversations.toLocaleString()}</div>
              <div className="text-lg text-white/70 mt-2">Conversations</div>
            </div>

            {/* Messages Sent */}
            <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-pink-400">{analytics.totalUserMessages.toLocaleString()}</div>
              <div className="text-lg text-white/70 mt-2">Messages Sent</div>
            </div>

            {/* Longest Streak */}
            <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-purple-400">{analytics.longestStreak.days} 🔥</div>
              <div className="text-lg text-white/70 mt-2">Day Streak</div>
            </div>

            {/* Productivity Score */}
            <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-pink-400">{analytics.productivityScore}/100</div>
              <div className="text-lg text-white/70 mt-2">Productivity</div>
            </div>
          </div>

          {/* Personality Section */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 rounded-2xl border border-white/10 mt-8">
            <div className="text-center space-y-3">
              <div className="text-2xl text-white/70">I&apos;m a</div>
              <div className="text-5xl font-bold text-white">{analytics.personalityType}</div>
              <div className="text-xl text-purple-300 mt-4">{analytics.dominantTheme}</div>
            </div>
          </div>

          {/* Top Topics */}
          <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10">
            <div className="text-2xl font-bold text-white mb-4">Top Topics</div>
            <div className="space-y-3">
              {analytics.topTopics.slice(0, 5).map((topic, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-lg text-white/90">#{i + 1} {topic.topic}</span>
                  <span className="text-purple-400 font-semibold">{topic.count}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-400">{analytics.mostActiveDay}</div>
              <div className="text-sm text-white/70">Peak Day</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-pink-400">{analytics.mostActiveHour}:00</div>
              <div className="text-sm text-white/70">Power Hour</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-400">{analytics.conversationDepth}</div>
              <div className="text-sm text-white/70">Avg Depth</div>
            </div>
          </div>

          {/* Code Stats */}
          {analytics.codeBlockCount > 0 && (
            <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">{analytics.codeBlockCount.toLocaleString()}</div>
                <div className="text-lg text-white/70 mt-2">Code Blocks Shared 💻</div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-12 space-y-2">
            <div className="text-white/50 text-sm">
              {analytics.firstMessageDate?.toLocaleDateString()} - {analytics.lastMessageDate?.toLocaleDateString()}
            </div>
            <div className="text-purple-300 text-lg font-semibold">
              {analytics.responseTimePattern}
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center space-y-4">
        <button
          onClick={downloadImage}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 text-lg"
        >
          📸 Download as Image
        </button>
        <p className="text-white/60 text-sm">Share your wrap on LinkedIn, Twitter, or Instagram!</p>
      </div>
    </div>
  );
}
