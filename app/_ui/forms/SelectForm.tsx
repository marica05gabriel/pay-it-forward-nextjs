interface Props {
  selectedValue: string;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  searchQuery: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: Set<string>;
  handleSetValue: (country: string) => void;
}
export const SelectForm = ({
  selectedValue,
  isSearchOpen,
  toggleSearch,
  searchQuery,
  onSearch: handleInputChange,
  options,
  handleSetValue,
}: Props) => (
  <div className='group relative'>
    <button
      id='dropdown-button'
      onClick={toggleSearch}
      className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100'
    >
      <span className='mr-2'>{selectedValue}</span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='ml-2 mr-1 h-5 w-5'
        viewBox='0 0 20 20'
      >
        <path
          fillRule='evenodd'
          d='M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
          clipRule='evenodd'
        />
      </svg>
    </button>
    <div
      id='dropdown-menu'
      className='absolute right-0 mt-2 w-full space-y-1 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5'
      hidden={!isSearchOpen}
    >
      <input
        id='search-input'
        className='block w-full rounded-md border border-gray-300 px-4 py-2  text-gray-800 focus:outline-none'
        type='text'
        placeholder='Search country'
        autoComplete='off'
        value={searchQuery}
        onChange={handleInputChange}
      />
      {Array.from(options).map((option, index) => (
        <div
          className='hover:bg-gray-500'
          key={index}
          onClick={(e) => handleSetValue(option)}
        >
          {option}
        </div>
      ))}
    </div>
  </div>
);
