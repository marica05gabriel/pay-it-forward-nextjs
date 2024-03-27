import clsx from "clsx";

interface Props {
  label: string;
  href: string;
  isSelected?: boolean;
}
export const Item = ({ label, href, isSelected }: Props) => {
  return (
    <li
      className={clsx(
        "hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm mx-5 tracking-normal",
        isSelected && "text-indigo-700",
        !isSelected && "text-gray-800"
      )}
    >
      <a href={href}> {label}</a>
    </li>
  );
};
