import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";

const BarChart = ({ fetchMethod }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    series: [
      {
        name: "Property Count State Wise",
        data: [],
      },
    ],
  });

  useEffect(() => {
    dispatch(fetchMethod()).then((data) => {
      const d = data.statePropertyChartData;
      setOptions({
        ...options,
        xaxis: {
          categories: d.map((item) => item.state),
        },
        series: [
          {
            name: "Count",
            data: d.map((item) => item.count),
          },
        ],
      });
    });
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="bar-chart">
          <Chart
            options={options}
            series={options.series}
            type={options.chart.type}
            width={500}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
