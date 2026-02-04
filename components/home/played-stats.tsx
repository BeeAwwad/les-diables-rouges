"use client";

import { Label, Pie, PieChart } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeagueTable } from "@/queries/useLeagueTable";

const PlayedStats = () => {
  const { data: plTable, isLoading, isError } = useLeagueTable();
  const lesDiables = plTable?.find((team) => team.team_id === 66);

  if (isLoading) return <Skeleton className="item-four shadow-xs" />;

  if (isError)
    return (
      <div className="item-four flex items-center justify-center rounded-md bg-red-100 p-4 text-center text-red-500 shadow-xs lg:text-lg">
        <p>Error loading premier league stats.</p>
      </div>
    );

  const chartData = [
    { result: "wins", games: lesDiables?.won, fill: "#28A745" },
    { result: "losses", games: lesDiables?.lost, fill: "#DC3545" },
    {
      result: "draws",
      games: lesDiables?.draw,
      fill: "#FFC107",
    },
  ];
  const totalGames = lesDiables?.played_games;

  const chartConfig = {
    played: {
      label: "Played",
    },
    wins: {
      label: "Wins",
      color: "#9ee5b3",
    },
    losses: {
      label: "Losses",
      color: "#C4A343",
    },
    draws: {
      label: "Draws",
      color: "#FFC107",
    },
  } satisfies ChartConfig;

  return (
    <Card className="item-four shadow-xs no-scrollbar rounded-sm overflow-y-scroll py-1 flex items-center justify-center">
      <CardContent className="pb-0 h-full w-full">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
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
                          {totalGames?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Played
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PlayedStats;
