import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Tab/styles/styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
function SignIn() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handlerLogin = async () => {
    try {
      const payload = {
        email: email,
        password: password,
      };

      const res = await axios.post(config.urlApi + "/users/login", payload);

      if (res.data.message === "success") {
        Swal.fire({
          title: "Sign In",
          icon: "success",
          text: "เข้าสู่ระบบเรียบร้อยแล้ว",
          timer: 800,
          timerProgressBar: true,
        });
        localStorage.setItem(config.token_name, res.data.token);
        navigate("/dashboard");
      } else if (res.data.message === "User not found") {
        Swal.fire({
          title: "Sign In",
          icon: "warning",
          text: "ไม่พบข้อมูลในระบบ",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (e) {
      toast.error("ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง", { autoClose: 1000 });
    }
  };

  const validateEmail = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
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

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              placeholder="email@email.com"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              id="email"
            />
            {emailError && <p className="text-danger">{emailError}</p>}
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              id="password"
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}

            <div className="text-center pt-1 mb-5 pb-1">
              {email && password !== "" ? (
                <button
                  className="btn mb-4 w-100 gradient-custom-2 "
                  onClick={handlerLogin}
                >
                  เข้าสู่ระบบ
                </button>
              ) : (
                <button className="btn mb-4 w-100 gradient-custom-2 " disabled>
                  เข้าสู่ระบบ
                </button>
              )}
            {/*   <a className="text-muted" href="#!">
                Forgot password?
              </a> */}
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">โปรดลงทะเบียน เพื่อเข้าสู่ระบบ</p>
              <Link to="/signUp">
                <button className="btn btn-outline-success mx-2">
                  ลงทะเบียน
                </button>
              </Link>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="d-none d-md-block">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h2 className="mb-4">Net Zero</h2>
              <p className="small mb-0">
                Net Zero คือแนวคิดในการลดการปล่อยก๊าซเรือนกระจกสุทธิให้เป็นศูนย์
                โดยการลดการปล่อยก๊าซและการดูดซับก๊าซให้มีปริมาณเท่ากัน
                ซึ่งเป็นสิ่งสำคัญในการต่อสู้กับการเปลี่ยนแปลงสภาพภูมิอากาศ
                โดยการนำเอามาตรการต่าง ๆ มาปฏิบัติ เช่น การใช้พลังงานทดแทน
                การปรับปรุงประสิทธิภาพการใช้พลังงาน และการปลูกต้นไม้
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignIn;
