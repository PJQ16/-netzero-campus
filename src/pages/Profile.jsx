import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import TabActivityLocation from './Tab/TabActivityLocation'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import AsideBar from '../components/AsideBar'
import HeadBar from '../components/HeadBar'


export default function Profile() {
    const {campus_id,fac_id,years,id} = useParams();
  return (
    <div className="body-wrapper">
    <AsideBar /> 
    <div className="main-wrapper mdc-drawer-app-content">
    <HeadBar />
    <div className="p-5">
          <div label="รูปภาพองค์กร">
          <TabActivityLocation/>
          <div className="d-flex flex-row justify-content-between">
           <Link to={`/activityDetail/${campus_id}/${fac_id}/${years}/${id}`} className="btn btn-outline-primary me-3">ย้อนกลับ</Link>
          <Link to={`/activityOrganization/${campus_id}/${fac_id}/${years}/${id}`}  className="btn btn-outline-primary me-3">ถัดไป</Link> 
          </div>
          </div>
          </div>
          <Footer />
      </div>
    </div>
  )
}
