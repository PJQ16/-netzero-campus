import React from "react";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import BackupTableIcon from '@mui/icons-material/BackupTable';

export default function TabSignificance() {
  const data = [

    {
      datacate:'Fuel and Energy Related Activity Not Included in Scope 1 & 2',
      ghg:30
    },
    {
      datacate:'Upstream transportation and distribution',
      ghg:70
    }
  ]
  const level = [
    {
      id:1,
      score:'1-6',
      text:'มีความไม่แน่นอนสูง คุณภาพของข้อมูลไม่มีคุณภาพ'
    },
    {
      id:2,
      score:'7-12',
      text:'มีความไม่แน่นอนเล็กน้อย คุณภาพของข้อมูลปานกลาง'
    },
    {
      id:3,
      score:'13-18',
      text:'มีความไม่แน่นอนต่ำ คุณภาพของข้อมูลดีค่อนข้างดี'
    },
    {
      id:4,
      score:'19-24',
      text:'มีความไม่แน่นอนต่ำ คุณภาพของข้อมูลดีเยี่ยม'
    },

  ]
  const value = 20;
  return (

      <div className="algin-items-start">
      <p className="h3 mt-3">การประเมินความไม่แน่นอน</p>
      <p className="h6"><BackupTableIcon/> ความไม่แน่นอนที่เกิดขึ้นกับข้อมูล และค่าการปล่อยก๊าซเรือนกระจกที่เลือกใช้ สามารถตรวจสอบคุณภาพของข้อมูลได้ โดยการกำหนดคะแนนไว้ตามตาราง</p>
      <div className="row">
        <div className="col-md-8">
        <div className="table-responsive">
        <table className="table  table-striped table-bordered">
          <thead>
          <tr  className="text-center">
            <th>ประเภทของกิจกรรม</th>
            <th>รายการ</th>
            <th>หน่วย</th>
            <th>คะแนนการเก็บข้อมูล (A)	</th>
            <th>ค่าEF (B) ผลการประเมิน	</th>
            <th>(A x B) ระดับคุณภาพ	</th>
            <th>คุณภาพข้อมูล</th>
          </tr>
          </thead>
         
          <tbody>
       
             <tr className="text-center">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
          </tbody>
        
          <tfoot>
          <tr  className="text-center">
          <th>ประเภทของกิจกรรม</th>
            <th>รายการ</th>
            <th>หน่วย</th>
            <th>คะแนนการเก็บข้อมูล (A)	</th>
            <th>ค่าEF (B) ผลการประเมิน	</th>
            <th>(A x B) ระดับคุณภาพ	</th>
            <th>คุณภาพข้อมูล</th>
            </tr>
          </tfoot>
        </table>
        </div>
        </div>

        <div className="col-md-4">
        <div className="table-responsive">
          <p><CreditScoreIcon/> ตารางแสดงระดับคะแนนอ้างอิงของคุณภาพข้อมูลที่ใช้ในการศึกษา การประเมินและการจัดการความไม่แน่น</p>
        <table className="table  table-striped table-bordered">
          <thead>
          <tr  className="text-center">
            <th>รายการ</th>
            <th colSpan={4}>ระดับคุณภาพ</th>
          </tr>
          </thead>
         
          <tbody>
             <tr className="text-center">
                <td rowSpan={2}>ข้อมูลกิจกรรม</td>
                <td>X = 6 Points</td>
                <td colSpan={2}>Y = 3 Points</td>
                <td>Z = 1 Points</td>
            </tr>
            <tr className="text-center">
                <td>เก็บข้อมูลอย่างต่อเนื่อง</td>
                <td colSpan={2}>เก็บข้อมูลจากมิเตอร์และใบเสร็จ</td>
                <td>เก็บข้อมูลจากการประมาณค่า</td>
            </tr>
            <tr className="text-center">
                <td rowSpan={2}>Emission Factors</td>
                <td>C = 4 Points</td>
                <td>D = 3 Points</td>
                <td>E = 2 Points</td>
                <td>F = 1 Points</td>
            </tr>
            <tr className="text-center">
                <td>EF จากการวัดที่มีคุณภาพ</td>
                <td>EF จากผู้ผลิต หรือ EF ระดับประเทศ</td>
                <td>EF ระดับภูมิภาค	</td>
                <td>EF ระดับสากล</td>
            </tr>
          </tbody>
        </table>
        </div>

        <div className="d-flex justify-centent-end">
        <div className="table-responsive">
          <p><CreditScoreIcon/> ตารางกำหนดระดับคะแนนและเกณฑ์ที่ใช้ประเมินความไม่แน่นอน</p>
        <table className="table  table-striped table-bordered">
          <thead>
          <tr  className="text-center">
            <th>ระดับ</th>
            <th>ระดับคะแนนโดยรวมข้อมูล</th>
            <th>คำอธิบาย</th>
          </tr>
          </thead>
         
          <tbody>
       {level.map((item) => (
             <tr className="text-center" key={item.id}>
                <td>{item.id}</td>
                <td>{item.score}</td>
                <td>{item.text}</td>
            </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>


    

      </div>
      </div>
      </div>
  );
}
