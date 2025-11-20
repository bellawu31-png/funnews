import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 card-hover shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <img 
                src="https://picsum.photos/50/50?random=logo" 
                alt="User" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">funnewsebc</p>
            {post.isAiGenerated && (
              <p className="text-xs text-purple-600 font-medium flex items-center">
                ✨ AI 生成內容
              </p>
            )}
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-900">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full bg-gray-100 group">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        {/* EBC Style Overlay Text */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-white text-xl font-bold leading-tight drop-shadow-md">
                {post.title}
            </h2>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className={`transition-transform active:scale-90 ${liked ? 'text-red-500' : 'text-gray-800 hover:text-gray-600'}`}
            >
              <Heart size={24} fill={liked ? "currentColor" : "none"} />
            </button>
            <button className="text-gray-800 hover:text-gray-600">
              <MessageCircle size={24} />
            </button>
            <button className="text-gray-800 hover:text-gray-600">
              <Send size={24} />
            </button>
          </div>
          <button className="text-gray-800 hover:text-gray-600">
            <Bookmark size={24} />
          </button>
        </div>

        {/* Likes */}
        <p className="font-bold text-sm mb-1">{likesCount.toLocaleString()} 個讚</p>

        {/* Caption */}
        <div className="text-sm space-y-1">
          <p>
            <span className="font-bold mr-2">funnewsebc</span>
            {post.content}
          </p>
          <div className="text-blue-600 font-medium flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <span key={index} className="cursor-pointer hover:underline">{tag}</span>
            ))}
          </div>
        </div>
        
        <p className="text-xs text-gray-400 mt-2 uppercase">{post.timestamp}</p>
      </div>
    </div>
  );
};

export default PostCard;