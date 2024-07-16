import React from 'react'
import StackChart from '../components/BarChart'

export default function Cover() {
  return (
    <div className="d-flex bg-light flex-column justify-content-start vh-100">
        <div className="align-items-center">        
            <div className="container">
                <div className="row" style={{marginTop:'150px'}}>
                
                <div className="col-md-3">
                    <div className="card shadow">
                        <div className="card-body">
                            จำนวนสถาบันศึกษา
                        </div>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                          จำนวนบุคลากร
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                       <p>รวมการปล่อยก๊าซเรือนกระจก ทั้งมหาวิทยาลัยฯ</p>
                       <p>1 ม.ค. 2567 - 24 มิ.ย. 2567 </p>
                       <p>(TonCO2-eq)</p>

                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow">
                        <div className="card-body">
                            
                        </div>
                    </div>
                </div>

                </div>
            </div>



            <div className="container">
                <div className="row mt-5">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-body">
                            xx
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    </div>
  )
}
