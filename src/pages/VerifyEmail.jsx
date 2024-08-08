import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../config";

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
        <img src="https://png.pngtree.com/png-vector/20220527/ourmid/pngtree-red-grunge-expired-rubber-stamp-png-image_4750216.png"
        alt="expried"
        className="w-100" />
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
        <img src="https://cdn.prod.website-files.com/639c99568848490eb3265dae/64c2c8ec1a7ebea427df2374_Open%%20Image%20-%20Verified%20Email.png"
        alt="verify"
        className="w-100" />
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
