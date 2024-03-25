import Link from "next/link";

export const Header = () => (
  <Link href="/">
    <div aria-label="Home" role="img" className="mr-10 flex items-center">
      <img
        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg6.svg"
        alt="logo"
      />
      <h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block">
        Pay it forward
      </h3>
    </div>
  </Link>
);
