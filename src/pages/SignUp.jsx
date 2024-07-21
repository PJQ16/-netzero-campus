import React, { useState, useEffect } from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import qs from 'qs';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [campuies, setCampuies] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetSelectData();
  }, []);

  const fetSelectData = async () => {
    try {
      const response = await axios.get(config.urlApi + "/place/showAllPlace");
      setCampuies(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleCampusChange = async (event) => {
    const selectedCampusId = event.target.value;
    setSelectedCampusId(selectedCampusId);

    const selectedCampus = campuies.find((campus) => campus.id === selectedCampusId);
    if (selectedCampus) {
      setFaculties(selectedCampus.faculties || []);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!firstName) validationErrors.firstName = 'กรุณากรอกชื่อผู้ใช้งาน';
    if (!surName) validationErrors.surName = 'กรุณากรอกนามสกุล';
    if (!email) validationErrors.email = 'กรุณากรอกอีเมลล์';
    if (!password) {
      validationErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (!passwordPattern.test(password)) {
      validationErrors.password = 'รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่ 1 ตัว, ตัวเลข 1 ตัว, อักขระพิเศษ 1 ตัว และความยาวอย่างน้อย 8 ตัว';
    }
    if (!selectedCampusId) validationErrors.selectedCampusId = 'กรุณาเลือกวิทยาเขต';
    if (!selectedFacultyId) validationErrors.selectedFacultyId = 'กรุณาเลือกหน่วยงาน';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      handlerRegister();
    }
  };

  const handlerRegister = async () => {
    try {
      const payload = {
        fname: firstName,
        sname: surName,
        email: email,
        password: password,
        role_id: 4,
        fac_id: selectedFacultyId
      };

      const formData = qs.stringify(payload);

      Swal.fire({
        icon: 'question',
        title: 'แน่ใจหรือไม่?',
        text: 'ต้องการสมัครสมาชิกใช่หรือไม่',
        showCancelButton: true
      }).then(async (res) => {
        if (res.isConfirmed) {
          try {
            await axios.post(config.urlApi + '/users/Addusers', formData, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            });
            Swal.fire({
              icon: 'success',
              title: 'สำเร็จ',
              text: 'สมัครสมาชิกสำเร็จ',
              showConfirmButton: false,
              timer: 2000
            });
            navigate('/login');
          } catch (error) {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถสมัครสมาชิกได้'
            });
          }
        }
      });
    } catch (e) {
      console.log(e.message);
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
              <div className="row">
                <div className="col-md-6 col-sm-12 my-2">
                  <label>ชื่อผู้ใช้งาน</label>
                  <input
                    type="text"
                    className={`form-control p-2 shadow-sm ${errors.firstName ? 'is-invalid' : ''}`}
                    placeholder="ชื่อ"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                <div className="col-md-6 col-sm-12 my-2">
                  <label>นามสกุล</label>
                  <input
                    type="text"
                    className={`form-control p-2 shadow-sm ${errors.surName ? 'is-invalid' : ''}`}
                    placeholder="นามสกุล"
                    onChange={(e) => setSurName(e.target.value)}
                  />
                  {errors.surName && <div className="invalid-feedback">{errors.surName}</div>}
                </div>

                <div className="col-md-12 col-sm-12 my-2">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control p-2 shadow-sm ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="อีเมลล์"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-12 col-sm-12 my-2">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    className={`form-control p-2 shadow-sm ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="รหัสผ่าน"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="col-md-6 col-sm-12 my-2">
                  <label>สังกัด</label>
                  <select
                    className={`form-control p-2 shadow-sm ${errors.selectedCampusId ? 'is-invalid' : ''}`}
                    value={selectedCampusId}
                    onChange={handleCampusChange}
                    required
                  >
                    <option value="">เลือกวิทยาเขต</option>
                    {campuies.map((campus) => (
                      <option key={campus.id} value={campus.id}>
                        {campus.campus_name}
                      </option>
                    ))}
                  </select>
                  {errors.selectedCampusId && <div className="invalid-feedback">{errors.selectedCampusId}</div>}
                </div>

                <div className="col-md-6 col-sm-12 my-2">
                  <label>ชื่อสถานศึกษา</label>
                  <select
                    className={`form-control p-2 shadow-sm ${errors.selectedFacultyId ? 'is-invalid' : ''}`}
                    value={selectedFacultyId}
                    onChange={(e) => setSelectedFacultyId(e.target.value)}
                    required
                  >
                    <option value="">เลือกหน่วยงาน</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.fac_name}
                      </option>
                    ))}
                  </select>
                  {errors.selectedFacultyId && <div className="invalid-feedback">{errors.selectedFacultyId}</div>}
                </div>
              </div>
              <button className="btn btn-primary w-100">ลงทะเบียน</button>
            </form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4 mt-3">
              <p className="mb-0">กลับสู่หน้าเข้าสู่ระบบ</p>
              <Link to="/login">
                <button className="btn btn-outline-primary mx-2">
                  เข้าสู่ระบบ
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

export default SignUp;
