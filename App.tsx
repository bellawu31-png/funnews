import React, { useState } from 'react';
import { Search, Bell, Menu, Home, Compass, PlusSquare, Heart, User, MessageCircle } from 'lucide-react';
import PostCard from './components/PostCard';
import AIGenerator from './components/AIGenerator';
import PollSection from './components/PollSection';
import { INITIAL_POSTS, INITIAL_POLL } from './constants';
import { Post } from './types';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const addGeneratedPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex-1 flex items-center">
             <div className="font-black text-2xl tracking-tighter gradient-text cursor-pointer">
                EBC Fun News
             </div>
          </div>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-xs mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜尋"
                className="block w-full pl-10 pr-3 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-4 md:space-x-6">
            <Home className="w-6 h-6 cursor-pointer text-gray-900 hidden sm:block" />
            <Bell className="w-6 h-6 cursor-pointer text-gray-900 hover:text-gray-600 transition-colors" />
            <PlusSquare className="w-6 h-6 cursor-pointer text-gray-900 hover:text-gray-600 transition-colors" />
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300 cursor-pointer">
                 <img src="https://picsum.photos/100/100?random=me" alt="Profile" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full pt-6 px-4 md:grid md:grid-cols-3 md:gap-8">
        
        {/* Left Feed Column */}
        <div className="md:col-span-2">
          {/* Stories Bar (Mock) */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 overflow-x-auto">
            <div className="flex space-x-4 min-w-max">
              {['每日運勢', '美食地圖', '穿搭靈感', '週末去哪', '爆笑迷因'].map((story, i) => (
                <div key={i} className="flex flex-col items-center space-y-1 cursor-pointer group">
                  <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-white p-[2px]">
                      <img 
                        src={`https://picsum.photos/100/100?random=${i+10}`} 
                        alt={story} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs truncate w-16 text-center">{story}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generator */}
          <AIGenerator onPostGenerated={addGeneratedPost} />

          {/* Posts Feed */}
          <div className="space-y-4 pb-20">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar - Hidden on Mobile */}
        <div className="hidden md:block col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* User Profile Preview */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                     <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
                        <img src="https://picsum.photos/100/100?random=me" alt="Profile" className="w-full h-full object-cover"/>
                     </div>
                     <div>
                         <div className="font-bold text-sm">guest_user</div>
                         <div className="text-gray-500 text-xs">EBC 粉絲</div>
                     </div>
                </div>
                <button className="text-blue-500 text-xs font-bold hover:text-blue-700">切換</button>
            </div>

            {/* Interactive Poll */}
            <PollSection initialPoll={INITIAL_POLL} />

            {/* Suggestions */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-500 font-bold text-sm">為您推薦</h3>
                    <button className="text-xs font-bold text-gray-800 hover:text-gray-600">查看全部</button>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                     <img src={`https://picsum.photos/50/50?random=${i+50}`} alt="User" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold hover:underline cursor-pointer">trend_taiwan_{i}</div>
                                    <div className="text-xs text-gray-500">熱門話題</div>
                                </div>
                            </div>
                            <button className="text-blue-500 text-xs font-bold hover:text-blue-700">追蹤</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Links */}
            <div className="text-xs text-gray-400 space-y-2 mt-4">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <span>關於</span> • <span>協助</span> • <span>新聞中心</span> • <span>API</span> • <span>工作機會</span> • <span>隱私條款</span>
                </div>
                <div className="pt-2">
                    © 2024 EBC FUN NEWS INTERACTIVE
                </div>
            </div>

          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center z-50">
          <Home className="w-6 h-6 text-gray-900" />
          <Compass className="w-6 h-6 text-gray-900" />
          <PlusSquare className="w-6 h-6 text-gray-900" />
          <MessageCircle className="w-6 h-6 text-gray-900" /> {/* Using MessageCircle from lucide-react imported in components mostly but available globally via icon lib concepts */}
          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
              <img src="https://picsum.photos/100/100?random=me" alt="Profile" />
          </div>
      </div>
    </div>
  );
};

export default App;