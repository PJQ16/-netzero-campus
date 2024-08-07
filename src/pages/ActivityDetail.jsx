import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import TabActivityInfo from "./Tab/TabActivityInfo";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../components/MyContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeadBar from "../components/HeadBar";
import AsideBar from "../components/AsideBar";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

function ActivityDetail() {
  const { id, years, fac_id,campus_id } = useParams();
  const [infos, setInfos] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const {userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
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
      const res = await axios.get(config.urlApi + `/activity/showPeriod/${fac_id}/${years - 543}/${id}`);
   
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
      if(employee === '' || area === '' || student === ''|| totalArea === ''){
            return Swal.fire({
              icon:'warning',
              title:'กรุณากรอกข้อมมูลให้ครบถ้วน',
              text:'ถ้าข้อมูลยังไม่มีให้ใส่เลข 0',
              timer:1500
            });
      }else {
      const payload = {
        employee_amount: employee, 
        building_area: area,
        student_amount:student,
        total_area:totalArea,
        status_activity:1      
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
    }

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });
    }
  };

  

  useEffect(() => {
      fetchData();
  },[userData.facultyID]);

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
       
          navigate('/login')
          Swal.fire({
              icon:'warning',
              title:'warning',
              text:'กรุณาเข้าสู่ระบบด้วย Email และ password'
          })
        
      }
    };
  

  return (
      <div className="body-wrapper">
      <AsideBar /> 
      <div className="main-wrapper mdc-drawer-app-content">
      <HeadBar />
      <div className="p-5">
         <div label="ข้อมูลทั่วไป">
           <TabActivityInfo userData={userData}   student={student} setStudent={setStudent} campusReport={campusReport} setCampusReport={setCampusReport} totalArea={totalArea} setTotalArea={setTotalArea} handlerSubmitUpdate={handlerSubmitUpdate} infos={infos} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} setEmployee={setEmployee} setArea={setArea}/>
           <div className="d-flex flex-row justify-content-between">
           <Link to={`/activitydata`} className="btn btn-outline-primary me-3"><KeyboardDoubleArrowLeftIcon/> ย้อนกลับ </Link>
         
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
