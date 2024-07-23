import React, { useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Footer from '../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AsideBar from '../components/AsideBar'
import HeadBar from '../components/HeadBar'
import TabActivityOrganization from './Tab/TabActivityOrganization'
import axios from 'axios'
import config from '../config'
import Swal from 'sweetalert2'
import { UserContext } from '../components/MyContext'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


export default function Organization() {
    const {campus_id,fac_id,years,id} = useParams();
    const {userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();


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
          <div label="รูปภาพโครงสร้างองค์กร">
          <TabActivityOrganization/>
          <div className="d-flex flex-row justify-content-between">
           <Link to={`/activityProfile/${campus_id}/${fac_id}/${years}/${id}`} className="btn btn-outline-primary me-3"><KeyboardDoubleArrowLeftIcon />ย้อนกลับ</Link>
          <Link to={`/activityCreateGHG/${campus_id}/${fac_id}/${years}/${id}`}  className="btn btn-outline-primary me-3">ถัดไป <KeyboardDoubleArrowRightIcon/></Link> 
          </div>
          </div>
          </div>
          <Footer />
      </div>
    </div>
  )
}
