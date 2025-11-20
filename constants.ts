import { Post, Poll } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '週五下班心情！',
    content: '這個禮拜終於結束了，大家的週末計畫是什麼呢？🍕🍻 還是要在家裡當沙發馬鈴薯？留言告訴小編！',
    imageUrl: 'https://picsum.photos/600/600?random=1',
    likes: 1240,
    comments: 88,
    tags: ['#週末愉快', '#放鬆', '#FunNews'],
    timestamp: '2小時前'
  },
  {
    id: '2',
    title: '超商新品開箱 🔥',
    content: '這款布丁奶茶真的太邪惡了！甜度爆表但是好療癒～螞蟻人絕對不能錯過！想看試吃影片嗎？',
    imageUrl: 'https://picsum.photos/600/600?random=2',
    likes: 3500,
    comments: 420,
    tags: ['#超商美食', '#新品', '#螞蟻人'],
    timestamp: '5小時前'
  },
  {
    id: '3',
    title: '關於那些年的偶像劇',
    content: '聽到這首歌前奏就哭了...😭 你的青春回憶是哪一部？惡作劇之吻還是流星花園？',
    imageUrl: 'https://picsum.photos/600/600?random=3',
    likes: 5600,
    comments: 1200,
    tags: ['#回憶殺', '#偶像劇', '#青春'],
    timestamp: '昨天'
  }
];

export const INITIAL_POLL: Poll = {
  id: 'poll-1',
  question: '早餐店大對決！你都吃什麼？',
  totalVotes: 150,
  options: [
    { id: 'opt-1', text: '經典蛋餅', votes: 80 },
    { id: 'opt-2', text: '鐵板麵加蛋', votes: 50 },
    { id: 'opt-3', text: '蘿蔔糕', votes: 20 },
  ]
};