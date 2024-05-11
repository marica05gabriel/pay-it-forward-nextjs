export type BookType = {
  id: number;
  title: string;
  authors: string[];
  image: string;
  description?: string;
  categories?: string[];
  isbn13?: string;
  isbn10?: string;
};

export type ChatContactData = {
  nickname: string;
  lastMessage: string;
  avatar: string;
};

export type ChatMessageType = 'incoming' | 'outgoing';
export type ChatMessage = {
  message: string;
  type: ChatMessageType;
};
