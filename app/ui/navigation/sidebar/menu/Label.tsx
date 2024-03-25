import clsx from "clsx";

interface Props {
  label: string;
  href: string;
  isSelected?: boolean;
}
export const Label = ({ label, href, isSelected }: Props) => {
  return (
      <a
        href={href}
        className={clsx(
          "ml-3 text-lg",
          isSelected && "text-indigo-500",
          !isSelected && "text-gray-800"
        )}
      >
        {label}
      </a>
  );
};
