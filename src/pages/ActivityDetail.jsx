import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Tab from "../components/Tab";
import TabActivityInfo from "./Tab/TabActivityInfo";
import TabActivityLocation from "./Tab/TabActivityLocation";
import TabActivityOrganization from "./Tab/TabActivityOrganization";
import TabActivity from "./Tab/TabActivity";
import TabActivitySummary from "./Tab/TabActivitySummary";
import TabActivityReport from "./Tab/TabActivityReport";
/* import TabSignificance from "./Tab/TabSignificance";
import TabUncertainty from "./Tab/TabUncertainty"; */
import axios from "axios";
import Swal from "sweetalert2";
import config from "../config";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../components/MyContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeadBar from "../components/HeadBar";
import AsideBar from "../components/AsideBar";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function ActivityDetail() {
  const { id, years, fac_id,campus_id } = useParams();
  const [infos, setInfos] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { userData } = useContext(UserContext);
  const [employee, setEmployee] = useState('');
  const [student, setStudent] = useState('');
  const [campusReport, setCampusReport] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    fetchDataInfo();
  }, [id]);



  const fetchDataInfo = async () => {
    try {
      const res = await axios.get(config.urlApi + `/activity/showPeriod/${fac_id}/${years - 543}`);
   
      setInfos(res.data);
      if (res.data.length > 0) {
        const { faculty } = res.data[0];
        setLatitude(faculty.latitude);
        setLongitude(faculty.longitude);
      }
    
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.message
      });
    }
  };

  const handlerSubmitUpdate = async (event, info) => {
    try {
      event.preventDefault();
      const payload = {
        employee_amount: employee, 
        building_area: area,
        campus_report:campusReport,
        student_amount:student,
        total_area:totalArea      
      };
      const confirmation = await Swal.fire({
        icon: 'question',
        title: 'Question',
        text: 'ต้องการบันทึกข้อมูลใช่หรือไม่?',
        showCancelButton: true
      });
  
      if (confirmation.isConfirmed) {
        await toast.success('บันทึกข้อมูลสำเร็จ',{autoClose:1000});
  
        await axios.put(config.urlApi + `/activity/modifyDataPeriod/${info.id}`, payload);
        fetchDataInfo();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });
    }
  };

  



  return (
      <div className="body-wrapper">
      <AsideBar /> 
      <div className="main-wrapper mdc-drawer-app-content">
      <HeadBar />
      <div className="p-5">
         
            <div label="ข้อมูลทั่วไป">
           <TabActivityInfo   student={student} setStudent={setStudent} campusReport={campusReport} setCampusReport={setCampusReport} totalArea={totalArea} setTotalArea={setTotalArea} handlerSubmitUpdate={handlerSubmitUpdate} infos={infos} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} setEmployee={setEmployee} setArea={setArea}/>
           <div className="d-flex flex-row justify-content-end">
           <Link to={`/activityProfile/${campus_id}/${fac_id}/${years}/${id}`} className="btn btn-outline-primary me-3">ถัดไป <KeyboardDoubleArrowRightIcon/></Link>
           </div>
            </div>
            </div>
          <Footer />
      </div>
    </div>
  );
}

export default ActivityDetail;
