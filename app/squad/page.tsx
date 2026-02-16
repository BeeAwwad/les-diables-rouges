import { abrilFatface } from "@/fonts/fonts";
import Players from "./components/players";

const Page = () => {
  return (
    <div className="space-y-10 pl-3 md:pl-0 pb-6 pr-3 md:pr-6 overflow-y-scroll">
      <h1
        className={`text-primary mb-4 text-3xl font-semibold md:text-5xl ${abrilFatface.className}`}
      >
        Team Squad
      </h1>
      <Players />
    </div>
  );
};

export default Page;
