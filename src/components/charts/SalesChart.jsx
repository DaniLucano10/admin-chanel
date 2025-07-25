import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { ThemeContext } from "../../context/ThemeContext";

export const SalesChart = () => {
  const { theme } = useContext(ThemeContext);

  const chartColors = {
    light: {
      chart1: "oklch(0.646 0.222 41.116)",
      chart2: "oklch(0.6 0.118 184.704)",
      chart3: "oklch(0.398 0.07 227.392)",
      chart4: "oklch(0.828 0.189 84.429)",
      chart5: "oklch(0.769 0.188 70.08)",
      foreground: "oklch(0.129 0.042 264.695)",
    },
    dark: {
      chart1: "oklch(0.488 0.243 264.376)",
      chart2: "oklch(0.696 0.17 162.48)",
      chart3: "oklch(0.769 0.188 70.08)",
      chart4: "oklch(0.627 0.265 303.9)",
      chart5: "oklch(0.645 0.246 16.439)",
      foreground: "oklch(0.984 0.003 247.858)",
    },
  };

  const colors = chartColors[theme];

  const options = {
    chart: {
      id: "basic-bar",
      foreColor: colors.foreground,
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May"],
    },
    colors: [
      colors.chart1,
      colors.chart2,
      colors.chart3,
      colors.chart4,
      colors.chart5,
    ],
    tooltip: {
      theme: theme,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Ventas",
      data: [30, 40, 35, 50, 49],
    },
  ];

  return (
    <div className="bg-card text-card-foreground rounded-lg p-4 shadow w-full">
      <h2 className="text-lg font-semibold mb-4">Ventas Mensuales</h2>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={300}
      />
    </div>
  );
};


