"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart, Tooltip, Legend, ArcElement } from "chart.js";
import { useQuery, gql } from "@apollo/client";

const PlAYED_GAMES = gql`
  query Query($id: ID!) {
    getFixtures(id: $id) {
      resultSet {
        competitions
        wins
        draws
        losses
        count
      }
    }
  }
`;

Chart.register(Tooltip, Legend, ArcElement);

export const PlayedStats = () => {
  const { loading, error, data } = useQuery(PlAYED_GAMES, {
    variables: { id: "66" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { resultSet } = data.getFixtures;

  const pieChartData = {
    labels: ["win", "loss", "draw"],
    datasets: [
      {
        label: "matches played",
        data: [resultSet.wins, resultSet.losses, resultSet.draws],
        backgroundColor: ["#50C878", "#F82938", "#FEBE10"],
        hoverOffset: 4,
      },
    ],
  };

  const options: Object = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const texCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart: Chart<"doughnut", number[], string>) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bold 30px";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${isNaN(resultSet.loss + resultSet.wins) ? 0 : resultSet.loss + resultSet.wins} games`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y,
      );
    },
  };
  return (
    <div className="w-full md:w-1/2">
      <Doughnut options={options} data={pieChartData} plugins={[texCenter]} />
    </div>
  );
};
