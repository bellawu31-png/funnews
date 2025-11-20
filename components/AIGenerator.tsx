import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateViralPost } from '../services/geminiService';
import { Post } from '../types';

interface AIGeneratorProps {
  onPostGenerated: (post: Post) => void;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ onPostGenerated }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      const content = await generateViralPost(topic);
      
      const newPost: Post = {
        id: Date.now().toString(),
        title: content.headline,
        content: content.caption,
        imageUrl: `https://picsum.photos/600/600?random=${Date.now()}`,
        likes: 0,
        comments: 0,
        tags: content.hashtags,
        isAiGenerated: true,
        timestamp: '剛剛'
      };

      onPostGenerated(newPost);
      setTopic('');
    } catch (error) {
      console.error("Failed to generate", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-1 shadow-lg mb-8">
      <div className="bg-white rounded-xl p-6 text-center">
        <div className="inline-block p-3 rounded-full bg-purple-100 text-purple-600 mb-4">
          <Sparkles size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">AI 創意小編生成器</h3>
        <p className="text-gray-500 text-sm mb-6">
          想不到要發什麼？輸入一個關鍵字，讓 Gemini 幫你生成一篇爆紅貼文！
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="例如：珍珠奶茶、週一症候群、可愛貓咪..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                生成中
              </>
            ) : (
              <>
                <Sparkles size={18} />
                立即生成
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;