import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config';
import { UserContext } from './MyContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import FactoryIcon from "@mui/icons-material/Factory";
import SearchComponent from './Search'; 

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const { fac_id, years } = useParams();
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
     

    } catch (error) {

    }
  };

  const handleGoBack = () => {
    Swal.fire({
      title: 'ย้อนกลับ',
      text: 'คุณต้องการย้อนกลับหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/activitydata');
      }
    });
  };
  
  const enterFullScreen = () => {
    document.documentElement.requestFullscreen();
  };

  const exitFullScreen = () => {
    document.exitFullscreen();
  };

  const handleButtonClick = () => {
    if (document.fullscreenElement) {
      fetchData();
      exitFullScreen();
    } else {
      enterFullScreen();
      fetchData();
    }
  };

  const goLogin = () =>{
    navigate('/login');
  }

  const goFirstPage = () =>{
    navigate('/');
  }
  const isActivityDetailPage = fac_id && years;

  const handlerSignOut = (event) => {
    try {
      event.preventDefault();
      
      Swal.fire({
        icon: 'question',
        title: 'ออกจากระบบ',
        text: 'ต้องการออกจากระบบหรือไม่?',
        showConfirmButton: true,
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'ออกจากระบบ',
            text: 'ออกจากระบบเรียบร้อย',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 800,
            timerProgressBar: true,
          })
          localStorage.removeItem(config.token_name);
          navigate('/login');
        }
      })
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand"  to="#"><img src={process.env.PUBLIC_URL + '/img/logo.png'} width={300} height={150} alt="Brand Logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse  navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  me-auto mb-2 mb-lg-0 ">
            

          {location.pathname === '/login' && (
             <li className="nav-item ">
               <Link className="nav-link " to='/' onClick={goFirstPage}><HomeIcon /> Home</Link>
             </li>
             
            )}
           
            
            {isActivityDetailPage && (
            <li className="nav-item">
              <Link className="nav-link " to="#"  onClick={handleGoBack} ><ExitToAppIcon /> ย้อนกลับ</Link>
            </li>
              )}
              {location.pathname === '/' && (
                <>
               <li className="nav-item">
               <Link className="nav-link " to="/login" onClick={goLogin} ><LoginIcon /> เข้าสู่ระบบ</Link>
             </li>
                  {/*   <Calenda />  */}
                  {/*  <SearchComponent />   */}
                </>
              )}

              {location.pathname !== '/' && location.pathname !== '/login' && (
                    <li className="nav-item"  onClick={handleButtonClick}>
                        <Link className='nav-link' to="#">{document.fullscreenElement ? <TransitEnterexitIcon/>: <AspectRatioIcon/>}</Link>
                    </li>
              )}
            
          </ul>
        </div>
      </div>
    </nav>

    <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img src={process.env.PUBLIC_URL + '/img/logo.png'} width={300} height={200} style={{marginTop:'-25px',marginBottom:'-50px'}} alt="Brand Logo" /></h5>
        <button type="button" className="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
        {location.pathname === '/login' && (
             <li className="nav-item ">
               <Link className="nav-link " to='/' onClick={goFirstPage}><HomeIcon /> Home</Link>
             </li>
             
            )}
           

           {location.pathname === '/home' &&(
            <>
             <li className="nav-item ">
               <Link className="nav-link " to='/home' onClick={goFirstPage}><HomeIcon /> หน้าแรก</Link>
             </li>
              <li className="nav-item ">
              <Link className="nav-link " to='/Activitydata' onClick={goFirstPage}><FactoryIcon /> การกรอกข้อมูลการปล่อยก๊าซเรือนกระจก</Link>
            </li>
            <button
            type="button"
            className={`list-group-item list-group-item-action ${
              location.pathname === "/signout" ? "active" : ""
            }`}
            onClick={handlerSignOut}
          >
            <ExitToAppIcon /> ออกจากระบบ
          </button>
            </>
            
             
            )}

            {location.pathname === '/Activitydata' &&(
            <>
             <li className="nav-item ">
               <Link className="nav-link " to='/home' onClick={goFirstPage}><HomeIcon /> หน้าแรก</Link>
             </li>
              <li className="nav-item ">
              <Link className="nav-link " to='/Activitydata' onClick={goFirstPage}><FactoryIcon /> การกรอกข้อมูลการปล่อยก๊าซเรือนกระจก</Link>
            </li>
            <button
            type="button"
            className={`list-group-item list-group-item-action ${
              location.pathname === "/signout" ? "active" : ""
            }`}
            onClick={handlerSignOut}
          >
            <ExitToAppIcon /> ออกจากระบบ
          </button>
            </>
            
             
            )}
            
            
            {isActivityDetailPage && (
            <li className="nav-item">
              <Link className="nav-link " to="#"  onClick={handleGoBack} ><ExitToAppIcon /> ย้อนกลับ</Link>
            </li>
              )}
              {location.pathname === '/' && (
                <>
               <li className="nav-item">
               <Link className="nav-link " to="/login" onClick={goLogin} ><LoginIcon /> เข้าสู่ระบบ</Link>
             </li>
          {/*    <Calenda /> */}
            {/*     <SearchComponent /> */}
                </>
              )}

              {location.pathname !== '/' && location.pathname !== '/login' && (
                    <li className="nav-item"  onClick={handleButtonClick}>
                        <Link className='nav-link' to="#">{document.fullscreenElement ? <TransitEnterexitIcon/>: <AspectRatioIcon/>}</Link>
                    </li>
              )}
    
        </ul>
        
      </div>
    </div>
    </div>
  );
}


export default Navbar;
