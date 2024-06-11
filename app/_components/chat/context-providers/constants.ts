/**
 * Chat Server configuration
 */
const PROTOCOL = 'http';
const BASE_URL = 'localhost';
const PORT_SOCKET = '8055';
const PORT_REST = '8050';
// ex: http://localhost:8085
export const SOCKET_SERVER_URL = `${PROTOCOL}://${BASE_URL}:${PORT_SOCKET}`;
export const REST_SERVER_URL = `${PROTOCOL}://${BASE_URL}:${PORT_REST}`;

export const JOIN_CHATS_EVENT = 'join_chats';
export const DETACH_CHATS_EVENT = 'detach_chats';
export const PRIVATE_MESSAGE_EVENT = 'private_message';
export const GET_CHATS = 'get_chats';
