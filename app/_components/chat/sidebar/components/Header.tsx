interface Props {
  title: string;
}
export const Header = ({ title }: Props) => {
  return (
    /* <!-- Sidebar Header --> */
    <header className='flex items-center justify-between border-b border-gray-300 bg-indigo-600 p-4 text-white'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
    </header>
  );
};
