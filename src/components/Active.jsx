import React, { createContext, useContext, useEffect, useState } from 'react'
import './pae/assets/css/demo/style.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import './pae/assets/vendors/css/vendor.bundle.base.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import Card from './Card'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import { PieChart } from "@mui/x-charts/PieChart";
import { ActiveDSBContext } from '../pages/ActiveDashboard'

function Active() {
  const {dashboard,
    updatedTest,
    ranking,
    handleModal,
    data1,
    data2,
    data3,
    totalValue1,
    totalValue2,
    totalValue3,
    totalValue4,
    dataRatio,
    modalContent,
    selectedYear,
    groupedData } = useContext(ActiveDSBContext)
  return (
    <div className="page-wrapper mdc-toolbar-fixed-adjust">

        <main className="content-wrapper">
            <div className="mdc-layout-grid">
              <div className="mdc-layout-grid__inner">
               

                <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-6-tablet">
                  <div className="mdc-card info-card info-card--danger">
                    <div className="card-inner">
                    <h5 className="card-title" style={{color: 'orangered', fontWeight: '800', fontSize: '18px'}}>จำนวนที่รายงาน</h5>
                    {dashboard.report.length > 0 ? (
                                    dashboard.report.map((rp, index) => (
                    <h5 className="font-weight-light pb-2 mb-1 border-bottom" key={index} style={{fontSize: '30px', fontWeight: '500'}}>{rp.report}</h5>
                    ))
                    ) : (
                      <p>Loading....</p>
                    )}
                    <p className="tx-12 text-muted">จำนวนรายงาน</p>
                      <div className="card-icon-wrapper">
                        <i className="fa fa-file-text mdc-drawer-item-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>

              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-6-tablet">
                <div className="mdc-card info-card info-card--info">
                  <div className="card-inner">
                    <h5 className="card-title" style={{color: 'rgb(0, 204, 204)', fontWeight: '800', fontSize: '13px'}}>การปล่อยก๊าซเรือนกระจกสะสม</h5>
                    {dashboard.total.length > 0 ? (
                                    dashboard.total.map((ghg, index) => (
                    <h5 className="font-weight-light pb-2 mb-1 border-bottom"  key={index}  style={{fontSize: '30px', fontWeight: '500'}}>{parseInt(ghg.tCO2e).toLocaleString()}</h5>
                    ))
                    ) : (
                      <p>Loading....</p>
                    )}
                    <p className="tx-12 text-muted">รวมจำนวน TCO<sub>2</sub>e</p>
                      <div className="card-icon-wrapper">
                        <i className="fa fa-leaf mdc-drawer-item-icon"></i>
                      </div>
                  </div>
                </div>
              </div>

              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-9">
               <div className="mdc-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-2 mb-sm-0">การปล่อยก๊าซเรือนกระจกและดูดกลับ {selectedYear +543}</h6>
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
                                    body: `${parseInt(
                                      item.tCO2e
                                    ).toLocaleString()} tCO2e`,
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
                      <h6 className="card-title">รูปแบบการจัดเก็บข้อมูล ปี {selectedYear+543}</h6>
                    </div>

                    <div className="chart-container mt-4">
                    <ul className="list-group">
                                {ranking.map((rank, index) => (
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    key={index}
                                    onClick={() => handleModal(rank, index)}
                                    className="text-decoration-none"
                                  >
                                    <li className="list-group-item d-flex justify-content-start align-items-center">
                                      <span
                                        className={`badge text-bg-${rank.bg} rounded-pill`}
                                      >
                                        {index + 1}
                                      </span>
                                      <p className="card-text ms-2">
                                        <small className="text-body-secondary fw-2">
                                          {rank.eg}
                                        </small>
                                      </p>
                                    </li>
                                  </Link>
                                ))}
                              </ul>

                    </div>
                  </div>
                </div>
                <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3">
               <div className="mdc-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-2 mb-sm-0 text-center"> Scope 1</h6>
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
                              innerRadius: 40,
                              outerRadius: 100,
                              cx: 150,
                              cy: 100,
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
                            },
                          ]}
                          width={300}
                          height={600}
                          slotProps={{
                            legend: {
                              direction: "column",
                              position: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              padding: 10,
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



              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3">
               <div className="mdc-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-2 mb-sm-0">Scope 2</h6>
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
                              innerRadius: 40,
                              outerRadius: 100,
                              cx: 150,
                              cy: 100,
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
                            },
                          ]}
                          width={300}
                          height={600}
                          slotProps={{
                            legend: {
                              direction: "column",
                              position: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              padding: 10,
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



              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3">
               <div className="mdc-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-2 mb-sm-0">Scope 3</h6>
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
                              innerRadius: 40,
                              outerRadius: 100,
                              cx: 150,
                              cy: 100,
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
                              arcLabel: (item) =>
                                `${(
                                  (parseInt(item.value) / totalValue3) *
                                  100
                                ).toFixed(0)}%`,
                            },
                          ]}
                          width={300}
                          height={600}
                          slotProps={{
                            legend: {
                              direction: "column",
                              position: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              padding: 10,
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



              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3">
               <div className="mdc-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-2 mb-sm-0">Scope Ratio</h6>
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
                              innerRadius: 40,
                              outerRadius: 100,
                              cx: 150,
                              cy: 100,
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
                            },
                          ]}
                          width={300}
                          height={600}
                          slotProps={{
                            legend: {
                              direction: "column",
                              position: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              padding: 10,
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



        <Modal id="exampleModal" title={modalContent.body}>
        <p className="fw-bold h-4 ">ปี: {selectedYear + 543}</p>
        <table className="table table-hover w-100 p-4">
          <thead>
            <tr>
              <th className='text-start'>รูปแบบการจัดเก็บข้อมูล</th>
              <th className='text-start'>จำนวน</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.map(
              (item, index) =>
                modalContent.body === item.name && (
                  <tr key={index}>
                    <td className='text-start'>{`${item.head_name}`}</td>
                    <td className='text-start'> {item.count}</td>
                  </tr>
                )
            )}
          </tbody>
          <tfoot>
            <tr>
              <th className='text-start'>รูปแบบการจัดเก็บข้อมูล</th>
              <th className='text-start'>จำนวน</th>
            </tr>
          </tfoot>
        </table>
      </Modal>
    </div>
  
  )
}

export default Active