interface Props {
  message: string;
  avatar: string;
}
export const IncomingMessage = ({ message, avatar }: Props) => {
  return (
    <div className='mb-4 flex cursor-pointer'>
      <div className='mr-2 flex h-9 w-9 items-center justify-center rounded-full'>
        <img src={avatar} alt='User Avatar' className='h-8 w-8 rounded-full' />
      </div>
      <div className='flex max-w-96 gap-3 rounded-lg bg-white p-3'>
        <p className='text-gray-700'>{message}</p>
      </div>
    </div>
  );
};
