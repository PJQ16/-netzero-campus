import React, { useContext, useEffect } from 'react';
import logo from './pae/assets/images/logo.svg';
import './pae/assets/css/demo/style.css';
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css';
import './pae/assets/vendors/css/vendor.bundle.base.css';
import { MDCDrawer } from '@material/drawer';
import PerfectScrollbar from 'perfect-scrollbar';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './MyContext';
import config from '../config';
import Swal from 'sweetalert2';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import axios from 'axios';

function AsideBar() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [userData.facultyID]);

  const fetchData = async () => {
    try {
      const response = await axios.get(config.urlApi + '/users/showUserApi', config.headers());

      if (response.data.message === 'success') {
        setUserData({
          firstname: response.data.result.fname,
          surname: response.data.result.sname,
          roleName: response.data.result.role.role_name,
          facultyName: response.data.result.faculty.fac_name,
          campusName: response.data.result.faculty.campus.campus_name,
          facultyID: response.data.result.faculty.id,
          campusID: response.data.result.faculty.campus_id,
          latitude: response.data.result.faculty.latitude,
          longitude: response.data.result.faculty.longitude,
          logo: response.data.result.faculty.logo
        });
      } else {
        // กรณีที่ไม่สำเร็จ อาจจะตั้งค่า userData เป็นค่าว่าง
        setUserData({});
      }
    } catch (error) {
      console.error(error);
      setUserData({});
    }
  };

  const handlerSignOut = (event) => {
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
        });
        localStorage.removeItem(config.token_name);
        setUserData({});
        navigate('/');
      }
    });
  };

  useEffect(() => {
    const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

    document.querySelector('.sidebar-toggler').addEventListener('click', () => {
      drawer.open = !drawer.open;
    });

    if (window.matchMedia('(max-width: 991px)').matches) {
      const dismissibleDrawer = document.querySelector('.mdc-drawer.mdc-drawer--dismissible');
      if (dismissibleDrawer && dismissibleDrawer.classList.contains('mdc-drawer--open')) {
        dismissibleDrawer.classList.remove('mdc-drawer--open');
      }
    }

    const current = window.location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    document.querySelectorAll('.mdc-drawer-item .mdc-drawer-link').forEach((link) => {
      if (current === "") {
        if (link.getAttribute('href').includes("index.html")) {
          link.classList.add('active');
          const expansionPanel = link.closest('.mdc-expansion-panel');
          if (expansionPanel) {
            expansionPanel.classList.add('expanded');
          }
        }
      } else {
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
          const expansionPanel = link.closest('.mdc-expansion-panel');
          if (expansionPanel) {
            expansionPanel.classList.add('expanded');
            expansionPanel.style.display = 'block';
          }
        }
      }
    });

    document.querySelectorAll('[data-toggle="expansionPanel"]').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        document.querySelectorAll('.mdc-expansion-panel').forEach((panel) => {
          if (panel !== document.getElementById(toggle.getAttribute("data-target"))) {
            panel.style.display = 'none';
            panel.previousElementSibling.classList.remove('expanded');
          }
        });

        const targetPanel = document.getElementById(toggle.getAttribute("data-target"));
        if (targetPanel) {
          targetPanel.style.display = targetPanel.style.display === 'block' ? 'none' : 'block';
          toggle.classList.toggle('expanded');
        }
      });
    });

    document.querySelectorAll('.mdc-drawer-item .mdc-expansion-panel').forEach((panel) => {
      const previousElement = panel.previousElementSibling;
      if (previousElement && previousElement.getAttribute('data-toggle') === 'expansionPanel') {
        previousElement.addEventListener('click', () => {
          previousElement.classList.toggle('expanded');
        });
      }
    });

    if (!document.body.classList.contains("rtl")) {
      if (document.querySelector('.mdc-drawer .mdc-drawer__content')) {
        new PerfectScrollbar('.mdc-drawer .mdc-drawer__content');
      }
    }
  }, []);

  return (
    <aside className="mdc-drawer mdc-drawer--dismissible mdc-drawer--open">
      <div className="mdc-drawer__header">
        {userData && userData.firstname ? (
          <Link to={'/dashboard'} className="brand-logo"><img src={logo} alt="logo" /></Link>
        ) : (
          <Link to={'/'} className="brand-logo"><img src={logo} alt="logo" /></Link>
        )}
      </div>
      <div className="mdc-drawer__content">
        <div className="mdc-list-group">
          <nav className="mdc-list mdc-drawer-menu">
            <div className="mdc-list-item mdc-drawer-item">
              {userData && userData.firstname ? (
                <Link to={'/dashboard'} className="mdc-drawer-link">
                  <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">home</i>
                  Dashboard
                </Link>
              ) : (
                <Link to={'/'} className="mdc-drawer-link">
                  <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">home</i>
                  Dashboard
                </Link>
              )}
            </div>


            {userData && userData.firstname && (
            <div className="mdc-list-item mdc-drawer-item">

                <Link  to={`/activitydata`} className="mdc-drawer-link">
                  <i className="material-icons mdc-list-item__start-detail mdc-drawer-item-icon" aria-hidden="true">info</i>
                  กรอกข้อมูล
                </Link>
            </div>
            )}
            

            {userData && userData.firstname ? (
              <div className="mdc-list-item mdc-drawer-item">
                <a href={'#'} onClick={handlerSignOut} className="mdc-drawer-link">
                  <MeetingRoomIcon />
                  ออกจากระบบ
                </a>
              </div>
            ) : (
              <div className="mdc-list-item mdc-drawer-item">
                <Link to={'/login'} className="mdc-drawer-link">
                  <MeetingRoomIcon />
                  เข้าสู่ระบบ
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default AsideBar;
