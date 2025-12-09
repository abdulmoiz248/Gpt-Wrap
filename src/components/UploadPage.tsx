'use client';

import { useState } from 'react';
import { Conversation, WrapAnalytics } from '@/types';
import { analyzeConversations } from '@/lib/analyzer';
import WrapDisplay from './WrapDisplay';

export default function UploadPage() {
  const [analytics, setAnalytics] = useState<WrapAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const text = await file.text();
      const conversations: Conversation[] = JSON.parse(text);
      
      const results = analyzeConversations(conversations);
      setAnalytics(results);
    } catch (err) {
      setError('Failed to parse JSON file. Make sure its your ChatGPT export.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (analytics) {
    return <WrapDisplay analytics={analytics} onReset={() => setAnalytics(null)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4 sm:p-6 md:p-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 text-center">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
            GPTWrapped
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#b84fce]">
            Your 2025 ChatGPT Year Wrapped
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#d4acfb]/20">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-white/80 text-xs sm:text-sm space-y-2">
              <p>📊 Upload your ChatGPT conversations.json</p>
              <p className="text-xs">
                Get it from: ChatGPT Settings → Data Controls → Export Data
              </p>
            </div>

            <label className="block">
              <div className="cursor-pointer bg-gradient-secondary text-black hover:text-white font-semibold sm:font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all transform hover:scale-105 text-sm sm:text-base">
                {loading ? 'Creating...' : 'Upload JSON'}
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                disabled={loading}
              />
            </label>

            {error && (
              <div className="text-red-400 text-xs sm:text-sm bg-red-500/10 p-2.5 sm:p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="text-white/60 text-xs sm:text-sm">
          All processing happens in your browser. Your data never leaves your device.
        </div>
      </div>
    </div>
  );
}
