import React from 'react';
import Map from '../../components/Map';

function TabActivityInfo({ infos, latitude, setLatitude, longitude, setLongitude, setEmployee, setArea, handlerSubmitUpdate }) {
  return (
    <div>
      {infos.map((info, index) => (
        <div className="row" key={index}>
          <p className='h2'>ข้อมูลทั่วไป</p>
          <div className="col-md-12">
            <div className="card bg-light border-0 mb-3">
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
                          <div className="row">
                            <form>
                              <div className="row p-3">
                                <div className="col-md-12">
                                  <label  htmlFor="ชื่อ">ชื่อ</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={info.faculty.fac_name}
                                    readOnly
                                  />
                                </div>

                                <div className="col-md-12 mt-2">
                                  <label  htmlFor="จำนวนพนักงาน">จำนวนพนักงาน</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    defaultValue={info.employee_amount}
                                    onChange={(e) => setEmployee(e.target.value)}
                                  />
                                </div>

                                <div className="col-md-12 mt-2">
                                  <label htmlFor='พื้นที่ใช้สอย'>พื้นที่ใช้สอย</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    defaultValue={info.building_area}
                                    onChange={(e) => setArea(e.target.value)}
                                  />
                                </div>

                                <div className="col-md-12 mt-2">
                                  <label htmlFor='Latitude'>Latitude</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    disabled
                                    value={latitude}
                                  />
                                </div>

                                <div className="col-md-12 mt-2">
                                  <label htmlFor='Longitude'>Longitude</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    disabled
                                    value={longitude}
                                  />
                                </div>

                                <div className="col-md-12 mt-2">
                                  <label htmlFor='รูปแบบการคำนวณ'>รูปแบบการคำนวณ</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value='องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน)'
                                    disabled
                                  />
                                </div>

                                <div className="col-md-12 mt-2">
                                  <label htmlFor='ปีฐาน'>ปีฐาน</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    disabled
                                    value='2566'
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 ms-3">
                                <button 
                                  className="btn" 
                                  type="button" 
                                  onClick={(event) => handlerSubmitUpdate(event,info)} 
                                  style={{ backgroundColor: '#A969FE', color: '#ffffff' }}
                                >
                                  บันทึกข้อมูล
                                </button>
                              </div>
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
        </div>
      ))}
    </div>
  );
}

export default TabActivityInfo;
