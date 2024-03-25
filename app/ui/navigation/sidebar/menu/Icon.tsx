import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export const Icon = ({ children }: Props) => {
    return (
        <div className="md:w-6 md:h-6 w-5 h-5">
            {children}
        </div>
    )
};
