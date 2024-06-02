import { ChatMessage } from '@/app/_utils/types';

export type PrivateMessageDTO = {
  id: number;
  userId1: number;
  userId2: number;
  messages: ChatMessage[];
};
