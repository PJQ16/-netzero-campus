import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const [email,setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password,setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();
  
  const handlerLogin = async () => {
    try {
         const payload = {
            email: email,
            password: password
        }
       
         const res = await axios.post(config.urlApi + '/users/login', payload)
  
        if (res.data.message === 'success') {
            Swal.fire({
                title: 'Sign In',
                icon: 'success',
                text: 'เข้าสู่ระบบเรียบร้อยแล้ว',
                timer: 800,
                timerProgressBar: true
            })
            localStorage.setItem(config.token_name, res.data.token);
            navigate('/Activitydata');
        } else if (res.data.message === 'User not found'){
            Swal.fire({
                title: 'Sign In',
                icon: 'warning',
                text: 'ไม่พบข้อมูลในระบบ',
                timer: 2000,
                timerProgressBar: true
            })
        } 
    } catch (e) {
        toast.error( 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง',{autoClose:1000});
       
    }
  }
  
  const validateEmail = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };
  
  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };
  return (
    <>
    <ToastContainer />
    <Navbar/>
    <div className="d-flex justify-content-evenly align-items-center vh-100  bg-light" style={{marginTop:'-200px'}}
>
      <div className="card shadow  p-2 mt-5 mb-1 bg-transparent rounded" style={{ width: '400px' }}>
        <div className="card-body">
        <h1 className="card-title  text-center mb-4"><img src={process.env.PUBLIC_URL + '/img/logo.png'} width={300} height={250} alt="Net Zero Campus" /></h1>
            <div className="mb-3">
              <label htmlFor='email' className=''>Username</label>
              <input
                type='email'
                className='form-control p-3 shadow-sm'
                placeholder='email@email.com'
                onChange={(e)=>setEmail(e.target.value)}
                onBlur={validateEmail}
                id='email'
              />
                {emailError && <p className='text-danger'>{emailError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor='password' className=''>Password</label>
              <input
                type='password'
                required
                className='form-control p-3 shadow-sm'
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                onBlur={validatePassword} 
                id='password'
              />
               {passwordError && <p className='text-danger'>{passwordError}</p>}
            </div>
            {email && password !== ''? <button className='btn btn-dark shadow-sm' onClick={handlerLogin}>
              <i className='fa-solid fa-right-to-bracket'></i> เข้าสู่ระบบ
              </button>
                : <button className='btn btn-secondary shadow-sm' disabled>
                <i className="fa-solid fa-lock"></i> เข้าสู่ระบบ
              </button> }
             <Link to='/forgot-password'><button className='btn btn-secondary ms-2 shadow-sm'>
                <i className="fa-solid fa-lock"></i> ลืมรหัสผ่าน
              </button> 
              </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Login;
