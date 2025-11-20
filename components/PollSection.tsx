import React, { useState } from 'react';
import { Poll } from '../types';

interface PollSectionProps {
  initialPoll: Poll;
}

const PollSection: React.FC<PollSectionProps> = ({ initialPoll }) => {
  const [poll, setPoll] = useState<Poll>(initialPoll);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    const updatedOptions = poll.options.map(opt => 
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );

    setPoll({
      ...poll,
      options: updatedOptions,
      totalVotes: poll.totalVotes + 1
    });
    
    setSelectedOption(optionId);
    setHasVoted(true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider">VOTE</span>
        今日話題：{poll.question}
      </h3>

      <div className="space-y-3">
        {poll.options.map((option) => {
          const percentage = Math.round((option.votes / poll.totalVotes) * 100) || 0;
          const isSelected = selectedOption === option.id;

          return (
            <div key={option.id} className="relative">
              <button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                className={`w-full relative z-10 flex justify-between items-center p-3 rounded-lg border-2 transition-all duration-300 ${
                    isSelected 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : hasVoted 
                        ? 'border-gray-100 bg-gray-50 text-gray-500'
                        : 'border-gray-100 hover:border-purple-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-medium">{option.text}</span>
                {hasVoted && (
                  <span className="font-bold">{percentage}%</span>
                )}
              </button>
              
              {/* Progress Bar Background */}
              {hasVoted && (
                <div 
                  className="absolute top-0 left-0 h-full bg-purple-100 rounded-lg transition-all duration-1000 ease-out z-0"
                  style={{ width: `${percentage}%`, opacity: 0.5 }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-xs text-gray-400 text-right">
        總票數: {poll.totalVotes}
      </div>
    </div>
  );
};

export default PollSection;