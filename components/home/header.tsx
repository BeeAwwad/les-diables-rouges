import { abrilFatface } from "@/fonts/fonts";

const Header = () => {
  return (
    <header className="mb-14 flex w-full items-center justify-center bg-primary xl:h-[20vh]">
      <div
        className={`flex ${abrilFatface.className} w-full justify-between p-9 text-3xl font-bold text-primary-100 antialiased sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl`}
      >
        <span>Le</span>
        <span>Diables</span>
        <span>Rouges</span>
        <span>.</span>
      </div>
    </header>
  );
};

export default Header;
