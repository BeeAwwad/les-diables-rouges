import { PlayedStats } from "./played-stats";
import { SquadCarousel } from "./squad-carousel";

const SquadData = () => {
  return (
    <div className="w-full max-w-5xl md:flex">
      <PlayedStats />
      <SquadCarousel />
    </div>
  );
};

export default SquadData;
