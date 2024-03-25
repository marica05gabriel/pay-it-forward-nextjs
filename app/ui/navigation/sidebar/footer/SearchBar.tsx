export const SearchBar = () => (
  <div className="flex justify-center mb-4 w-full px-6">
    <div className="relative w-full">
      <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
        <img
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg2.svg"
          alt="search"
        />
      </div>
      <input
        className="focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2"
        type="text"
        placeholder="Search"
      />
    </div>
  </div>
);
