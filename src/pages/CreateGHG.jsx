import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AsideBar from '../components/AsideBar'
import HeadBar from '../components/HeadBar'
import TabActivity from './Tab/TabActivity'
import axios from 'axios'
import config from '../config'
import Swal from 'sweetalert2'
import { UserContext } from '../components/MyContext'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


export default function CreateGHG() {
    const {campus_id,fac_id,years,id} = useParams();
    const [headCategory, setHeadCategory] = useState([]);
    const [modalData, setModalData] = useState({ headName: '', headId: '',facId:'',campudId:'', activityId:'' });
    const [activities, setActivities] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [countAvg, setCountAvg] = useState(null);
    const {userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
        fetchDataApi();
      },[id]);

    const fetchDataApi = async () => {
        try {
          const res = await axios.get(config.urlApi + `/scope/datasocpe/${id}`);
          const sortedActivities = res.data.map((activity) => ({
            ...activity,
            headcategories: activity.headcategories.sort((a, b) => a.id - b.id),
          }));
    
          setActivities(sortedActivities);
    
          const initialQuantities = sortedActivities.map((activity) =>
            activity.headcategories.map((headCategory) =>
              headCategory.data_scopes.map((data_scope) => data_scope.quantity)
            )
          );
          setQuantities(initialQuantities);
    
          const response = await axios.get(config.urlApi + `/dividData/${id}`);
          setCountAvg(response.data);
    
          const res1 = await axios.get(config.urlApi + `/headscope`);
          setHeadCategory(res1.data);
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message,
          });
        }
      };

    const handdlerFuel = async () => {
        try {
          Swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: "ดึงข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 800,
            timerProgressBar: true,
          });
          await axios.put(config.urlApi + `/datascope/pullDataFuel/${id}`);
          fetchDataApi();
        } catch (e) {
          console.log(e.message);
        }
      };

    const handlerRemoveHead = async (headId) => {
        try {
          const payload = {
            headId,
            id
          };
      
          const res = await Swal.fire({
            icon: "warning",
            title: "ต้องการลบข้อมูลรายชื่อกิจกรรมนี้ ใช่หรือไม่ ?",
            input: 'text',
            inputPlaceholder: 'ตอบ "YES" เพื่อลบข้อมูล',
            inputAttributes: {
              pattern: '^[Yy][Ee][Ss]$', // ตรวจสอบตัวอักษร "YES" ในทุกกรณี
              maxlength: 3 // กำหนดความยาวสูงสุดเป็น 3 ตัวอักษร
            },
            confirmButtonColor: "#7a3",
            confirmButtonText: "Submit",
            showCancelButton: true,
            cancelButtonColor: "#b45e",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
              if (!value || !value.match(/^[Yy][Ee][Ss]$/)) {
                return 'โปรดยืนยันด้วยคำว่า YES';
              }
            }
          });
      
          if (res.isConfirmed) {
            await axios.delete(config.urlApi + '/data_scope/deletehead', { data: payload });
            await Swal.fire({ title: 'ลบ', text: 'ลบข้อมูลสำเร็จ', icon: 'success', timer: 800 });
            fetchDataApi();
          }
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: '!!opp error',
            text: e.message,
          });
        }
      };

    const insertDataActivity = (headName, headId) => {
        setModalData({ headName, headId});
      };
    

    const [formData, setFormData] = useState({
        name:'',
        lci: '',
        kgCO2e: 0,
        sources: '',
        GWP_id: '',
        head_id: '',
        fac_id: '',
        campus_id: '',
        activityperiod_id: '',
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleSubmitData = async (e) => {
        e.preventDefault();
        try {
          if(formData.name === '' || formData.lci === '' || formData.kgCO2e === '' || formData.sources === ''){
            return toast.error('ระบุบข้อมูลให้ครบ',{autoClose:800});
          }else{
          const payload = {
            name: formData.name,
            quantity:0,
            lci: formData.lci,
            kgCO2e: formData.kgCO2e,
            sources: formData.sources,
            GWP_id: 1,
            head_id: modalData.headId,
            fac_id: fac_id,
            campus_id: campus_id,
            activityperiod_id: id,
          };
      
          const res = await axios.post(`${config.urlApi}/datascope/insertData`, payload);
      
          if (res.status === 200) {
            Swal.fire('Success', 'ข้อมูลถูกเพิ่มเรียบร้อยแล้ว', 'success');
            setFormData({
              name: '',
              lci: '',
              CO2: 0,
              Fossil_CH4: 0,
              CH4: 0,
              N2O: 0,
              SF6: 0,
              NF3: 0,
              HFCs: 0,
              PFCs: 0,
              GWP_HFCs: 0,
              GWP_PFCs: 0,
              kgCO2e: 0,
              sources: '',
            });
            fetchDataApi();
          } else {
            Swal.fire('Error', 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล', 'error');
          }
        }
        } catch (error) {
          Swal.fire('Error', 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล', 'error');
          console.error('Error inserting data:', error);
        }
      };

    const deleteList = async(listId) =>{
        try {
          const payload = {
            listId
          };
      
          const res = await Swal.fire({
            icon: "warning",
            title: "ต้องการลบกิจกรรม ใช่หรือไม่ ?",
            input: 'text',
            inputPlaceholder: 'ตอบ "YES" เพื่อลบข้อมูล',
            inputAttributes: {
              pattern: '^[Yy][Ee][Ss]$', // ตรวจสอบตัวอักษร "YES" ในทุกกรณี
              maxlength: 3 // กำหนดความยาวสูงสุดเป็น 3 ตัวอักษร
            },
            confirmButtonColor: "#7a3",
            confirmButtonText: "Submit",
            showCancelButton: true,
            cancelButtonColor: "#b45e",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
              if (!value || !value.match(/^[Yy][Ee][Ss]$/)) {
                return 'โปรดยืนยันด้วยคำว่า YES';
              }
            }
          });
      
          if (res.isConfirmed) {
            await axios.delete(config.urlApi + '/data_scope/deleteLIst', { data: payload });
            await Swal.fire({ title: 'ลบ', text: 'ลบข้อมูลสำเร็จ', icon: 'success', timer: 800 });
            fetchDataApi();
          }
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: '!!opp error',
            text: e.message,
          });
        }
      };

      const handleQuantityChange = async (e, data_scope) => {
        const newQuantity = e.target.value;
    
        // ตรวจสอบถ้าค่าใหม่เป็นค่าว่างหรือ null
        if (newQuantity === "" || newQuantity === null) {
          return; // ไม่ต้องทำอะไรถ้าค่าว่าง
        }
    
        const payload = {
          id: data_scope.id,
          quantity: newQuantity
        };
    
        try {
          await axios.put(config.urlApi + `/scope/updateQuantity`, payload);
          data_scope.quantity = newQuantity; // Update the quantity in the state
          fetchDataApi();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
          });
        }
      };
      const handleSendData = async (data) => {
        try {
          if (data.length === 0) {
            return await Swal.fire({
              icon: 'warning',
              title: 'เตือน',
              text: 'โปรดเลือกรายการ!!'
            });
          }
    
          const payloads = data.map(item => ({
            id: item.id,
            head_name: item.head_name,
            scopenum_id: item.catescopenum.id // Adjust this if necessary
          }));
    
          const res = await Swal.fire({
            icon: 'question',
            title: 'คำถาม',
            text: 'ต้องการเพิ่มข้อมูลใช่หรือไม่?',
            showCancelButton: true
          });
    
          if (res.isConfirmed) {
            await Swal.fire({
              icon: 'success',
              title: 'สำเร็จ',
              text: 'เพิ่มข้อมูลกิจกรมกิจกรรมสำเร็จ',
              showConfirmButton: false,
              timer: 500,
              timerProgressBar: true
            });
    
            await Promise.all(payloads.map(payload => axios.post(config.urlApi + `/generateActivity/${id}/${fac_id}/${campus_id}`, payload)
            ));
           
            fetchDataApi();
      
          }
    
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: e.message
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
    <div className="page-wrapper mdc-toolbar-fixed-adjust">
      <main className="content-wrapper">
    <div className="p-5">
          <div label="กิจกรรมการปล่อยก๊าซเรือนกระจก">

          <TabActivity deleteList={deleteList} handleSubmitData={handleSubmitData} id={id} campus_id={campus_id} fac_id={fac_id} handleInputChange={handleInputChange} formData={formData}  setFormData={setFormData} modalData={modalData} setModalData={setModalData} insertDataActivity={insertDataActivity}  handlerRemoveHead={handlerRemoveHead} activities={activities} handdlerFuel={handdlerFuel} handleQuantityChange={handleQuantityChange} handleSendData={handleSendData} headCategory={headCategory} setHeadCategory={setHeadCategory}  />

          <div className="d-flex flex-row justify-content-between">
           <Link to={`/activityOrganization/${campus_id}/${fac_id}/${years}/${id}`} className="btn btn-outline-primary me-3"><KeyboardDoubleArrowLeftIcon/> ย้อนกลับ</Link>
          <Link to={`/activitySummary/${campus_id}/${fac_id}/${years}/${id}`}  className="btn btn-outline-primary me-3">ถัดไป <KeyboardDoubleArrowRightIcon/></Link> 
          </div>
          </div>

         
          </div>
          </main>
          </div>
          <Footer />
      </div>
    </div>
  )
}
