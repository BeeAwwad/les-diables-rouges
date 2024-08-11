import { PlayedStats } from "./played-stats";
import { SquadCarousel } from "./squad-carousel";

const SquadData = () => {
  return (
    <div className="w-full md:flex">
      <PlayedStats />
      <SquadCarousel />
    </div>
  );
};

export default SquadData;
