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
  id: number;
  nickname: string;
  avatar: string;
};

export type Chat = {
  id: number;
  contactId: number;
  messages: ChatMessage[];
};

export type ActiveChat = {
  chat: Chat;
  contact: ChatContact;
};

export const NO_ID = '-1';
export type ChatMessageType = 'incoming' | 'outgoing';
export type ChatMessage = {
  id: string;
  chatId: number;
  fromId: number;
  toId: number;
  message: string;
  type: ChatMessageType;
};

export enum ValidationResultEnum {
  OK,
  FAILURE,
}
export type ValidationResult = {
  status: ValidationResultEnum;
  failures?: Array<string>;
};
