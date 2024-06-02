import {
  Chat,
  ChatContact,
  ChatMessage,
  ValidationResult,
  ValidationResultEnum,
} from '@/app/_utils/types';
import _ from 'lodash';

export const validateMessage = (
  message: ChatMessage,
  chats: Map<number, Chat>,
  contacts: Map<number, ChatContact>,
  me: ChatContact
): ValidationResult => {
  if (_.isEmpty(message.message)) {
    const failure = `Cannot send empty message.`;
    console.error(failure);
    return { status: ValidationResultEnum.FAILURE, failures: [failure] };
  }
  const chat = chats.get(message.chatId);
  if (!chat) {
    const failure = `Cannot send message. Chat with id: ${message.chatId} not found!`;
    console.error(failure);
    return { status: ValidationResultEnum.FAILURE, failures: [failure] };
  }

  const fromId = message.fromId;
  const toId = message.toId;
  const from = fromId === me.id ? me : contacts.get(fromId);
  const to = toId === me.id ? me : contacts.get(toId);
  if (!from || !to) {
    const failure = `Cannot send message. Sender with id: ${fromId} or receiver with id ${toId} not found!`;
    console.error(failure);
    return { status: ValidationResultEnum.FAILURE, failures: [failure] };
  }

  if (from !== me && to !== me) {
    const failure = `You cannot send messages on behalf of someone else!`;
    console.error(failure);
    return { status: ValidationResultEnum.FAILURE, failures: [failure] };
  }

  if (from === to) {
    const failure = `You cannot send message to yourself!`;
    console.error(failure);
    return { status: ValidationResultEnum.FAILURE, failures: [failure] };
  }

  return { status: ValidationResultEnum.OK };
};

export const prepareData = (
  message: ChatMessage,
  chats: Map<number, Chat>,
  contacts: Map<number, ChatContact>
) => {
  const chat = chats.get(message.chatId);
  const to = contacts.get(message.toId);
  if (!to) {
    throw Error(`Receiver user not found! User id: ${message.toId}`);
  }
  return {
    chat: chat,
    existingMessages: chat?.messages ?? [],
    to,
  };
};
