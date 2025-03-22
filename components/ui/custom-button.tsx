const CustomButton = ({
  children,
  type,
  onClick,
}: {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
}) => {
  return (
    <button
      className="border-primary hover:border-primary bg-primary-300 cursor-pointer rounded-lg border-b-[4px] px-6 py-2 text-white transition-all hover:-translate-y-[1px] hover:border-b-[6px] hover:brightness-110 active:translate-y-[2px] active:border-b-[2px] active:brightness-90"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
