import React from 'react';
import Map from '../../components/Map';

function TabActivityInfo({  student, setStudent, campusReport,setCampusReport, totalArea, setTotalArea,infos, latitude, setLatitude, longitude, setLongitude, setEmployee, setArea, handlerSubmitUpdate }) {
  return (
    <div>
      {infos.map((info, index) => (
        <div className="row" key={index}>
          <p className='h2 '>ข้อมูลทั่วไป</p>
          <div className="col-md-12">
            <div className="card border-0 ">
              <div className="card-body">
                <div className="row px-2">
                  <div className="col-md-6">
                    <div className="card border-0">
                      <div className="card-body">
                        <Map
                          detail={`ชื่อ ${info.faculty.fac_name}`}
                          address={`ที่อยู่ ${info.faculty.address}`}
                          latitude={parseFloat(info.faculty.latitude)}
                          longitude={parseFloat(info.faculty.longitude)}
                          setLatitude={setLatitude}
                          setLongitude={setLongitude}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="col-md-12 mx-2">
                      <div className="card border-0 shadow">
                        <div className="card-body">

                        <form>
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                              <th className='text-start' colSpan={2}>กรุณากรอกข้อมูลทั่วไปของหน่วยงาน</th>
                              </tr>
                            </thead>
                            <tbody>
                           <tr>
                            <td className='text-start'>มหาวิทยาลัย/สถาบัน</td>
                            <td><input
                                    type="text"
                                    className="form-control"
                                    value={info.faculty.fac_name}
                                    readOnly
                                  /></td>
                           </tr>
                           <tr>
                            <td className='text-start'>วิทยาเขตที่รายงานข้อมูล</td>
                            <td><input
                                    type="text"
                                    className="form-control"
                                    defaultValue={info.campus_report}
                                    onChange={(e) => setCampusReport(e.target.value)}
                                  />
                            </td>
                           </tr>
                           <tr>
                            <td className='text-start'>จำนวนพนักงานประจำ (คน)</td>
                            <td><input
                                    type="number"
                                    className="form-control"
                                    defaultValue={info.employee_amount}
                                    onChange={(e) => setEmployee(e.target.value)}
                                  /></td>
                           </tr>
                           <tr>
                            <td className='text-start'>จำนวนนักศึกษา (คน)</td>
                            <td>
                            <input
                                    type="number"
                                    className="form-control"
                                    defaultValue={info.student_amount}
                                    onChange={(e) => setStudent(e.target.value)}
                                  />
                            </td>
                           </tr>
                           <tr>
                            <td className='text-start'>พื้นทั้งหมด (ตารางเมตร)</td>
                            <td><input
                                    type="number"
                                    className="form-control"
                                    defaultValue={info.total_area}
                                    onChange={(e) => setTotalArea(e.target.value)}
                                  /></td>
                           </tr>
                           <tr>
                            <td className='text-start'>พื้นที่อาคาร (ตารางเมตร)</td>
                            <td>
                            <input
                                    type="number"
                                    className="form-control"
                                    defaultValue={info.building_area}
                                    onChange={(e) => setArea(e.target.value)}
                                  />
                            </td>
                           </tr>
                           <tr>
                            <td className='text-start'>Latitude</td>
                            <td> <input
                                    type="number"
                                    className="form-control"
                                    disabled
                                    value={latitude}
                                  /></td>
                           </tr>
                           <tr>
                            <td className='text-start'>Longitude</td>
                            <td><input
                                    type="number"
                                    className="form-control"
                                    disabled
                                    value={longitude}
                                  /></td>
                           </tr>
                           <tr>
                            <td className='text-start'>รูปแบบการคำนวณ</td>
                            <td><input
                                    type="text"
                                    className="form-control"
                                    value='องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน)'
                                    disabled
                                  /></td>
                           </tr>
                           <tr>
                            <td className='text-start'>ปีฐาน</td>
                            <td> <input
                                    type="number"
                                    className="form-control"
                                    disabled
                                    value='2566'
                                  /></td>
                           </tr>

                            </tbody>
                          </table>
                          <button 
                                  className="btn" 
                                  type="button" 
                                  onClick={(event) => handlerSubmitUpdate(event,info)} 
                                  style={{ backgroundColor: '#A969FE', color: '#ffffff' }}
                                >
                                  บันทึกข้อมูล
                                </button>
                                </form>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TabActivityInfo;
