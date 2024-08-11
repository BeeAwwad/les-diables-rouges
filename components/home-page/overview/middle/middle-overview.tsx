import NextGame from "./next-game";
import SquadData from "./squad-data";
const MiddleOverview = () => {
  return (
    <div className="h-full w-full rounded-lg bg-white lg:w-[60%]">
      <NextGame />
      <SquadData />
    </div>
  );
};

export default MiddleOverview;
