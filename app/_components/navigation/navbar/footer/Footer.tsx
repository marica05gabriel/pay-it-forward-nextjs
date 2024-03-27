import { RefObject, useRef } from "react";

export const Footer = () => {
  const avatarRef = useRef<HTMLUListElement>(null);
  function dropdownHandler(ref: RefObject<HTMLUListElement>) {
    console.log("HERE 1")
    if (ref && ref.current) {
      ref.current.classList.toggle("hidden");
    }
  }
  return (
    <div className="h-full xl:flex hidden items-center justify-end">
      <div className="h-full flex items-center">
        <div className="w-32 pr-16 h-full flex items-center justify-end border-r"></div>
        <div className="w-full h-full flex">
          <div className="w-16 xl:w-32 h-full flex items-center justify-center xl:border-r">
            <div className="relative">
              <a
                aria-label="show notifications"
                role="link"
                href="/"
                className="cursor-pointer w-6 h-6 xl:w-auto xl:h-auto text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-bell"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                </svg>
              </a>
              <div className="animate-ping w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto"></div>
            </div>
          </div>
          <div
            aria-haspopup="true"
            className="cursor-pointer w-full flex items-center justify-end relative"
          >
            <button
              aria-haspopup="true"
              onClick={() => dropdownHandler(avatarRef)}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded flex items-center"
            >
              <img
                className="rounded-full h-10 w-10 object-cover"
                src="https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png"
                alt="avatar"
              />
              <p className="text-gray-800 text-sm ml-2">Jane Doe</p>
            </button>
            <ul
              ref={avatarRef}
              className="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-48 hidden"
            >
              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-user"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                  <a href="/" className="ml-2">
                    My Profile
                  </a>
                </div>
              </li>
              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-help"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="17" x2="12" y2="17.01" />
                  <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                </svg>
                <a href="/" className="ml-2">
                  Help Center
                </a>
              </li>
              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-settings"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <a href="/" className="ml-2">
                  Account Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
