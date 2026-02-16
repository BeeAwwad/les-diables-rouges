import LineupList from "./components/lineup-list";
import Formation from "./components/formation";
import { abrilFatface } from "@/fonts/fonts";

const Page = async () => {
  return (
    <div>
      <h2
        className={`text-primary mb-4 text-3xl font-semibold md:text-5xl ${abrilFatface.className} md:hidden`}
      >
        Starting 11
      </h2>
      <div className="flex flex-col md:flex-row pl-4 md:pl-0 pr-4">
        <LineupList />
        <Formation />
      </div>
    </div>
  );
};

export default Page;
