import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';

const ForgotPassword = () => {

  const [email,setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password,setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();
  
  const handlerLogin = async () => {
    try {
         const payload = {
            email: email,
        }
       
         const res = await axios.post(config.urlApi + '/forgot-password', payload)
  
        if (res.data.message === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'New password sent to your email.',
              });
            
           
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
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: e.response?.data || 'Something went wrong!',
          });
    }
  }
  
  const validateEmail = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };
  
  
  return (
    <>
    <Navbar/>
    <div className="d-flex justify-content-center align-items-center vh-100  bg-light"  style={{marginTop:'-240px'}}  
>
<div className="card shadow-lg border-2 border-top-0 border-bottom-0  p-2 mb-1 bg-transparent rounded" style={{ width: '400px' }}>
        <div className="card-body">
        <h1 className="card-title  text-center mb-4"><img src={`${process.env.PUBLIC_URL}/img/logo.png`} width={300} height={150} style={{marginBottom:'-30px'}}/></h1>
          <h3 className="card-title text-center mb-4">ลืมรหัสผ่าน</h3>
            <div className="mb-3">
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className='form-control p-3 shadow-sm'
                placeholder='ระบุ อีเมล์ของคุณ'
                onChange={(e)=>setEmail(e.target.value)}
                onBlur={validateEmail}
                id='email'
              />
                {emailError && <p className='text-danger'>{emailError}</p>}
            </div>

            {email.length > 0 ? 
            <button className='btn btn-dark shadow-sm' onClick={handlerLogin}>
              <i className='fa-solid fa-right-to-bracket'></i> ยืนยัน
              </button>
              :
              <button className='btn btn-dark shadow-sm' disabled>
              <i className='fa-solid fa-right-to-bracket'></i> ยืนยัน
              </button>
              }

             <Link to='/login'><button className='btn btn-secondary ms-2 shadow-sm'>
                <i className="fa-solid fa-lock"></i> กลับ
              </button> 
              </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ForgotPassword;
