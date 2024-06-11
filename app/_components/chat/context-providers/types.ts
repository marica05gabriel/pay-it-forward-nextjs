import { ChatMessage } from '@/app/_utils/types';

export type PrivateMessageDTO = {
  id: number;
  userId1: string;
  userId2: string;
  messages: ChatMessage[];
};
