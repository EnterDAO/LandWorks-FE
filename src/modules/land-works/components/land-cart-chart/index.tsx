import React from 'react';
import { Line } from 'react-chartjs-2';

import './index.scss';

const data = {
  labels: ['29.10', '1.11', '02.11'],
  datasets: [
    {
      label: 'Eth Price',
      data: [0.6, 0.5, 0.6],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const LandCartChart: React.FC = () => {
  return <Line data={data} options={options} height={120} width={220} />;
};
