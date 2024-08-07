import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
} from "mdb-react-ui-kit";
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // รีเซ็ตข้อความข้อผิดพลาดและข้อความสำเร็จ
        setError('');
        setSuccess('');

        // ตรวจสอบว่ารหัสผ่านไม่ว่างเปล่าและตรงกัน
        if (!password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post(config.urlApi + '/api/auth/reset-password', { token, password });
            Swal.fire(
                {
                    icon:'success',
                    title:'สำเร็จ',
                    text:'เปลี่ยนรหัสผ่านของท่านสำเร็จ',
                    timer:1200,
                    timerProgressBar:true,
                    showConfirmButton:false
                }
            );
            navigate('/login');

        } catch (error) {
            console.error(error);
            setError('Error resetting password');
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
                            <h2>Reset Password</h2>
                            <input
                                type="password"
                                placeholder="New password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='form-control my-2'
                            />
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className='form-control my-2'
                            />
                            <button type="submit" className='btn btn-secondary'>
                                Reset Password
                            </button>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {success && <div className="alert alert-success mt-3">{success}</div>}
                        </form>
                    </div>
                </MDBCol>
                <MDBCol col="6" className="d-none d-md-block">
                    <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h2 className="mb-4">Net Zero Campus</h2>
                            <p className="small mb-0">
                                โครงการที่เกิดจากความร่วมมือระหว่างมหาวิทยาลัยและสถาบันอุดมศึกษา โดยมีวัตถุประสงค์เพื่อผลักดันมหาวิทยาลัยในเครือข่ายให้บรรลุความเป็นกลางทางคาร์บอน และตอบโจทย์ความต้องการของประเทศด้านการจัดการก๊าซเรือนกระจก
                            </p>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default ResetPassword;
