import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import AsideBar from '../components/AsideBar'
import HeadBar from '../components/HeadBar'
import TabActivityReport from './Tab/TabActivityReport'


export default function Report() {
    const {campus_id,fac_id,years,id} = useParams();
  return (
    <div className="body-wrapper">
    <AsideBar /> 
    <div className="main-wrapper mdc-drawer-app-content">
    <HeadBar />
    <div className="p-5">
          <div label="รูปภาพโครงสร้างองค์กร">
          <TabActivityReport/>
          <div className="d-flex flex-row justify-content-between">
           <Link to={`/activitySummary/${campus_id}/${fac_id}/${years}/${id}`} className="btn btn-outline-primary me-3">ย้อนกลับ</Link>
          <Link to={`#`}  className="btn btn-outline-success me-3">ส่งรายงาน</Link> 
          </div>
          </div>
          </div>
          <Footer />
      </div>
    </div>
  )
}
