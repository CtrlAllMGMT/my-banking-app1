// src/components/BankingChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const BankingChart = ({ chartData }) => {
  const data = {
    labels: chartData.map((data) => data.date),
    datasets: [
      {
        label: 'Bank Balance',
        data: chartData.map((data) => data.bankBalance),
        fill: false,
        backgroundColor: '#0000FF',
        borderColor: '#0000FF',
      },
      {
        label: 'Card Balance',
        data: chartData.map((data) => data.cardBalance),
        fill: false,
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
      },
      // Add more datasets for other data series
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default BankingChart;