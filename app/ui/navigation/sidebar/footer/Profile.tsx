export const Profile = () => (
  <div className="border-t border-gray-300">
    <div className="w-full flex items-center justify-between px-6 pt-1">
      <div className="flex items-center">
        <img
          alt="display avatar"
          role="img"
          src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
          className="w-8 h-8 rounded-md"
        />
        <p className="text-gray-800 text-base leading-4 ml-2">Jane Doe</p>
      </div>
      <ul className="flex">
        <li className="cursor-pointer text-white pt-5 pb-3">
          <a href="/">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg4.svg"
              alt="chat"
            />
          </a>
        </li>
        <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
          <a href="/">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg5.svg"
              alt="notifications"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
);
