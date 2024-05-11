interface Props {
  nickname: string;
  lastMessage: string;
  avatar: string;
}
export const ChatContact = ({ nickname, lastMessage, avatar }: Props) => {
  return (
    <div className='mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100'>
      <div className='mr-3 h-12 w-12 rounded-full bg-gray-300'>
        <img
          src={avatar}
          alt='User Avatar'
          className='h-12 w-12 rounded-full'
        />
      </div>
      <div className='flex-1'>
        <h2 className='text-lg font-semibold'>{nickname}</h2>
        <p className='text-gray-600'>{lastMessage}</p>
      </div>
    </div>
  );
};
