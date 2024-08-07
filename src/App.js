import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ActivityDetail from './pages/ActivityDetail';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { UserDataProvider } from './components/MyContext'; 
import NotFound from './pages/NotFound';
import './index.css';
import NewDashBoard from './pages/NewDashBoard';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Co2Icon from "@mui/icons-material/Co2";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SpaIcon from "@mui/icons-material/Spa";
import BoltIcon from "@mui/icons-material/Bolt";
import config from './config';
import SignIn from './pages/SignIn';
import Demo from './components/Demo';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Organization from './pages/Organization';
import CreateGHG from './pages/CreateGHG';
import Summary from './pages/Sumary';
import Report from './pages/Report';
import ActiveDashboard from './pages/ActiveDashboard';
import ResetPassword from './pages/ResetPassword';
import CheckYourEmail from './pages/CheckEmail';
import ForgotPasswordForm from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import Reference from './pages/Reference';

export const YearContext = createContext();
function App() {
  const navigate = useNavigate();
  const [spinners, setSpinners] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinners(false);
    }, 2000);
  }, []);

  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [dashboard, setDashboard] = useState({
    education: [],
    report: [],
    total: [],
    totalYear: [],
    listHead: [],
    scope1: [],
    scope2: [],
    scope3: [],
  });
  const [listYear, setListYear] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [groupedData, setGroupedData] = useState([]);
  const [approve,setApprove] = useState([]);

  const fetchDataApi = async (year) => {
    try {
      const res = await axios.get(
        `${config.urlApi}/activity/showPeriod?year=${year}`
      );
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
    fetchDashboard(selectedYear);
  }, [selectedYear]);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(config.urlApi + `/dataDashboard/${selectedYear}`);
      setDashboard(res.data.result);
    } catch (e) {
      toast.error(`${e.message} เกิดข้อผิดพลาด`);
    }
  };

  
  const test = [
    { num: "TOTAL EMISSION",title:'การปล่อยก๊าซเรือนกระจกทั้งหมด', color: "#a12A0A", icon: Co2Icon, tCO2e: 0 },
    { num: "GHG Removal",title:'การดูดกลับก๊าซเรือนกระจก', color: "#6B9A5B", icon: SpaIcon, tCO2e: 0 },
    { num: "Scope 1",title:'การปล่อยก๊าซเรือนกระจกทางตรง', color: "#1C87D7", icon: LocalGasStationIcon, tCO2e: 0 },
    { num: "Scope 2",title:'การปล่อยก๊าซเรือนกระจกทางอ้อม', color: "#2752D1", icon: BoltIcon, tCO2e: 0 },
    { num: "Scope 3",title:'การปล่อยก๊าซเรือนกระจกทางอ้อม', color: "#183482", icon: FlightLandIcon, tCO2e: 0 },
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

  const color = ["#0D6056", "#0C7E67", "#108C82", "#0BB2A0", "#0DB09B","#70C9B7","#4BAAC6","#6EB8DD","#499DCB","#3C9DCA","#339CDD","#0084CE","#0F5A7C"];

  const data1 = Array.isArray(dashboard.scope1)
    ? dashboard.scope1.map((scope, index) => ({
        id: index + 1,
        value: (parseFloat(scope.tCO2e)).toFixed(0),
        label: scope.head_name,
        color: color[index ],
      }))
    : [];

  const data2 = Array.isArray(dashboard.scope2)
    ? dashboard.scope2.map((scope, index) => ({
        id: index + 1,
        value: (parseFloat(scope.tCO2e)).toFixed(0),
        label: scope.head_name,
        color: color[4],
      }))
    : [];

  const data3 = Array.isArray(dashboard.scope3)
    ? dashboard.scope3.map((scope, index) => ({
        id: index + 1,
        value: (parseInt(scope.tCO2e)).toFixed(),
        label: scope.head_name,
        color: color[index ],
      }))
    : [];

  const sumValues = (data) => {
    return data.reduce((acc, scope) => {
      const value = (parseInt(scope.tCO2e)) || 0;
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
      label: "Scope 1 การปล่อยก๊าซเรือนกระจกทางตรง",
      value: totalScope1,
      color: color[0], // เปลี่ยนสีตามต้องการ
    },
    {
      label: "Scope 2 การปล่อยก๊าซเรือนกระจกทางอ้อม (ไฟฟ้า)",
      value: totalScope2,
      color: color[1], // เปลี่ยนสีตามต้องการ
    },
    {
      label: "Scope 3 การปล่อยก๊าซเรือนกระจกทางอ้อม อื่นๆ",
      value: totalScope3,
      color: color[2], // เปลี่ยนสีตามต้องการ
    },
  ];

  const handleModal = (rankId, index) => {
    setModalContent({
      title: `อันดับ ${index + 1}`,
      body: `${rankId.eg}`,
    });
  };

  // Calculate total emission
  const totalEmission = dashboard.totalYear.reduce(
    (acc, curr) => acc + parseFloat(curr.tCO2e),
    0
  );

  // Update tCO2e in the original test array
  const updatedTest = test.map((item) => {
    const apiData = dashboard.totalYear
      ? dashboard.totalYear.find((data) => data.title === item.num)
      : null;
    return { ...item, tCO2e: apiData ? parseFloat(apiData.tCO2e) : 0 };
  });

  // Find and update the TOTAL EMISSION item in the updatedTest array
  const totalEmissionIndex = updatedTest.findIndex(
    (item) => item.num === "TOTAL EMISSION"
  );
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
          name: item.title, // เก็บ name ลงใน accumulator
          count: 0, // ตั้งค่าเริ่มต้นสำหรับ count
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

  const totalValue1 = data1.reduce(
    (acc, item) => acc + parseInt(item.value),
    0
  );
  const totalValue2 = data2.reduce(
    (acc, item) => acc + parseInt(item.value),
    0
  );
  const totalValue3 = data3.reduce(
    (acc, item) => acc + parseInt(item.value),
    0
  );
  const totalValue4 = dataRatio.reduce(
    (acc, item) => acc + parseInt(item.value),
    0
  );

  useEffect(()=>{
    approvedReport();
  },[selectedYear]);

  const approvedReport = async() =>{
    try{
      const respon =  await axios(config.urlApi + `/amountReport`);
      setApprove(respon.data.result);
     fetchDataApi();

    }catch(e){
      console.log(e.mssage);
    }
  }

  return (
    <>
      {spinners ? (
        <div style={{
          backgroundColor: '#FFFFFF',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: 'column', // Ensure items stack vertically on smaller screens
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
          margin: 0,
        }}>
          <img src={process.env.PUBLIC_URL + '/img/logo.png'} style={{ maxWidth: '25%', height: 'auto' }} /> {/* Ensure the image is responsive */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="spinner-grow" style={{color:'#4F9031'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#48832D'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#417729'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#3B6C25'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#366222'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#31591F'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#2D511C'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#294A19'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <YearContext.Provider
        value={{
          dashboard,
          setDashboard,
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
          groupedData,
          listYear,
          setListYear,
          searchTerm,
          setSearchTerm,
          selectedYear,
          setSelectedYear,
          approve
        }}
      >
        <UserDataProvider> 
          <Routes>
           {/*  <Route path='/' element={<Index />} /> */}
            <Route path='/login' element={<SignIn />} />
            <Route path='/about' element={<Home />} />
            <Route path='/' element={<NewDashBoard />} />
            <Route path='/signUp' element={<SignUp  />} />
            <Route path='/activitydata' element={<Demo  />} />
            <Route path='/dashboard' element={<ActiveDashboard  />} />
            <Route path='/reference' element={<Reference />} />
          {/*   <Route path='/activitydata' element={<ActivityData  />} /> */}
            <Route path='/activityDetail/:campus_id/:fac_id/:years/:id' element={<ActivityDetail/>} />
            <Route path='/activityProfile/:campus_id/:fac_id/:years/:id' element={<Profile/>} />
            <Route path='/activityOrganization/:campus_id/:fac_id/:years/:id' element={<Organization/>} />
            <Route path='/activityCreateGHG/:campus_id/:fac_id/:years/:id' element={<CreateGHG/>} />
            <Route path='/activitySummary/:campus_id/:fac_id/:years/:id' element={<Summary/>} />
            <Route path='/activityReport/:campus_id/:fac_id/:years/:id' element={<Report/>} />

            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/check-your-email" element={<CheckYourEmail />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
          {/*   <Route path='/' element={<Dashboard/>} /> */}
            <Route path='*' element={<NotFound />} />
          </Routes>
         </UserDataProvider> 
         </YearContext.Provider>
      )}
    </>
  );
}

export default App;
