import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FactoryIcon from "@mui/icons-material/Factory";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import Swal from "sweetalert2";
import config from "../config";

export default function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("The current button");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  
  const handleLinkClick = (linkText) => {
    setActiveLink(linkText);
    setSidebarVisible(false); // Hide sidebar after link click
  };

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

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
          navigate('/');
        }
      })
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <button 
        className="btn btn-primary d-md-none" 
        onClick={handleSidebarToggle}
        style={{position: 'fixed', top: 10, left: 10, zIndex: 1000}}
      >
        <MenuIcon />
      </button>
      <div 
        className={`col-lg-2 col-md-2 col-sm-12 p-3 mx-3 sidebar ${sidebarVisible ? 'd-block' : 'd-none d-md-block'}`} 
        style={{ backgroundColor:''}}
      >
        <div className="list-group text-decoration-none" style={{border:'1px solid #ffffff'}}>
          <Link
            to="/"
            className={`list-group-item list-group-item-action ${
              location.pathname === "/" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("The current button")}
            style={{backgroundColor:'#6BAB90'}}
          >
            <EqualizerIcon /> Dashboard
          </Link>

          <Link
            to="/about"
            className={`list-group-item list-group-item-action ${
              location.pathname === "/about" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("The current button")}
            style={{backgroundColor:'#6BAB90'}}
          >
            <FormatLineSpacingIcon /> เกี่ยวกับ
          </Link>

          <Link
            to={`/Activitydata`}
            className={`list-group-item list-group-item-action ${
              location.pathname === "/Activitydata" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("A second button item")}
            style={{backgroundColor:'#6BAB90'}}
          >
            <FactoryIcon />การกรอกข้อมูลการปล่อยก๊าซเรือนกระจก
          </Link>
          <button
            type="button"
            className={`list-group-item list-group-item-action ${
              location.pathname === "/signout" ? "active" : ""
            }`}
            onClick={handlerSignOut}
            style={{backgroundColor:'#6BAB90'}}
          >
            <ExitToAppIcon /> ออกจากระบบ
          </button>
        </div>
      </div>
    </>
  );
}
