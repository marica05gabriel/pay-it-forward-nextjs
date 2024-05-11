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

// Types used for Chat
export type ChatContact = {
  id: string;
  nickname: string;
  avatar: string;
};

export type Chat = {
  id: string;
  contactId: string;
  messages: ChatMessage[];
};

export type ActiveChat = {
  chat: Chat;
  contact: ChatContact;
};

export type ChatMessageType = 'incoming' | 'outgoing';
export type ChatMessage = {
  id: string;
  message: string;
  type: ChatMessageType;
};
