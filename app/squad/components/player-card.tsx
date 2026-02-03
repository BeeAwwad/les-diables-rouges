import { PlayerProps } from "@/lib/types";

type PlayerCardProps = {
  player: PlayerProps;
};

function PlayerCard({ player }: PlayerCardProps) {
  return (
    <li className="rounded-sm border p-4 space-y-1">
      <p className="font-medium">{player.name}</p>
      <p className="text-sm text-muted-foreground">#{player.shirt_number}</p>
      <p className="text-xs">{player.position}</p>
    </li>
  );
}

export default PlayerCard;
