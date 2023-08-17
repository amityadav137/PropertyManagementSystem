import React, { useState } from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "line",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    series: [
      {
        name: "Temperatures",
        data: [7, 6, 9, 14, 18, 21, 19, 20, 25, 22, 18, 13],
      },
    ],
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={options.series}
            type={options.type}
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
