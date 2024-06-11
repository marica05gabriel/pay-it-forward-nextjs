export type BookType = {
  id: number;
  publicId?: string;
  title: string;
  authors: string;
  image: string;
  description?: string;
  categories?: string[];
  isbn13?: string;
  isbn10?: string;
  imageUrl?: string;
  currentOwner?: string;
  currentOwnerPublicId?: string;
  currentLocation?: BookLocationType;
  availabilityStatus: 'AVAILABLE' | 'NOT_AVAILABLE';
};

export type BookLocationType = {
  id: number;
  country: string;
  city: string;
};

// Types used for Chat
export type ChatContact = {
  id: string;
  nickname: string;
  avatar: string;
};

export type Chat = {
  id: number;
  contactId: string;
  messages: ChatMessage[];
};

export type Message = {
  id: string;
  isLastMessage: boolean;
  message: string;
  avatar: string;
  type: ChatMessageType;
  from: string;
  to: string;
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
  fromId: string;
  toId: string;
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

export type TransfeRequestEnum = 'accept' | 'refuse' | 'cancel';

export type TransferRequest = {
  id: string;
  createdAt: Date;
  from: string;
  fromPublicId: string;
  to: string;
  toPublicId: string;
  target: string;
  targetPublicId: string;
  status: 'PENDING' | 'CANCELED' | 'ACCEPTED' | 'REFUSED';
  consentDate: Date | null;
};

export type TransferEnum = 'complete' | 'cancel';

export type BookTransfer = {
  id: string;
  createdAt: Date;
  publicTransactionHash: string | null;
  from: string;
  fromPublicId: string;
  to: string;
  toPublicId: string;
  target: string;
  targetPublicId: string;
  status: 'PENDING' | 'CANCELED' | 'COMPLETED';
  // TODO canceledBy
};

export type BaseResponse = {
  status: string;
  code: string;
  message: string;
  fields?: Map<string, string>;
};
