import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
  marginLeft: 10,
  whiteSpace: 'pre-wrap',
}));

const StyledPieChart = styled(PieChart)(({ theme }) => ({
  width: '100%',
  height: '100%', // เปลี่ยน height เป็น 100% เพื่อให้กราฟใช้ขนาดจากคอนเทนเนอร์ที่ห่อหุ้ม
  [theme.breakpoints.up('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function TabActivitySummary({ scopeData, percentages, years }) {
  const colors = {
    'ขอบเขตที่ 1: การปล่อยก๊าซเรือนกระจกทางตรง': '#26E59C',
    'ขอบเขตที่ 2: การปล่อยก๊าซเรือนกระจกทางอ้อม': '#357266',
    'ขอบเขตที่ 3: การปล่อยก๊าซเรือนกระจกทางอ้อม': '#A3BBAD',
    'Biogenic Carbon': '#65532F',
    'Removal': '#312509',
  };

  return (
    <div>
      <div className="row">
        <p className="h2 ms-3">สรุปผลการคำนวณ</p>
        
        <div className="col-md-5 m-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <div style={{ height: '600px' }}> {/* กำหนด height สำหรับคอนเทนเนอร์ */}
              <StyledPieChart
  margin={{ top: 70, bottom: 70, left: 70, right: 70 }} // ปรับ margin ให้มากขึ้น
  slotProps={{
    legend: {
      direction: 'column',
      position: { vertical: 'bottom', horizontal: 'left' },
      padding:{ top: 0, bottom: 0, left: 0, right: 0 }
    },
  }}
  series={[
    {
      data: scopeData
        .filter(item => 
          item.name === 'ขอบเขตที่ 1: การปล่อยก๊าซเรือนกระจกทางตรง' || 
          item.name === 'ขอบเขตที่ 2: การปล่อยก๊าซเรือนกระจกทางอ้อม' || 
          item.name === 'ขอบเขตที่ 3: การปล่อยก๊าซเรือนกระจกทางอ้อม'
        )
        .map(item => ({
          id: item.id,
          value: parseFloat(item.tco2e),
          label: item.name,
          color: colors[item.name] || 'gray',
        })),
      arcLabel: (item) => {
        const percentage = percentages.find((p) => p.label === item.label)?.percentage;
        if (parseFloat(percentage) === 0) {
          return '';
        }
        return isNaN(parseFloat(percentage)) ? '' : `${percentage}%`;
      },
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 40, additionalRadius: -40, color: 'gray' }, // ขยายขนาดของ faded area
      innerRadius: 120, // ขยายขนาดของ innerRadius
      outerRadius: 200, // ขยายขนาดของ outerRadius
      paddingAngle: 3,
      cornerRadius: 10,
      endAngle: 360,
    },
  ]}
>
  <PieCenterLabel>ผลการคำนวณ ปี {years}</PieCenterLabel>
</StyledPieChart>

              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 m-3">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr >
                      <th className="text-center">ขอบเขต</th>
                      <th className="text-center">Greenhouse Gas Emissions (tCO<sub>2</sub>e)</th>
                      <th className="text-center">Ratio Scope 1 and 2</th>
                      <th className="text-center">Ratio Scope 1 and 2 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scopeData.map((item, index) => (
                      <tr className="text-center" key={index}>
                        <td className="text-start">{item.name}</td>
                        <td>{parseFloat(item.tco2e).toLocaleString('en-US', {minimumFractionDigits: 2 })}</td>
                        <td>
                          {item.name === 'scope1' || item.name === 'scope2'
                            ? (
                                isNaN(percentages.find((p) => p.label === item.name)?.percentage)
                                  ? '0.00'
                                  : percentages.find((p) => p.label === item.name)?.percentage
                              ) || '0.00'
                            : '-'}
                        </td>
                        <td>
                          {(isNaN(percentages.find((p) => p.label === item.name)?.percentage)
                            ? '0.00'
                            : percentages.find((p) => p.label === item.name)?.percentage) || '0.00'}
                        </td>
                      </tr>
                    ))}
                    <tr className="text-center">
                      <td className="text-start">ผลรวม Scope 1 & 2</td>
                      <td>
                        {scopeData
                          .reduce((acc, item) => {
                            if (item.name === 'ขอบเขตที่ 1: การปล่อยและดูดกลับก๊าซเรือนกระจกทางตรง' || item.name === 'ขอบเขตที่ 2: การปล่อยก๊าซเรือนกระจกทางอ้อม') {
                              return acc + parseFloat(item.tco2e);
                            }
                            return acc;
                          }, 0)
                          .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td>100</td>
                      <td>-</td>
                    </tr>
                    <tr className="text-center">
                      <td className="text-start">ผลรวม Scope 1 & 2 & 3</td>
                      <td>
                        {scopeData.reduce((acc, item) => acc + parseFloat(item.tco2e), 0)
                          .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td>-</td>
                      <td>100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
