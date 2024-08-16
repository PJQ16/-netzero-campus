import React, { createContext, useContext, useEffect, useState } from 'react'
import './pae/assets/css/demo/style.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import './pae/assets/vendors/css/vendor.bundle.base.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import axios from 'axios'
import config from '../config'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import Card from './Card'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import { PieChart } from "@mui/x-charts/PieChart";
import { YearContext } from '../App'

function Main() {
  const {dashboard,
    updatedTest,
    data1,
    data2,
    data3,
    totalValue1,
    totalValue2,
    totalValue3,
    totalValue4,
    dataRatio,
    selectedYear,
    approve } = useContext(YearContext)
  return (
    <div className="page-wrapper mdc-toolbar-fixed-adjust">

        <main className="content-wrapper">
            <div className="mdc-layout-grid">
              <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-4-tablet">
                  <div className="mdc-card info-card info-card--success">
                    <div className="card-inner">
                      <h5 className="card-title" style={{color: 'green', fontWeight: '800', fontSize: '24px'}}>จำนวนสถาบันที่เข้าร่วม</h5>
                      {dashboard.education.length > 0 ? (
                        dashboard.education.map((edu, index) => (
                          <h5 key={index} className="font-weight-light pb-2 mb-1 border-bottom" style={{ fontSize: '30px', fontWeight: '500' }}>
                            {edu.educational}
                          </h5>
                        ))
                      ) : (
                        <p>Loading....</p>
                      )}
                      <p className="tx-12 text-muted">จำนวนสถาบัน</p>
                        <div className="card-icon-wrapper">
                          <i className="material-icons">dvr</i>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-4-tablet">
                  <div className="mdc-card info-card info-card--danger">
                    <div className="card-inner">
                    <h5 className="card-title" style={{color: 'orangered', fontWeight: '800', fontSize: '24px'}}>จำนวนสถาบันที่รายงาน</h5>
                    {dashboard.report.length > 0 ? (
                                    dashboard.report.map((rp, index) => (
                    <h5 className="font-weight-light pb-2 mb-1 border-bottom" key={index} style={{fontSize: '30px', fontWeight: '500'}}>{parseInt(rp.report)}</h5>
                    ))
                    ) : (
                      <p>Loading....</p>
                    )}
                    <p className="tx-12 text-muted">จำนวนสถาบัน</p>
                      <div className="card-icon-wrapper">
                        <i className="fa fa-file-text mdc-drawer-item-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>

              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-4-tablet">
                <div className="mdc-card info-card info-card--info">
                  <div className="card-inner">
                    <h5 className="card-title" style={{color: 'rgb(0, 204, 204)', fontWeight: '800', fontSize: '24px'}}>การปล่อยก๊าซเรือนกระจกสะสม</h5>
                    {dashboard.total.length > 0 ? (
                                    dashboard.total.map((ghg, index) => (
                    <h5 className="font-weight-light pb-2 mb-1 border-bottom" key={index} style={{fontSize: '30px', fontWeight: '500'}}>{(parseInt(ghg.tCO2e)).toLocaleString()}</h5>
                    ))
                    ) : (
                      <p>Loading....</p>
                    )}
                    <p className="tx-12 text-muted">จำนวน tCO<sub>2</sub>e</p>
                      <div className="card-icon-wrapper">
                        <i className="fa fa-leaf mdc-drawer-item-icon"></i>
                      </div>
                  </div>
                </div>
              </div>

              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-9">
               <div className="mdc-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-2 mb-sm-0" style={{fontSize: '28px'}}>การปล่อยและการดูดกลับก๊าซเรือนกระจก ปี {selectedYear +543}</h6>
                  </div>
                  <div className="d-block d-sm-flex justify-content-between align-items-center">
                    <div className="mdc-tab-wrapper revenue-tab mdc-tab--secondary"> 
                      <div className="mdc-tab-bar" role="tablist">
                        <div className="mdc-tab-scroller">
                          <div className="mdc-tab-scroller__scroll-area">
                              <div className="mdc-tab-scroller__scroll-content">
                             
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-container mt-4">
                  <div className="row">
                                {updatedTest.map((item, index) => {
                                  const IconComponent = item.icon;
                                  const cardProps = {
                                    p: "2",
                                    col: 4,
                                    cols: 8,
                                    color: `${item.color}`,
                                    icon: (
                                      <IconComponent
                                        className="img-fluid rounded-start ms-2"
                                        style={{ fontSize: 100 }}
                                        sx={{ color: "white" }}
                                        key={index}
                                      />
                                    ),
                                    title: item.num,
                                    subTitle:item.title,
                                    body: `${(parseInt(
                                      item.tCO2e)
                                    ).toLocaleString()} tCO<sub>2</sub>e`,
                                  };

                                  if (item.num === "TOTAL EMISSION") {
                                    return (
                                      <div className="col-md-7" key={index}>
                                        <Card {...cardProps} />
                                      </div>
                                    );
                                  } else if (item.num === "GHG Removal") {
                                    return (
                                      <div className="col-md-5" key={index}>
                                        <Card {...cardProps} />
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div className="col-md-4" key={index}>
                                        <Card {...cardProps} />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                  </div>
               </div>
              </div>

                <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3 mdc-layout-grid__cell--span-8-tablet">
                  <div className="mdc-card">
                    <div className="d-flex d-lg-block d-xl-flex justify-content-between">
                      <h6 className="card-title">รายชื่อมหาวิทยาลัยที่รายงาน</h6>
                     
                    </div>
                    
                    <div className="chart-container mt-4">
                    <ul className="list-group">
                             
                    {approve.length > 0 ? (
                approve.map((approved, index) => (
                  <div key={index} className="text-decoration-none">
                    <li className="list-group-item d-flex justify-content-start align-items-center">
                      <p className="card-text ms-2">
                        <small className="text-body-secondary fw-bold">
                          {index + 1} {approved.fac_name}
                        </small>
                      </p>
                    </li>
                  </div>
                ))
              ) : (
                <p className='text-center'>No data available</p>
              )}
                             
                              </ul>

                    </div>
                  
                  </div>
                </div>
                <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6">
               <div className="mdc-card">
               <h6 className="card-title mb-2 mb-sm-0 text-center"> Scope 1</h6>
                    <small className='text-center'>การปล่อยก๊าซเรือนกระจกทางตรง</small>
                  <div className="d-block d-sm-flex justify-content-between align-items-center">
                    <div className="mdc-tab-wrapper revenue-tab mdc-tab--secondary"> 
                      <div className="mdc-tab-bar" role="tablist">
                        <div className="mdc-tab-scroller">
                          <div className="mdc-tab-scroller__scroll-area">
                              <div className="mdc-tab-scroller__scroll-content">
                             
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-container mt-4">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {data1.length > 0 ? (
                        <PieChart
                          series={[
                            {
                              innerRadius: 80,
                              outerRadius: 160,
                              cx: 150,
                              cy: 160,
                              data: data1,
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                              faded: {
                                innerRadius: 60,
                                additionalRadius: -60,
                                color: "gray",
                              },
                              arcLabel: (item) =>
                                `${(
                                  (parseInt(item.value) / totalValue1) *
                                  100
                                ).toFixed(0)}%`,
                                valueFormatter: (v) => {
                                  // ตรวจสอบว่า v เป็น object และเข้าถึงค่าที่ต้องการ
                                  if (typeof v === 'object' && v !== null) {
                                    return `${v.value} tCO₂e`;
                                  }
                                  // ใช้กรณีปกติ
                                  return `${v} tCO₂e`;
                                },
                            },
                          ]}
                          width={300}
                          height={800}
                          slotProps={{
                            legend: {
                              direction: "column",
                              position: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              padding:{ top: 220, bottom: 0, left: -50, right:100}
                            },
                          }}
                        />
                      ) : (
                        <p>No data available</p> // แสดงข้อความถ้าไม่มีข้อมูล
                      )}
                    </div>
                  </div>
               </div>
              </div>



              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6">
               <div className="mdc-card">
               <h6 className="card-title text-center">Scope 2</h6>
                    <small className='text-center'>การปล่อยก๊าซเรือนกระจกทางอ้อม</small>
                  <div className="d-block d-sm-flex justify-content-between align-items-center">
                    <div className="mdc-tab-wrapper revenue-tab mdc-tab--secondary"> 
                      <div className="mdc-tab-bar" role="tablist">
                        <div className="mdc-tab-scroller">
                          <div className="mdc-tab-scroller__scroll-area">
                              <div className="mdc-tab-scroller__scroll-content">
                             
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-container mt-4">
                  <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {data2.length > 0 ? (
                        <PieChart
                          series={[
                            {
                              innerRadius: 80,
                              outerRadius: 160,
                              cx: 150,
                              cy: 160,
                              data: data2,
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                              faded: {
                                innerRadius: 60,
                                additionalRadius: -60,
                                color: "gray",
                              },
                              arcLabel: (item) =>
                                `${(
                                  (parseInt(item.value) / totalValue2) *
                                  100
                                ).toFixed(0)}%`,
                                valueFormatter: (v) => {
                                  // ตรวจสอบว่า v เป็น object และเข้าถึงค่าที่ต้องการ
                                  if (typeof v === 'object' && v !== null) {
                                    return `${v.value} tCO₂e`;
                                  }
                                  // ใช้กรณีปกติ
                                  return `${v} tCO₂e`;
                                },
                            },
                          ]}
                          width={300}
                          height={450}
                          slotProps={{
                            legend: {
                              direction: "column",
                              position: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              padding:{ top: 320, bottom: 0, left: -50, right:100}
                            },
                          }}
                        />
                      ) : (
                        <p>No data available</p> // แสดงข้อความถ้าไม่มีข้อมูล
                      )}
                    </div>
                  </div>
               </div>
              </div>



              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6">
               <div className="mdc-card">
               <h6 className="card-title mb-2 mb-sm-0 text-center">Scope 3</h6>
                    <small className='text-center'>การปล่อยก๊าซเรือนกระจกทางอ้อม</small>
                  <div className="d-block d-sm-flex justify-content-between align-items-center">
                    <div className="mdc-tab-wrapper revenue-tab mdc-tab--secondary"> 
                      <div className="mdc-tab-bar" role="tablist">
                        <div className="mdc-tab-scroller">
                          <div className="mdc-tab-scroller__scroll-area">
                              <div className="mdc-tab-scroller__scroll-content">
                             
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-container mt-4">
                  <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
           {data3.length > 0 ? (
  <PieChart
    series={[
      {
        innerRadius: 80,
                              outerRadius: 160,
                              cx: 150,
                              cy: 160,
        data: data3,
        highlightScope: {
          faded: "global",
          highlighted: "item",
        },
        faded: {
          innerRadius: 60,
          additionalRadius: -60,
          color: "gray",
        },
        arcLabel: (item) => {
          // ตรวจสอบว่า totalValue3 มีค่าและไม่เป็น 0
          const percentage = totalValue3 && totalValue3 !== 0 
            ? (parseInt(item.value) / totalValue3) * 100 
            : 0; // กำหนดค่าเป็น 0 ถ้า totalValue3 เป็น 0 หรือ undefined
          return `${percentage.toFixed(0)}%`;
        },
        valueFormatter: (v) => {
          // ตรวจสอบว่า v เป็น object และเข้าถึงค่าที่ต้องการ
          if (typeof v === 'object' && v !== null) {
            return `${v.value} tCO₂e`;
          }
          // ใช้กรณีปกติ
          return `${v} tCO₂e`;
        },
      },
    ]}
    width={300}
    height={800}
    slotProps={{
      legend: {
        direction: "column",
        position: {
          vertical: "bottom",
          horizontal: "left",
        },
        padding:{ top: 320, bottom: 0, left: -50, right:100}
      },
    }}
  />
) : (
  <p>No data available</p> // แสดงข้อความถ้าไม่มีข้อมูล
)}

                    </div>
                  </div>
               </div>
              </div>



              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6">
               <div className="mdc-card">
               <h6 className="card-title mb-2 mb-sm-0 text-center">Scope Ratio</h6>
                    <small className='text-center'>สัดส่วนของประเภทการปล่อยก๊าซเรือนกระจก</small>
                  <div className="d-block d-sm-flex justify-content-between align-items-center">
                    <div className="mdc-tab-wrapper revenue-tab mdc-tab--secondary"> 
                      <div className="mdc-tab-bar" role="tablist">
                        <div className="mdc-tab-scroller">
                          <div className="mdc-tab-scroller__scroll-area">
                              <div className="mdc-tab-scroller__scroll-content">
                             
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-container mt-4">
                  <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {(dataRatio.length > 0) ? (
                        <PieChart
                          series={[
                            {
                              innerRadius: 80,
                              outerRadius: 160,
                              cx: 150,
                              cy: 160,
                              data: dataRatio,
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                              faded: {
                                innerRadius: 60,
                                additionalRadius: -60,
                                color: "gray",
                              },
                              arcLabel: (item) =>
                                `${(
                                  (parseInt(item.value) / totalValue4) *
                                  100
                                ).toFixed(0)}%`,
                                //เพิ่ม ข้างหลัง
                                valueFormatter: (v) => {
                                  // ตรวจสอบว่า v เป็น object และเข้าถึงค่าที่ต้องการ
                                  if (typeof v === 'object' && v !== null) {
                                    return `${v.value} tCO₂e`;
                                  }
                                  // ใช้กรณีปกติ
                                  return `${v} tCO₂e`;
                                },
                            },
                            
                          ]}
                          width={300}
                          height={500}
                          slotProps={{
                            legend: {
                              direction: "column",
                              position: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              padding:{ top: 320, bottom: 0, left: -50, right:100}
                            },
                          }}
                        />
                      ) : (
                        <p>No data available</p> // แสดงข้อความถ้าไม่มีข้อมูล
                      )}
                    </div>
                 
                  </div>
               </div>
              </div>


                
              </div>
            </div>
        </main>
    </div>
  
  )
}

export default Main