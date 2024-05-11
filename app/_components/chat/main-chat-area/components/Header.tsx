interface Props {
  title: string;
}
export const Header = ({ title }: Props) => {
  return (
    <header className='bg-white p-4 text-gray-700'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
    </header>
  );
};
