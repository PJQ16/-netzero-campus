import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Margin } from '@mui/icons-material';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

const StyledPieChart = styled(PieChart)(({ theme }) => ({
  width: '100%',
  height: '100%',
  maxWidth: '550px',
  maxHeight: '450px',
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const PieChartWithCenterLabel = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  const chartData = data.map((item, index) => ({
    value: parseFloat(item.tCO2e), // Convert tCO2e to a number
    label: item.name,
    color: ['#0E3B43','#357266','#A3BBAD','#65532F','#312509', ][index % 5], // Assign colors as needed
  }));

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      p: 2,
    }}>
      <Box sx={{
        width: '100%',
        height: 'auto',
        maxWidth: 850,
        maxHeight: 550,
        aspectRatio: '1 / 1',
      }}>
        <StyledPieChart
          series={[
            {
              data: chartData,
              innerRadius: 80,
              outerRadius: 160,
              startAngle: -180,
              endAngle: 180,
              cx: '40%',
              cy: '50%',
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              arcLabel: (item) =>
                `${((item.value / chartData.reduce((acc, d) => acc + d.value, 0)) * 100).toFixed(2)}%`,
            },
          ]}
        >
          <PieCenterLabel>ก๊าซเรือนกระจก</PieCenterLabel>
        </StyledPieChart>
      </Box>
    </Box>
  );
};

export default PieChartWithCenterLabel;
