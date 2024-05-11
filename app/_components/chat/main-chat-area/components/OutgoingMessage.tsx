interface Props {
  message: string;
  avatar: string;
}
export const OutgoingMessage = ({ message, avatar }: Props) => {
  return (
    <div className='mb-4 flex cursor-pointer justify-end'>
      <div className='flex max-w-96 gap-3 rounded-lg bg-indigo-500 p-3 text-white'>
        <p>{message}</p>
      </div>
      <div className='ml-2 flex h-9 w-9 items-center justify-center rounded-full'>
        <img src={avatar} alt='My Avatar' className='h-8 w-8 rounded-full' />
      </div>
    </div>
  );
};
