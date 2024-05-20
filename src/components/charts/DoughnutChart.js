import React from 'react';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Box, Typography} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart({name, dataDict}) {

  const labels = dataDict.map((data) => data.name);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cantidad',
        data: dataDict.map((data) => data.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Typography variant="h6" style={{textAlign: 'center', marginTop: '40px', marginBottom: '20px'}}>
        {name}
      </Typography>
      <Box sx={{width: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Doughnut data={data}/>;
      </Box>
    </>
  )
}
