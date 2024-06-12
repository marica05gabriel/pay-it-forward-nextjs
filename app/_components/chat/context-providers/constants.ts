/**
 * Chat Server configuration
 */

const CHAT_BASE_URL = `${process.env.NEXT_PUBLIC_RESOURCE_SERVER_URL_CHAT}`;
const REST_PORT = `${process.env.NEXT_PUBLIC_RESOURCE_SERVER_URL_CHAT_REST_PORT}`;
const SOCKET_PORT = `${process.env.NEXT_PUBLIC_RESOURCE_SERVER_URL_CHAT_SOCKET_PORT}`;

// ex: http://localhost:8085
export const SOCKET_SERVER_URL = `${CHAT_BASE_URL}:${SOCKET_PORT}`;
export const REST_SERVER_URL = `${CHAT_BASE_URL}:${REST_PORT}`;

export const JOIN_CHATS_EVENT = 'join_chats';
export const DETACH_CHATS_EVENT = 'detach_chats';
export const PRIVATE_MESSAGE_EVENT = 'private_message';
export const GET_CHATS = 'get_chats';
