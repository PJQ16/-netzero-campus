import React from "react";

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

  const value = 20;
  return (
    <div className="d-flex justify-content-center">
      <div className="algin-items-center">
      <p className="h3">การประเมินนัยสำคัญ</p>
      <div className="table-responsive">
        <table className="table  table-striped table-bordered">
          <thead>
          <tr  className="text-center">
            <th>ลำดับ</th>
            <th>รูปแบบการเก็บข้อมูล</th>
            <th>%ก๊าซเรือนกระจก ขอบเขตที่3</th>
            <th>Magnitude</th>
            <th>Level of influence (Reduction potential)</th>
            <th>Opportunity or Risk</th>
            <th>Sector Guidance</th>
            <th>Total</th>
            <th>Significance</th>
          </tr>
          </thead>
         
          <tbody>
          {data.map((item,index) => (
             <tr className="text-center">
              <td>{index +1}</td>
              <td>{item.datacate}</td>
              <td>{item.ghg}</td>
              <td>
                <select className="form-control">
                  <option value="">เลือกระดับนัยสำคัญ</option>
                  <option value="">ต่ำ</option>
                  <option value="">กลาง</option>
                  <option value="">สูง</option>
                </select>
              </td>
              <td>
              <select className="form-control">
                  <option value="">เลือกระดับนัยสำคัญ</option>
                  <option value="">ต่ำ</option>
                  <option value="">กลาง</option>
                  <option value="">สูง</option>
                </select>
              </td>
              <td>
              <select className="form-control">
                  <option value="">เลือกระดับนัยสำคัญ</option>
                  <option value="">ต่ำ</option>
                  <option value="">กลาง</option>
                  <option value="">สูง</option>
                </select>
              </td>
              <td>
              <select className="form-control">
                  <option value="">เลือก</option>
                  <option value="">ใช่</option>
                  <option value="">ไม่</option>
                </select>
              </td>
              <td>{value}</td>
              <td>
              <select className="form-control">
                  <option value="">เลือก</option>
                  <option value="">นัยสำคัญ</option>
                  <option value="">ไม่นัยสำคัญ</option>
                </select>
              </td>
            </tr>
              ))}
          </tbody>
        
          <tfoot>
          <tr  className="text-center">
            <th>ลำดับ</th>
            <th>รูปแบบการเก็บข้อมูล</th>
            <th>%ก๊าซเรือนกระจก ขอบเขตที่3</th>
            <th>Magnitude</th>
            <th>Level of influence (Reduction potential)</th>
            <th>Opportunity or Risk</th>
            <th>Sector Guidance</th>
            <th>Total</th>
            <th>Significance</th>
            </tr>
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
}
