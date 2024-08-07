import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Footer from '../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AsideBar from '../components/AsideBar'
import HeadBar from '../components/HeadBar'
import TabActivityReport from './Tab/TabActivityReport'
import axios from 'axios'
import config from '../config'
import Swal from 'sweetalert2'
import { UserContext } from '../components/MyContext'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import TemplateReport from './TemplateReport'


export default function Report() {
    const {campus_id,fac_id,years,id} = useParams();
    const {userData, setUserData } = useContext(UserContext);
    const [statusActivity, setStatusActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    const sendReport = async() =>{
      try{
        const payload = {
          status_activity:2
        }
   
        const res = await Swal.fire(
      {
        icon:'question',
        title:'Confirm',
        text:'ต้องการส่งรายงานใช่หรือไม่?',
        showCancelButton:true
      }
     );

        if(res.isConfirmed){
          Swal.fire(
            {
              icon:'success',
              title:'Success',
              text:'ส่งรายงานสำเร็จ',
              showConfirmButton:false,
              timer:700,
              timerProgressBar:true
            }
           )
           await axios.put(config.urlApi + `/activity/statusActivity/${id}`,payload);
           navigate('/activitydata');
           fetchData();
        }
       
    }catch(e){
      console.log(e);
    }
    }

    useEffect(() => {
      const fetchStatus = async () => {
          try {
              const response = await axios.get(config.urlApi+`/checkStatusReport/${id}`);
              setStatusActivity(response.data.result.status_activity);
          } catch (err) {
              setError('Error fetching data');
          } finally {
              setLoading(false);
          }
      };

      fetchStatus();
  }, [id]);

  return (
    <div className="body-wrapper">
    <AsideBar /> 

    <div className="main-wrapper mdc-drawer-app-content">
    <HeadBar />
    <div className="page-wrapper mdc-toolbar-fixed-adjust">
      <main className="content-wrapper">
    <div className="p-5">
          <div label="รูปภาพโครงสร้างองค์กร">
        {/*   <TabActivityReport/> */}
        <TemplateReport/>
          <div className="d-flex flex-row justify-content-between mt-3">
           <Link to={`/activitySummary/${campus_id}/${fac_id}/${years}/${id}`} className="btn btn-outline-primary me-3"><KeyboardDoubleArrowLeftIcon/> ย้อนกลับ</Link>
          
           {statusActivity === '3' || statusActivity === '2' ?(
          <Link to='/activitydata'><button  className="btn btn-outline-success me-3">กลับไปหน้า สร้างกิจกรรมการปล่อยและการดูดกลับก๊าซเรือนกระจก</button> </Link>
           )
          :
          (
          <button onClick={sendReport}  className="btn btn-outline-success me-3">ส่งรายงาน</button> 
          )
          }
        

          </div>
          </div>
          </div>
          </main>
          </div>
          <Footer />
          <ToastContainer />
      </div>
    </div>
  )
}
