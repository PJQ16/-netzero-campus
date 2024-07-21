import React, { createContext, useContext, useEffect, useState } from 'react'
import './pae/assets/css/demo/style.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import './pae/assets/vendors/css/vendor.bundle.base.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import axios from 'axios'
import config from '../config'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material'
import Footer from './Footer'
import AsideBar from './AsideBar'
import HeadBar from './HeadBar'
import { UserContext } from './MyContext'

function Demo() {
    const navigate = useNavigate();
    const {userData, setUserData } = useContext(UserContext);
    const [dataPeriods, setDataPeriods] = useState([]);
    const [searchYear, setSearchYear] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        fetchDataPeriod();
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
  
      const fetchDataPeriod = async () => {
        try {
            const res = await axios.get(config.urlApi + `/activity/showPeriod/${userData.facultyID}`);
            setDataPeriods(res.data);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: e.message
            });
        }
    };

    const handleSearchChange = (selectedOption) => {
        setSearchYear(selectedOption ? selectedOption.value : '');
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredData = dataPeriods.filter(item => {
        if (!searchYear) return true;
        return item.years + 543 === parseInt(searchYear);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // สร้างตัวเลือกสำหรับปีจาก dataPeriods
    const yearOptions = dataPeriods.map(item => ({
        value: item.years + 543,
        label: item.years + 543
    }));

    const getStatusDetails = (status) => {
        switch (status) {
          case 0:
            return { text: 'ยังไม่มีการดำเนินการ', color: 'gray' };
          case 1:
            return { text: 'กำลังดำเนินการ', color: '#ADD8E6' }; // สีฟ้าอ่อนๆ
          case 2:
            return { text: 'รอตรวจสอบ', color: 'blue' };
          case 3:
            return { text: 'ตรวจสอบเรียบร้อย', color: '#90EE90' }; // สีเขียวอ่อน
          case 4:
            return { text: 'เกิดข้อผิดพลาด', color: 'red' };
          default:
            return { text: 'ไม่ทราบสถานะ', color: 'black' };
        }
      };
  return (
    <div className="body-wrapper">
    <AsideBar /> 
    <div className="main-wrapper mdc-drawer-app-content">
    <HeadBar />
    <div className="page-wrapper mdc-toolbar-fixed-adjust">

        <main className="content-wrapper">
            <div className="mdc-layout-grid">
              <div className="mdc-layout-grid__inner">
              

              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12-desktop mdc-layout-grid__cell--span-12-tablet">
                <div className="mdc-card info-card info-card--light">
                  <div className="card-inner">
                    <h5 className="card-title" style={{color: 'rgb(0, 204, 204)', fontWeight: '800', fontSize: '13px'}}>ชื่อมหาวิทยาลัย</h5>
                  
                    <h5 className="font-weight-light pb-2 mb-1 border-bottom" style={{fontSize: '30px', fontWeight: '500'}}>{userData.facultyName}</h5>
                    
                    <p className="tx-12 text-muted"> {userData.campusName}</p>
                      <div className="card-icon-wrapper">
                      <img src={`${config.urlApi}/logos/${userData.logo}`} className="card-img-top" alt="..." />
                      </div>
                  </div>
                </div>
              </div>



              
              <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
               <div className="mdc-card">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <h6 className="card-title mb-2 mb-sm-0">รายงานการปล่อยก๊าซเรือนกระจก</h6>
                    <button className='btn btn-secondary'><LibraryAddIcon/> สร้างรายงานการปล่อยก๊าซเรือนกระจก</button>
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
                  <table className="table table-hover table-success  table-striped table-bordered">
                    <thead >
                        <tr className='text-center'>
                            <th>ลำดับ</th>
                            <th>ปีที่รายงาน</th>
                            <th>สถานะ</th>
                            <th>เพิ่มเติม</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((item, index) => {
                        const statusDetails = getStatusDetails(item.status_activity);

                        return (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.years + 543}</td>
                            <td className='text-secondary' style={{ color: statusDetails.color }}>
                                {statusDetails.text}
                            </td>
                            <td>
                                <Link to={`/activityDetail/${item.campus_id}/${item.fac_id}/${item.years + 543}/${item.id}`}>
                                <Tooltip title={'คลิกเพื่อตรวจสอบ'} placement='top'>
                                <EditIcon />
                                </Tooltip>
                                </Link>
                            </td>
                            </tr>
                        );
                        })}
                    </tbody>
                  </table>
                  </div>
               </div>
              </div>



                
              </div>
            </div>
        </main>


        <Footer />
      </div>
    </div>
    </div>
  
  )
}

export default Demo