import { abrilFatface } from "@/fonts/fonts";
import { Standings } from "./components/standings";

const Page = () => {
  return (
    <div className="scrollbar-thin overflow-y-scroll">
      <h2
        className={`text-primary mb-4 text-3xl font-semibold md:text-5xl ${abrilFatface.className}`}
      >
        Standings
      </h2>
      <Standings />
    </div>
  );
};

export default Page;
