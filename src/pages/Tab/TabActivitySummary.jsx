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
    width: '50%',
  },
  [theme.breakpoints.up('md')]: {
    width: '40%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '30%',
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
    'ขอบเขตที่ 1: การปล่อยและดูดกลับก๊าซเรือนกระจกทางตรง': '#26E59C',
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
                  margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'bottom', horizontal: 'left' },
                      padding: 0,
                    },
                  }}
                  series={[
                    {
                      data: scopeData.map((item) => ({
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
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      innerRadius: 100,
                      outerRadius: 180,
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
        <div className="col-md-5 m-3">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr className="text-center">
                      <th>ขอบเขต</th>
                      <th>Greenhouse Gas Emissions (tCO<sub>2</sub>e)</th>
                      <th>Ratio Scope 1 and 2</th>
                      <th>Ratio Scope 1 and 2 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scopeData.map((item, index) => (
                      <tr className="text-center" key={index}>
                        <td>{item.name}</td>
                        <td>{parseFloat(item.tco2e).toFixed(2)}</td>
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
                      <td>ผลรวม Scope 1 & 2</td>
                      <td>
                        {scopeData
                          .reduce((acc, item) => {
                            if (item.name !== 'scope3') {
                              return acc + parseFloat(item.tco2e);
                            }
                            return acc;
                          }, 0)
                          .toFixed(2)}
                      </td>
                      <td>100</td>
                      <td>-</td>
                    </tr>
                    <tr className="text-center">
                      <td>ผลรวม Scope 1 & 2 & 3</td>
                      <td>{scopeData.reduce((acc, item) => acc + parseFloat(item.tco2e), 0).toFixed(2)}</td>
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
