import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";

const DonutChart = ({ fetchMethod }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState({
    chart: {
      type: "donut",
    },
    labels: [],
    series: [],
  });

  useEffect(() => {
    dispatch(fetchMethod()).then((data) => {
      const d = data.propertyTypeCountChartData;
      setOptions({
        ...options,
        labels: d.map((item) => item.propertyType),

        series: d.map((item) => item.count),
      });
    });
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="donut-chart">
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

export default DonutChart;
