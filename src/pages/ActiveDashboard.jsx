import React, { createContext, useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AsideBar from '../components/AsideBar';
import Active from '../components/Active';
import { UserContext } from '../components/MyContext';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Co2Icon from "@mui/icons-material/Co2";
import SpaIcon from "@mui/icons-material/Spa";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import BoltIcon from "@mui/icons-material/Bolt";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import HeadBarActive from '../components/HeadBarActive';

export const ActiveDSBContext = createContext();

function ActiveDashboard() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { fac_id } = useParams();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(config.urlApi + '/users/showUserApi', config.headers());
      if (response.data.message === 'success') {
        setUserData({
          firstname: response.data.result.fname,
          surname: response.data.result.sname,
          roleName: response.data.result.role.role_name,
          facultyName: response.data.result.faculty.fac_name,
          campusName: response.data.result.faculty.campus.campus_name,
          facultyID: response.data.result.faculty.id,
          campusID: response.data.result.faculty.campus_id,
          latitude: response.data.result.faculty.latitude,
          longitude: response.data.result.faculty.longitude,
          logo: response.data.result.faculty.logo
        });
      }
    } catch (error) {
      navigate('/login');
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        text: 'กรุณาเข้าสู่ระบบด้วย Email และ password'
      });
    }
  };

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
    if (userData.facultyID) {
      fetchDashboard(selectedYear, userData.facultyID);
    }
  }, [selectedYear, userData]);

  const fetchDashboard = async (selectedYear, facultyID) => {
    try {
      const res = await axios.get(config.urlApi + `/dataDashboardEducation/${selectedYear}&${facultyID}`);
      setDashboard(res.data.result);
    } catch (e) {
      toast.error(`${e.message} เกิดข้อผิดพลาด`);
    }
  };

  const test = [
    { num: "TOTAL EMISSION",title:'การปล่อยก๊าซเรือนกระจกทั้หมด', color: "#a12A0A", icon: Co2Icon, tCO2e: 0 },
    { num: "GHG Removal",title:'การดูดกลับก๊าซเรือนกระจก', color: "#6B9A5B", icon: SpaIcon, tCO2e: 0 },
    { num: "Scope 1",title:'การปล่อยก๊าซเรือนกระจกทางตรง', color: "#1C87D7", icon: LocalGasStationIcon, tCO2e: 0 },
    { num: "Scope 2",title:'การปล่อยก๊าซเรือนกระจกทางอ้อม', color: "#2752D1", icon: BoltIcon, tCO2e: 0 },
    { num: "Scope 3",title:'การปล่อยก๊าซเรือนกระจกทางอ้อม', color: "#754ABF", icon: FlightLandIcon, tCO2e: 0 },
  ];

  const ranking = [
    { eg: "Scope 1", bg: "warning" },
    { eg: "Scope 2", bg: "primary" },
    { eg: "Scope 3", bg: "info" },
    { eg: "GHG Removal", bg: "success" },
  ];

  const color = ["#C8DEB9", "#A6CEAA", "#6BAB90", "#55917F", "#5A6F6D"];

  const data1 = Array.isArray(dashboard.scope1)
    ? dashboard.scope1.map((scope, index) => ({
        id: index + 1,
        value: parseFloat(scope.tCO2e).toFixed(0),
        label: scope.head_name,
        color: color[index % 5],
     
      }))
    : [];

  const data2 = Array.isArray(dashboard.scope2)
    ? dashboard.scope2.map((scope, index) => ({
        id: index + 1,
        value: parseFloat(scope.tCO2e).toFixed(0),
        label: scope.head_name,
        color: color[4],
      }))
    : [];

  const data3 = Array.isArray(dashboard.scope3)
    ? dashboard.scope3.map((scope, index) => ({
        id: index + 1,
        value: parseInt(scope.tCO2e).toFixed(),
        label: scope.head_name,
        color: color[index % 5],
      }))
    : [];

  const sumValues = (data) => {
    return data.reduce((acc, scope) => {
      const value = parseInt(scope.tCO2e) || 0;
      return acc + value;
    }, 0);
  };

  const totalScope1 = sumValues(dashboard.scope1);
  const totalScope2 = sumValues(dashboard.scope2);
  const totalScope3 = sumValues(dashboard.scope3);

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

  const totalEmission = dashboard.totalYear.reduce(
    (acc, curr) => acc + parseFloat(curr.tCO2e),
    0
  );

  const updatedTest = test.map((item) => {
    const apiData = dashboard.totalYear
      ? dashboard.totalYear.find((data) => data.title === item.num)
      : null;
    return { ...item, tCO2e: apiData ? parseFloat(apiData.tCO2e) : 0 };
  });

  const totalEmissionIndex = updatedTest.findIndex(
    (item) => item.num === "TOTAL EMISSION"
  );
  if (totalEmissionIndex !== -1) {
    updatedTest[totalEmissionIndex].tCO2e = totalEmission;
  }

  useEffect(() => {
    const groupData = dashboard.listHead.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = {
          id: item.id,
          head_name: item.head_name,
          name: item.title,
          count: 0,
        };
      }
      acc[item.id].count++;
      return acc;
    }, {});

    const groupedArray = Object.values(groupData);
    groupedArray.sort((a, b) => a.id - b.id);
    setGroupedData(groupedArray);
  }, [dashboard.listHead]);

  const totalValue1 = data1.reduce((acc, item) => acc + parseInt(item.value), 0);
  const totalValue2 = data2.reduce((acc, item) => acc + parseInt(item.value), 0);
  const totalValue3 = data3.reduce((acc, item) => acc + parseInt(item.value), 0);
  const totalValue4 = dataRatio.reduce((acc, item) => acc + parseInt(item.value), 0);

  return (
    <ActiveDSBContext.Provider
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
    }}
  >
      <div className="body-wrapper">
      <AsideBar /> 
      <div className="main-wrapper mdc-drawer-app-content">
      <HeadBarActive />
      <Active />
      <Footer />
      </div>
    </div>
    </ActiveDSBContext.Provider>
   
  );
}

export default ActiveDashboard;
