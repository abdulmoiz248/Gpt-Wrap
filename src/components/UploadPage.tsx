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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-white mb-2">
            GPT Rewind
          </h1>
          <p className="text-xl text-purple-300">
            Your 2025 ChatGPT Year Wrapped
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="space-y-6">
            <div className="text-white/80 text-sm space-y-2">
              <p>📊 Upload your ChatGPT conversations.json</p>
              <p className="text-xs">
                Get it from: ChatGPT Settings → Data Controls → Export Data
              </p>
            </div>

            <label className="block">
              <div className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105">
                {loading ? 'Analyzing...' : 'Upload JSON'}
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
              <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="text-white/60 text-xs">
          All processing happens in your browser. Your data never leaves your device.
        </div>
      </div>
    </div>
  );
}
