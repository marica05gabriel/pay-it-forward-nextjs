/**
 * Chat Server configuration
 */
const PROTOCOL = 'http';
const BASE_URL = 'localhost';
const PORT = '8051';
// ex: http://localhost:8085
export const SERVER_URL = `${PROTOCOL}://${BASE_URL}:${PORT}`;

export const JOIN_CHATS_EVENT = 'join_chats';
export const DETACH_CHATS_EVENT = 'detach_chats';
export const PRIVATE_MESSAGE_EVENT = 'private_message';
export const GET_CHATS = 'get_chats';
