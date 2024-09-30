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
  height: '100%',
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
    'ขอบเขตที่ 1 การปล่อยก๊าซเรือนกระจกทางตรง :': '#26E59C',
    'ขอบเขตที่ 2 การปล่อยก๊าซเรือนกระจกทางอ้อม :': '#357266',
    'ขอบเขตที่ 3 การปล่อยก๊าซเรือนกระจกทางอ้อม :': '#A3BBAD',
    'Biogenic Carbon': '#65532F',
    'Removal': '#312509',
  };

  // คำนวณผลรวมของขอบเขต 1 และ 2
  const totalScope1And2 = scopeData.reduce((acc, item) => {
    if (item.name === 'ขอบเขตที่ 1 การปล่อยก๊าซเรือนกระจกทางตรง :' || 
        item.name === 'ขอบเขตที่ 2 การปล่อยก๊าซเรือนกระจกทางอ้อม :') {
      return acc + parseFloat(item.tco2e);
    }
    return acc;
  }, 0);

  // คำนวณผลรวมของขอบเขต 1, 2 และ 3
  const totalScope1And2And3 = scopeData.reduce((acc, item) => {
    if (item.name === 'ขอบเขตที่ 1 การปล่อยก๊าซเรือนกระจกทางตรง :' || 
        item.name === 'ขอบเขตที่ 2 การปล่อยก๊าซเรือนกระจกทางอ้อม :' || 
        item.name === 'ขอบเขตที่ 3 การปล่อยก๊าซเรือนกระจกทางอ้อม :') {
      return acc + parseFloat(item.tco2e);
    }
    return acc;
  }, 0);

  return (
    <div>
      <div className="row">
        <p className="h2 ms-3">สรุปผลการคำนวณ</p>
        
        <div className="col-md-5 m-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <div style={{ height: '600px' }}> {/* กำหนด height สำหรับคอนเทนเนอร์ */}
              <StyledPieChart
  margin={{ top: 70, bottom: 70, left: 70, right: 70 }}
  slotProps={{
    legend: {
      direction: 'column',
      position: { vertical: 'bottom', horizontal: 'left' },
      padding: { top: 0, bottom: 0, left: 0, right: 0 }
    },
  }}
  series={[
    {
      data: scopeData
        .filter(item => 
          item.name === 'ขอบเขตที่ 1 การปล่อยก๊าซเรือนกระจกทางตรง :' || 
          item.name === 'ขอบเขตที่ 2 การปล่อยก๊าซเรือนกระจกทางอ้อม :' || 
          item.name === 'ขอบเขตที่ 3 การปล่อยก๊าซเรือนกระจกทางอ้อม :'
        )
        .map(item => ({
          id: item.id,
          value: parseFloat(item.tco2e),
          label: item.name,
          color: colors[item.name] || 'gray',
        })),
      arcLabel: (item) => {
        // คำนวณหาผลรวมของขอบเขตที่ 1, 2 และ 3
        const totalValue = scopeData
          .filter(item => 
            item.name === 'ขอบเขตที่ 1 การปล่อยก๊าซเรือนกระจกทางตรง :' || 
            item.name === 'ขอบเขตที่ 2 การปล่อยก๊าซเรือนกระจกทางอ้อม :' || 
            item.name === 'ขอบเขตที่ 3 การปล่อยก๊าซเรือนกระจกทางอ้อม :'
          )
          .reduce((acc, curr) => acc + parseFloat(curr.tco2e), 0);

        // คำนวณสัดส่วนของแต่ละ item
        const percentage = (parseFloat(item.value) / totalValue) * 100;

        // ตรวจสอบว่าสัดส่วนเป็น NaN หรือไม่
        return isNaN(percentage) ? '' : `${percentage.toFixed(2)}%`;
      },
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 40, additionalRadius: -40, color: 'gray' },
      innerRadius: 120,
      outerRadius: 200,
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
                      <th className="text-center">การปล่อยก๊าซเรือนกระจก (tCO<sub>2</sub>e)</th>
                      <th className="text-center">สัดส่วนเมื่อเทียบขอบเขต 1 และ 2</th>
                      <th className="text-center">สัดส่วนเมื่อเทียบขอบเขต 1, 2 และ 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scopeData.map((item, index) => {
                      if (item.name === 'ภาคการดูดกลับ (GHG Removal)') {
                        return null; // ไม่แสดง GHG Removal
                      }

                      const tco2e = parseFloat(item.tco2e);

                      // คำนวณสัดส่วนเมื่อเทียบกับขอบเขต 1 และ 2
                      const percentageScope1And2 = 
                        (item.name === 'ขอบเขตที่ 1 การปล่อยก๊าซเรือนกระจกทางตรง :' || 
                        item.name === 'ขอบเขตที่ 2 การปล่อยก๊าซเรือนกระจกทางอ้อม :') && totalScope1And2 > 0
                          ? ((tco2e / totalScope1And2) * 100).toFixed(2)
                          : '0.00';

                      // คำนวณสัดส่วนเมื่อเทียบกับขอบเขต 1, 2 และ 3
                      const percentageScope1And2And3 = 
                        (item.name === 'ขอบเขตที่ 1 การปล่อยก๊าซเรือนกระจกทางตรง :' || 
                        item.name === 'ขอบเขตที่ 2 การปล่อยก๊าซเรือนกระจกทางอ้อม :' || 
                        item.name === 'ขอบเขตที่ 3 การปล่อยก๊าซเรือนกระจกทางอ้อม :') && totalScope1And2And3 > 0
                          ? ((tco2e / totalScope1And2And3) * 100).toFixed(2)
                          : '0.00';

                      return (
                        <tr className="text-center" key={index}>
                          <td className="text-start">
                            {item.name === 'รายงานแยก :' ?(<>อื่น {`(${item.name})`}</>) :(<>{item.name}</>)}
                          </td>
                          <td>
                            {tco2e.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td>
                            {percentageScope1And2}%
                          </td>
                          <td>
                            {percentageScope1And2And3}%
                          </td>
                        </tr>
                      );
                    })}

                    <tr className="text-center">
                      <td className="text-start">รวมขอบเขต 1 & 2</td>
                      <td>
                        {totalScope1And2.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td>100%</td>
                      <td>-</td>
                    </tr>

                    <tr className="text-center">
                      <td className="text-start">รวมขอบเขต 1 & 2 & 3</td>
                      <td>
                        {totalScope1And2And3.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td>-</td>
                      <td>100%</td>
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
