import React, { createContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Co2Icon from "@mui/icons-material/Co2";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SpaIcon from "@mui/icons-material/Spa";
import "bootstrap/dist/css/bootstrap.min.css";
import DescriptionIcon from "@mui/icons-material/Description";
import SchoolIcon from "@mui/icons-material/School";
import FactoryIcon from "@mui/icons-material/Factory";
import BoltIcon from "@mui/icons-material/Bolt";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";

export const YearContext = createContext();

export default function Dashboard() {
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [dashboard, setDashboard] = useState({ education:[],report:[], total:[], totalYear:[], listHead:[],scope1:[],scope2:[],scope3:[] });
  const [listYear, setListYear] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [groupedData, setGroupedData] = useState([]);

  const fetchDataApi = async (year) => {
    try {
      const res = await axios.get(`${config.urlApi}/activity/showPeriod?year=${year}`);
      setListYear(res.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
      });
    }
  };

  useEffect(() => {
    fetchDataApi(selectedYear);
  }, [selectedYear]);

  

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(config.urlApi + '/dataDashboard');
      setDashboard(res.data.result);
    } catch (e) {
      toast.error(`${e.message} เกิดข้อผิดพลาด`);
    }
  };

  const test = [
    { num: "TOTAL EMISSION", color: "#E12A2A", icon: Co2Icon,tCO2e:0},
    { num: "Carbon Reducetion", color: "#F0AE15", icon: SolarPowerIcon,tCO2e:0},
    { num: "GHG Removal", color: "#1C9316", icon: SpaIcon,tCO2e:0 },
    { num: "Scope 1", color: "#1C87D7", icon: LocalGasStationIcon,tCO2e:0 },
    { num: "Scope 2", color: "#2752D1", icon: BoltIcon,tCO2e:0},
    { num: "Scope 3", color: "#754ABF", icon: FlightLandIcon,tCO2e:0 },
  ];

  const ranking = [
    {
      eg: "Scope 1",
      bg: "warning",
    },
    {
      eg: "Scope 2",
      bg: "primary",
    },
    {
      eg: "Scope 3",
      bg: "info",
    },
    {
      eg: "GHG Removal",
      bg: "success",
    },
  ];

  const color  = [
    '#C8DEB9','#A6CEAA','#6BAB90','#55917F','#5A6F6D'
  ];
  
  const data1 = Array.isArray(dashboard.scope1) ? dashboard.scope1.map((scope, index) => ({
    id: index + 1,
    value: parseFloat(scope.tCO2e).toFixed(0),
    label: scope.head_name,
    color:color[index % 5],
  })) : [];
  
  const data2 = Array.isArray(dashboard.scope2) ? dashboard.scope2.map((scope, index) => ({
    id: index + 1,
    value: parseFloat(scope.tCO2e).toFixed(0),
    label: scope.head_name,
    color: color[4],
  })) : [];
  
  const data3 = Array.isArray(dashboard.scope3) ? dashboard.scope3.map((scope, index) => ({
    id: index + 1,
    value: parseInt(scope.tCO2e).toLocaleString(),
    label: scope.head_name,
    color: color[index % 5],
  })) : [];

  const sumValues = (data) => {
    return data.reduce((acc, scope) => {
      const value = parseInt(scope.tCO2e) || 0;
      return acc + value;
    }, 0);
  };
  
  // รวมค่า tCO2e สำหรับแต่ละ scope
  const totalScope1 = sumValues(dashboard.scope1);
  const totalScope2 = sumValues(dashboard.scope2);
  const totalScope3 = sumValues(dashboard.scope3);
  
  // สร้าง dataRatio
  const dataRatio = [
    {
      label: "Scope 1",
      value: totalScope1,
      color: color[0], // เปลี่ยนสีตามต้องการ
    },
    {
      label: "Scope 2",
      value: totalScope2,
      color: color[1], // เปลี่ยนสีตามต้องการ
    },
    {
      label: "Scope 3",
      value: totalScope3,
      color: color[2], // เปลี่ยนสีตามต้องการ
    },
  ];
  

  const handleModal = (rankId, index) => {
    setModalContent({
      title: `อันดับ ${index + 1}`,
      body: `${rankId.eg}`,
    });
    toast.info('แสดงข้อมูลสำเร็จ', {
      autoClose: 600,
    });
  };

  // Calculate total emission
const totalEmission = dashboard.totalYear.reduce((acc, curr) => acc + parseFloat(curr.tCO2e), 0);

// Update tCO2e in the original test array
const updatedTest = test.map(item => {
    const apiData = dashboard.totalYear ? dashboard.totalYear.find(data => data.name === item.num) : null;
    return { ...item, tCO2e: apiData ? parseFloat(apiData.tCO2e) : 0 };
});

// Find and update the TOTAL EMISSION item in the updatedTest array
const totalEmissionIndex = updatedTest.findIndex(item => item.num === "TOTAL EMISSION");
if (totalEmissionIndex !== -1) {
    updatedTest[totalEmissionIndex].tCO2e = totalEmission;
}

useEffect(() => {
  // จัดกลุ่มและนับจำนวนข้อมูลจาก listHead โดยใช้ id
  const groupData = dashboard.listHead.reduce((acc, item) => {
      // เช็คว่า id นี้มีอยู่ใน accumulator หรือไม่
      if (!acc[item.id]) {
          acc[item.id] = {
              id: item.id,
              head_name: item.head_name,
              name: item.name, // เก็บ name ลงใน accumulator
              count: 0 // ตั้งค่าเริ่มต้นสำหรับ count
          };
      }
      acc[item.id].count++; // เพิ่มจำนวน
      return acc; // ส่งคืน accumulator
  }, {});

  // แปลงเป็นรูปแบบที่ง่ายต่อการแสดงผล
  const groupedArray = Object.values(groupData); // ใช้ Object.values เพื่อแปลงเป็นอาร์เรย์

  // จัดเรียงข้อมูลตาม id
  groupedArray.sort((a, b) => a.id - b.id);

  setGroupedData(groupedArray); // ตั้งค่าข้อมูลที่จัดกลุ่มให้กับ state
}, [dashboard.listHead]);

const totalValue1 = data1.reduce((acc, item) => acc + parseInt(item.value), 0);
const totalValue2 = data2.reduce((acc, item) => acc + parseInt(item.value), 0);
const totalValue3 = data3.reduce((acc, item) => acc + parseInt(item.value), 0);
const totalValue4 = dataRatio.reduce((acc, item) => acc + parseInt(item.value), 0);


  return (
    <YearContext.Provider value={{ listYear, setListYear, searchTerm, setSearchTerm, selectedYear, setSelectedYear }}>
      <Navbar />
      <ToastContainer />
      <div className="d-flex flex-wrap bg-light">
        <Sidebar />
        <Content>
          <div className="row mt-3">
            <span className="fw-bold h2">Dashboard</span>
            <div className="col-md-12">
              <div className="">
                <div className="row">
                  <div className="">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card border-1">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-4">
                                {dashboard.education.length > 0 ? (
                                  dashboard.education.map((edu, index) => (
                                    <Card
                                      key={index}
                                      p="3"
                                      col={4}
                                      cols={8}
                                      color="#6B9A5B"
                                      icon={
                                        <SchoolIcon
                                          sx={{
                                            fontSize: "80px",
                                            color: "#FFFFFF",
                                          }}
                                        />
                                      }
                                      title="เข้าร่วม"
                                      body={`จำนวนสถาบันที่เข้าร่วม ${edu.educational} สถาบัน`}
                                    />
                                  ))
                                ) : (
                                  <p>Loading....</p>
                                )}
                                </div>

                                <div className="col-md-4">
                                  {dashboard.report.length > 0 ? (
                                  dashboard.report.map((rp,index)=>(
                                  <Card
                                  key={index}
                                    p="3"
                                    col={4}
                                    cols={8}
                                    color="#5B989A"
                                    icon={
                                      <DescriptionIcon
                                        sx={{
                                          fontSize: "80px",
                                          align: "center",
                                          color: "#FFFFFF",
                                        }}
                                      />
                                    }
                                    title="รายงาน"
                                    body={`จำนวนสถาบันที่รายงาน ${rp.report}  สถาบัน`}
                                  />
                                  ))
                                  ) : (
                                    <p>Loading....</p>
                                  )}
                                </div>

                                <div className="col-md-4">
                                  {dashboard.total.length > 0 ?(
                                  dashboard.total.map((ghg,index)=> (
                                  <Card
                                  key={index}
                                    p="3"
                                    col={4}
                                    cols={8}
                                    color="#885B9A"
                                    icon={
                                      <FactoryIcon
                                        sx={{
                                          fontSize: "80px",
                                          align: "center",
                                          color: "#FFFFFF",
                                        }}
                                      />
                                    }
                                    title="ปริมาณการปล่อยก๊าซเรือนกระจกสะสม"
                                    body={`รวม ${parseInt(ghg.tCO2e).toLocaleString()} TCO<sub>2</sub>e`}
                                  />
                                ))
                                ):(
                                <p>Loading....</p>
                                )
                                }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-8">
                          <div className="card border-1">
                            <div className="fw-bold ms-4 h5 mt-4">
                              การปล่อยก๊าซเรือนกระจกและดูดกลับ  {selectedYear + 543}
                            </div>
                            <div className="card-body">
                              <div className="row">
                              {updatedTest.map((item, index) => {
            const IconComponent = item.icon;
            return (
                <div className="col-md-4" key={index}>
                    <Card
                        p="2"
                        col={4}
                        cols={8}
                        color={`${item.color}`}
                        icon={
                            <IconComponent
                                className="img-fluid rounded-start"
                                style={{ fontSize: 50 }}
                                sx={{ color: "white" }}
                            />
                        }
                        title={
                          item.num === 'GHG Removal' ? (
                            <>
                              GHG<br />
                              Removal
                            </>
                          ) : (
                            item.num
                          )
                        }
                        body={`${parseInt(item.tCO2e).toLocaleString()} tCO<sub>2</sub>e`}
                    />
                </div>
            );
        })}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="card border-1">
                            <div className="fw-bold mt-4 h5 ms-4">รูปแบบการจัดเก็บข้อมูล ปี {selectedYear + 543}</div>
                            <div className="card-body">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">

                  <div className="col-md-3 mb-4">
                    <div className="card border-1 h-100 text-center">
                      <p className="p-4 fw-bold">
                     Scope 1
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
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
                              data:data1,
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                              faded: {
                                innerRadius: 60,
                                additionalRadius: -60,
                                color: "gray",
                              },
                              arcLabel: (item) => `${((parseInt(item.value) / totalValue1) * 100).toFixed(0)}%`,
                            },
                          ]}
                          width={300}
                          height={300}
                          slotProps={{
                            legend: {
                              direction: 'column',
                              position: { vertical: 'bottom', horizontal: 'left' },
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


                  <div className="col-md-3 mb-4">
                    <div className="card border-1 h-100 text-center">
                      <p className="p-4 fw-bold">
                     Scope 2
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
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
                              data:data2,
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                              faded: {
                                innerRadius: 60,
                                additionalRadius: -60,
                                color: "gray",
                              },
                              arcLabel: (item) => `${((parseInt(item.value) / totalValue2) * 100).toFixed(0)}%`,
                            },
                          ]}
                          width={300}
                          height={300}
                          slotProps={{
                            legend: {
                              direction: 'column',
                              position: { vertical: 'bottom', horizontal: 'left' },
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


                  <div className="col-md-3 mb-4">
                    <div className="card border-1 h-100 text-center">
                      <p className="p-4 fw-bold">
                     Scope 3
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
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
                              data:data3,
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                              faded: {
                                innerRadius: 60,
                                additionalRadius: -60,
                                color: "gray",
                              },
                              arcLabel: (item) => `${((parseInt(item.value) / totalValue3) * 100).toFixed(0)}%`,
                            },
                          ]}
                          width={300}
                          height={300}
                          slotProps={{
                            legend: {
                              direction: 'column',
                              position: { vertical: 'bottom', horizontal: 'left' },
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


                  <div className="col-md-3 mb-4">
                    <div className="card border-1 h-100 text-center">
                      <p className="p-4 fw-bold">
                     Scope Ratio
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {dataRatio.length > 0 ? (
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
        arcLabel: (item) => `${((parseInt(item.value) / totalValue4) * 100).toFixed(0)}%`,
      },
    ]}
    width={300}
    height={300}
    slotProps={{
      legend: {
        direction: 'column',
        position: { vertical: 'bottom', horizontal: 'left' },
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
        </Content>
      </div>
      <Footer />
      <Modal id="exampleModal" title={modalContent.body}>
      <p className="fw-bold h-4 ">ปี: {selectedYear + 543}</p>
                  <table className="table table-hover w-100 p-4" >
                    <thead>
                    <tr>
                      <th>รูปแบบการจัดเก็บข้อมูล</th>
                      <th>จำนวน</th>
                      </tr>
                    </thead>
                    <tbody>
                    {groupedData.map((item, index) => (
                  modalContent.body  ===  item.name && (
                      <tr key={index}>
                        <td>{`${item.head_name}`}</td>
                        <td> {item.count}</td>
                      </tr>
                       )
                       ))}
                    </tbody>
                    <tfoot>
                    <tr>
                      <th>รูปแบบการจัดเก็บข้อมูล</th>
                      <th>จำนวน</th>
                      </tr>
                    </tfoot>
                  </table>
           
      </Modal>
      </YearContext.Provider>
  );
}
