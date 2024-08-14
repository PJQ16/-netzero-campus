import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // ใช้ regular expression เพื่อตรวจสอบรูปแบบอีเมล
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "กรุณากรอกอีเมลที่ถูกต้อง",
      });
      return;
    }
  
    try {
      await axios.post(config.urlApi + "/api/auth/forgot-password", { email });
      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "โปรดตรวจสอบข้อความการตั้งค่ารหัสผ่านใหม่ ที่ Email ของท่าน",
      });
      navigate("/login");
    } catch (e) {
      // ตรวจสอบรายละเอียดข้อผิดพลาดจาก `error.response`
      if (e.response && e.response.data) {
        if(e.response.data.error  === 'User with this email does not exist'){
          toast.error('ไม่พบ Email ผู้ใช้งานในระบบ',{autoClose:1000});
        }else{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "เกิดข้อผิดพลาดในการส่งอีเมล",
        });
      }
    }
    }
  };
  

  return (
    <MDBContainer className="gradient-form">
      <MDBRow>
        <MDBCol col="12">
          <div className="d-flex flex-column justify-content-center vh-100">
            <div className="text-center">
              <Link to="/">
                <img
                  src="./img/logo.png"
                  style={{ width: "185px" }}
                  alt="logo"
                />
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <h2>Forgot Password</h2>

              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon2"
                >
                  ยืนยัน
                </button>
              </div>
            </form>
          </div>
        </MDBCol>

        <MDBCol col="6" className="d-none d-md-block">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h2 className="mb-4">Net Zero Campus</h2>
              <p className="mb-0"  style={{fontSize:'18px'}}>
                โครงการที่เกิดจากความร่วมมือระหว่างมหาวิทยาลัยและสถาบันอุดมศึกษา
                โดยมีวัตถุประสงค์เพื่อผลักดันมหาวิทยาลัยในเครือข่ายให้บรรลุความเป็นกลางทางคาร์บอน
                และตอบโจทย์ความต้องการของประเทศด้านการจัดการก๊าซเรือนกระจก
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
};

export default ForgotPasswordForm;
