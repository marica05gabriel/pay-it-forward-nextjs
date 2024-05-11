export const ChatInput = () => {
  return (
    /* <!-- Chat Input --> */
    <footer className='absolute bottom-0 w-3/4 border-t border-gray-300 bg-white p-4'>
      <div className='flex items-center'>
        <input
          type='text'
          placeholder='Type a message...'
          className='w-full rounded-md border border-gray-400 p-2 focus:border-blue-500 focus:outline-none'
        />
        <button className='ml-2 rounded-md bg-indigo-500 px-4 py-2 text-white'>
          Send
        </button>
      </div>
    </footer>
  );
};
