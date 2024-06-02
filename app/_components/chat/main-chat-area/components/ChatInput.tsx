import { ChangeEvent, FormEvent, useState } from 'react';
import { isEmpty } from 'lodash';

interface Props {
  chatId: number;
  myId: number;
  contactId: number;
  sendMessage: (toId: number, chatId: number, message: string) => void;
}
export const ChatInput = ({ chatId, myId, contactId, sendMessage }: Props) => {
  const [message, setMessage] = useState<string>('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty(message.trim())) {
      return;
    }

    setMessage('');
    sendMessage(chatId, contactId, message);
  };

  return (
    <footer className='absolute bottom-0 h-32 w-3/4 border-t border-gray-300 bg-white p-4'>
      <form onSubmit={(e) => handleSend(e)} className='flex items-center'>
        <input
          type='text'
          placeholder='Type a message...'
          className='h-20 w-full rounded-md border border-gray-400 p-2 focus:border-blue-500 focus:outline-none'
          onChange={(event) => handleInput(event)}
          value={message}
        />
        <button
          type='submit'
          className='ml-2 rounded-md bg-indigo-500 px-4 py-2 text-white'
        >
          Send
        </button>
      </form>
    </footer>
  );
};
