"use client";

import { useQuery, gql } from "@apollo/client";
import { Label, Pie, PieChart } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardContent } from "@/components/ui/card";

const PlAYED_GAMES = gql`
  query Query($id: ID!) {
    getFixtures(id: $id) {
      matches {
        homeTeam {
          shortName
          crest
        }
        awayTeam {
          shortName
          crest
        }
        score {
          fullTime {
            home
            away
          }
        }
        status
        utcDate
        competition {
          name
          emblem
        }
      }
      resultSet {
        competitions
        wins
        losses
        count
        played
      }
    }
  }
`;

const PlayedStats = () => {
  const { loading, error, data } = useQuery(PlAYED_GAMES, {
    variables: { id: "66" },
  });

  if (loading) return <Skeleton className="item-four shadow-xs" />;
  if (error)
    return (
      <div className="item-four flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-red-500 shadow-xs lg:text-lg">
        <p>Error: {error.message}</p>
      </div>
    );

  const { resultSet } = data.getFixtures;

  const draws = resultSet.played - resultSet.wins - resultSet.losses;

  const chartData = [
    { result: "wins", games: resultSet.wins, fill: "#28A745" },
    { result: "losses", games: resultSet.losses, fill: "#DC3545" },
    {
      result: "draws",
      games: draws,
      fill: "#FFC107",
    },
  ];
  const totalGames = resultSet.played;

  const chartConfig = {
    played: {
      label: "Played",
    },
    wins: {
      label: "Wins",
      color: "#28A745",
    },
    losses: {
      label: "Losses",
      color: "#DC3545",
    },
    draws: {
      label: "Draws",
      color: "#FFC107",
    },
  } satisfies ChartConfig;

  return (
    <Card className="item-four flex flex-row shadow-xs">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="games"
              nameKey="result"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalGames.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Games
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PlayedStats;
