import NextGame from "./next-game";
import SquadData from "./squad-data";
import { OverviewTable } from "./overview-table";
const MiddleOverview = () => {
  return (
    <div className="h-full rounded-lg bg-white">
      <NextGame />
      {/* <SquadData /> */}
      <OverviewTable />
    </div>
  );
};

export default MiddleOverview;
