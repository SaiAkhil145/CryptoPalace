/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './LineChart.css'
import Chart from 'react-google-charts'

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (historicalData?.prices) {
      let dataCopy = [["Date", "Prices"]];
      historicalData.prices.forEach((item) => {
        // item[0] is timestamp (ms), item[1] is price
        const date = new Date(item[0]).toLocaleDateString();
        dataCopy.push([date, item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart style={{width:"600px"}}
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
    />
  );
};

export default LineChart;
