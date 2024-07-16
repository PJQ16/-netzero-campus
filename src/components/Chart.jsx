import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  BarChart,
} from "@mui/x-charts";

const StackOffsetDemo = ({years,series}) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "auto", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      </Box>
      <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
        <BarChart
          height={500}
          series={series}
          xAxis={[{ scaleType: "band", data: years, title: "ปี" }]}
          yAxis={[{ title: "TCO₂e", label: "TCO₂e" }]}
          className="custom-bar-chart"
        />
      </Box>
    </Box>
  );
};

export default StackOffsetDemo;
