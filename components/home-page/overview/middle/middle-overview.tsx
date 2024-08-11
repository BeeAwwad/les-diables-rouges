import NextGame from "./next-game";
import SquadData from "./squad-data";
import { OverviewTable } from "./overview-table";
const MiddleOverview = () => {
  return (
    <div className="h-fit w-full rounded-lg bg-white lg:w-[60%]">
      <NextGame />
      <SquadData />
      <OverviewTable />
    </div>
  );
};

export default MiddleOverview;
