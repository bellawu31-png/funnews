export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  likes: number;
  comments: number;
  tags: string[];
  isAiGenerated?: boolean;
  timestamp: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export interface GeneratedContent {
  headline: string;
  caption: string;
  hashtags: string[];
  emoji_mood: string;
}