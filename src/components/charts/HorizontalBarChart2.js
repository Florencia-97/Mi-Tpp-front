import React from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';

import {Bar} from 'react-chartjs-2';
import {Box, Typography} from "@mui/material";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function HorizontalBarChart2({name, dataDict, label}) {
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
      },
    },
  };

  const labels = dataDict.map((data) => data.name);

  const data = {
    labels,
    datasets: [
      {
        label: label || 'Cantidad',
        data: dataDict.map((data) => data.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Typography variant="h6" style={{textAlign: 'center', marginTop: '40px', marginBottom: '20px'}}>
        {name}
      </Typography>
      <Box sx={{width: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Bar options={options} data={data}/>
      </Box>
    </>
  );
}