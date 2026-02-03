import clsx from "clsx";
import { Button } from "../ui/button";

const CustomButton = ({
  children,
  type,
  onClick,
  className,
}: {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      className={clsx(
        "border-primary hover:border-primary bg-primary-300 hover:bg-primary-300 cursor-pointer rounded-lg border-b-4 px-6 py-2 text-xs text-white transition-all hover:-translate-y-px hover:border-b-[6px] active:translate-y-0.5 active:border-b-2 active:brightness-90 sm:text-sm xl:text-base",
        className,
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
