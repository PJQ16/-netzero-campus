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
import { useParams } from "react-router-dom";
import { UserContext } from "../components/MyContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ActivityDetail() {
  const { id, years, fac_id,campus_id } = useParams();
  const [infos, setInfos] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { userData } = useContext(UserContext);
  const [employee, setEmployee] = useState('');
  const [area, setArea] = useState('');
  const [activities, setActivities] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [headCategory, setHeadCategory] = useState([]);
  const [countAvg, setCountAvg] = useState(null);

  const [scopeData, setScopeData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);


  useEffect(() => {
    fetchDataInfo();
  }, [id]);


  useEffect(() => {
    fetchDataApi();
  },[id]);

  useEffect(() => {
    fetchDataScope();
  },[id]);





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
        employee_amount: employee, // ใช้ state employee ที่ถูกตั้งค่า
        building_area: area       // ใช้ state area ที่ถูกตั้งค่า
      };
      
      console.log(payload);
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

  const fetchDataScope = async () => {
    try {
      const res = await axios.get(config.urlApi + `/datascope/summary/${years - 543}/${id}`);
      setScopeData(res.data); 

      const total = res.data.reduce((acc, item) => acc + parseFloat(item.tco2e), 0);
      setTotalValue(total);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: err.message,
      });
    }
  };

  const percentages = scopeData.length > 0
    ? scopeData.map((item) => ({
        label: item.name,
        percentage: (parseFloat(item.tco2e) / totalValue * 100).toFixed(2),
      }))
    : [];


  return (
    <div>
      <ToastContainer />
      <Navbar />
     
       <div className="p-5  bg-light">
       <Layout>
          <Tab>
            <div label="ข้อมูลทั่วไป">
           <TabActivityInfo  handlerSubmitUpdate={handlerSubmitUpdate} infos={infos} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} setEmployee={setEmployee} setArea={setArea}/>
            </div>
            <div label="แผนภาพองค์กร">
            <TabActivityLocation/>
            </div>
            <div label="โครงสร้างองค์กร">
            <TabActivityOrganization/>
            </div>
            <div label="กิจกรรมการปล่อยก๊าซเรือนกระจก" >
            <TabActivity activities={activities} handdlerFuel={handdlerFuel} handleQuantityChange={handleQuantityChange} handleSendData={handleSendData} headCategory={headCategory} setHeadCategory={setHeadCategory}  />
            </div>
            {/* <div label="การประเมินนัยสำคัญ" >
            <TabSignificance/>
            </div>
             <div label="6.) การประเมินความไม่แน่นอน" >
            <TabUncertainty />
            </div> */}
            <div label="สรุปผลการคำนวณ">
            <TabActivitySummary scopeData={scopeData} percentages={percentages} years={years}  />
            </div> 
            <div label="รายงาน">
            <TabActivityReport/>
            </div>
          </Tab>
          </Layout>
          </div>
      
      <Footer />
    </div>
  );
}

export default ActivityDetail;
