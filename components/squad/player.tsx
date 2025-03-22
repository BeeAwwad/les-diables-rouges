type Player = {
  number: string;
  name: string;
  matchesPlayed: string;
};

type Goalie = Player & {
  saves: string | undefined;
  savesInsideBox: string | undefined;
  goalsConceded: string | undefined;
};

type Defender = Player & {
  tackles: string | undefined;
  interceptions: string | undefined;
  blocks: string | undefined;
};

type Midfielder = Player & {
  goals: string | undefined;
  assists: string | undefined;
  tackles: string | undefined;
};

type Forward = Player & {
  goals: string | undefined;
  assists: string | undefined;
  keyPasses: string | undefined;
};
type PlayerStatsProps = {
  number: string;
  name: string;
  matchesPlayed: string;
  stats: (string | undefined)[];
};

const PlayerStats = ({
  number,
  name,
  matchesPlayed,
  stats,
}: PlayerStatsProps) => {
  return (
    <>
      <span className="flex items-center gap-2.5 text-xs md:gap-4 md:text-sm lg:text-base">
        <span className="bg-primary-300 flex size-10 items-center justify-center text-white sm:size-12">
          {number}
        </span>
        <span>
          {name.includes(" ") ? name.split(" ").slice(1).join(" ") : name}
        </span>
      </span>
      <span className="flex gap-5 text-xs md:text-sm lg:gap-7">
        <span className="flex size-10 items-center justify-center bg-green-300 sm:size-12">
          {matchesPlayed === "" ? "0" : matchesPlayed}
        </span>
        {stats.map((stat, index) => (
          <span
            key={index}
            className="flex size-10 items-center justify-center bg-green-300 sm:size-12"
          >
            {stat === "" || stat === undefined ? "0" : stat}
          </span>
        ))}
      </span>
    </>
  );
};

export const Header = (props: { [key: string]: string }) => {
  const { title, apps, statOne, statTwo, statThree } = props;
  return (
    <div className="mb-4 flex justify-between px-1">
      <h3 className="font-medium lg:text-lg xl:text-2xl">{title}</h3>
      <span className="flex gap-5 text-xs font-medium lg:gap-4 lg:text-sm xl:text-base">
        <span className="flex items-center justify-center">{apps}</span>
        <span className="flex items-center justify-center">{statOne}</span>
        <span className="flex items-center justify-center">{statTwo}</span>
        <span className="flex items-center justify-center">{statThree}</span>
      </span>
    </div>
  );
};

export const Goalkeeper = (props: Goalie) => {
  const stats = [props.saves, props.savesInsideBox, props.goalsConceded];
  return (
    <PlayerStats
      number={props.number}
      name={props.name}
      matchesPlayed={props.matchesPlayed}
      stats={stats}
    />
  );
};

export const Defender = (props: Defender) => {
  const stats = [props.tackles, props.interceptions, props.blocks];
  return (
    <PlayerStats
      number={props.number}
      name={props.name}
      matchesPlayed={props.matchesPlayed}
      stats={stats}
    />
  );
};

export const Midfielder = (props: Midfielder) => {
  const stats = [props.tackles, props.goals, props.assists];
  return (
    <PlayerStats
      number={props.number}
      name={props.name}
      matchesPlayed={props.matchesPlayed}
      stats={stats}
    />
  );
};

export const Forward = (props: Forward) => {
  const stats = [props.keyPasses, props.goals, props.assists];
  return (
    <PlayerStats
      number={props.number}
      name={props.name}
      matchesPlayed={props.matchesPlayed}
      stats={stats}
    />
  );
};
