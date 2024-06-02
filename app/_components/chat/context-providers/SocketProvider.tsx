'use client';

import {
  Children,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Socket, io } from 'socket.io-client';
import { SERVER_URL } from './constants';
import { ChatContact } from '@/app/_utils/types';

interface SocketContextProps {
  socket: Socket | undefined;
  addEventListener: (
    eventName: string,
    callback: (payload: any) => void
  ) => void;
  removeEventListener: (payload: any) => void;
}
const socketContextInitialValues: SocketContextProps = {
  socket: undefined,
  addEventListener: (eventName, callback) =>
    console.error('SocketContext not initialized!'),
  removeEventListener: (eventName) =>
    console.error('SocketContext not initialized!'),
};
const SocketContext = createContext<SocketContextProps>(
  socketContextInitialValues
);
export const useSocket = () => {
  return useContext(SocketContext);
};

interface Props {
  me: ChatContact;
  children: ReactNode;
}
export const SocketProvider = ({ me, children }: Props) => {
  const [socket, setSocket] = useState<Socket>();
  const [events, setEvents] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newSocket = io(SERVER_URL, { query: { user_id: me.id } });
    setSocket(newSocket);

    return () => {
      events.forEach((event) => {
        newSocket.removeListener(event);
      });
      setEvents(new Set());
      newSocket.close();
    };
  }, [me]);

  const addEventListener = (
    eventName: string,
    callback: (payload: any) => void
  ) => {
    console.log(
      `Setting up a socket event listener for [${eventName}] events...`
    );
    if (!socket) {
      console.error('Socket not initialized!');
      return;
    }
    setEvents((events) => {
      const updatedEvents = new Set(events);
      updatedEvents.add(eventName);
      return updatedEvents;
    });
    socket.on(eventName, callback);
    console.log(`Event Listener [${eventName}] successfully set!`);
  };

  const removeEventListener = (eventName: string) => {
    console.log(
      'Removing the socket event listener for [${eventName}] events...'
    );
    if (!socket) {
      console.error('Socket not initialized!');
      return;
    }
    setEvents((events) => {
      const updatedEvents = new Set(events);
      updatedEvents.delete(eventName);
      return updatedEvents;
    });
    socket.removeListener(eventName);
    console.log(`Event Listener [${eventName}] successfully removed!`);
  };

  const value = {
    socket,
    addEventListener,
    removeEventListener,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
