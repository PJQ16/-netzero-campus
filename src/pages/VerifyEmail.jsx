import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../config";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
export default function VerifyEmail() {
  const { token } = useParams(); // เรียกใช้ useParams เป็นฟังก์ชัน
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${config.urlApi}/verify/${token}`
        );
        setMessage(response.data.message);
      } catch (error) {
        // แก้ไขการเข้าถึงข้อผิดพลาด
        setMessage(
           
            (error.response ? error.response.data.error : "Unknown error")
        );
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center ">
    <div className="card text-center bg-light ">
      <div className="card-body">
        {message === 'Invalid or expired token' ? 
        <>
         <h5 className="card-title fw-bold" style={{fontSize:'20px'}}>{message}</h5>
        <ClearIcon sx={{
          width: 400,     // กำหนดความกว้างของไอคอน
          height: 300,    // กำหนดความสูงของไอคอน
          color: 'red'  // กำหนดสีของไอคอน
        }}
        />
        <p className="card-text fw-bold" style={{fontSize:'20px'}}>
         Your token has expired
        </p>
        <Link to="/login" className="btn btn-primary">
          กลับไปที่หน้า Login
        </Link>
        
        </>
        :
        <>
        <h5 className="card-title">Verify your email</h5>
        <CheckIcon
        sx={{
          width: 400,     // กำหนดความกว้างของไอคอน
          height: 300,    // กำหนดความสูงของไอคอน
          color: 'green'  // กำหนดสีของไอคอน
        }}
        />
        <p className="card-text fw-bold" style={{fontSize:'20px'}}>
        คุณสามารถเข้าสู่ระบบและใช้งานระบบรายงานการปล่อยก๊าซเรือนกระจกของเราได้แล้ว
          <p>{message}</p>
        </p>
        <Link to="/login" className="btn btn-primary">
          กลับไปที่หน้า เข้าสู่ระบบ
        </Link>
        </>
        }
       
      </div>
    </div>
    </div>
  );
}
