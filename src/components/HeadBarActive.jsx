import React, { useContext } from 'react'
import './pae/assets/css/demo/style.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import './pae/assets/vendors/css/vendor.bundle.base.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import { UserContext } from './MyContext'
import config from '../config'
import { ActiveDSBContext } from '../pages/ActiveDashboard'
import CalendaActive from './CalendaActive'
import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FindInPageIcon from '@mui/icons-material/FindInPage';

function HeadBarActive() {

const {selectedYear} = useContext(ActiveDSBContext);
const {userData} = useContext(UserContext);

  return (

        <header className="mdc-top-app-bar">
          <div className="mdc-top-app-bar__row">
            <div className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button sidebar-toggler">menu</button>
              <span className=""></span>
              <div className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon search-text-field d-none d-md-flex">
              <i className="material-icons mdc-text-field__icon">search</i>
               <CalendaActive /> 
               <input className="mdc-text-field__input" readOnly value='ค้นหาปีที่รายงาน' onChange={(e) => selectedYear(e.target.value)} id="text-field-hero-input" />
                <div className="mdc-notched-outline">
                <div className="mdc-notched-outline__leading"></div>
                  <div className="mdc-notched-outline__notch">
                    <label htmlFor="text-field-hero-input" className="mdc-floating-label" placeholder="ค้นหามหาวิทยาลัย"></label>
                  </div>
                  <div className="mdc-notched-outline__trailing"></div>
                </div>
              </div>
            </div>
            <div className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end mdc-top-app-bar__section-right">
           {/*  <Tooltip title='Help Desk' placement='top'>
            <div className="btn-group">
            <button type="button" class="btn rouned" data-bs-toggle="dropdown" aria-expanded="false"><SettingsIcon/></button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#"><HeadphonesIcon/> ติดต่อเรา</a></li>
              <li><a className="dropdown-item" href="#"><PsychologyAltIcon/> แจ้งปัญหา</a></li>
              <li><a className="dropdown-item" href="#"><MenuBookIcon/> คู่มือการใช้งาน</a></li>
              <li><Link className="dropdown-item" to="/reference"><FindInPageIcon/> เอกสารอ้างอิง</Link></li>
            </ul>
          </div>
          </Tooltip> */}
              <div className="menu-button-container menu-profile d-none d-md-block">
                <button className="mdc-button mdc-menu-button">
                  <span className="d-flex align-items-center">
                  {userData.firstname !== '' ? (
                    <>
                     <span className="figure">
                    {/*   <img src={`${config.urlApi}/logos/${userData.logo}`} className="user" /> */}
                       </span>
                       <span className="user-name">
                         {userData.firstname}
                       </span>
                    </>
                        
                      ) : (
                        <>
                         
                        </>
)}

                      </span>
                </button>

                  <div className="mdc-menu mdc-menu-surface" tabIndex="-1">

                    <ul className="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical">
               
                    <li className="mdc-list-item" role="menuitem">
                      <div className="item-thumbnail item-thumbnail-icon-only">
                        <i className="mdi mdi-account-edit-outline text-primary"></i>
                      </div>
                      <div className="item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="item-subject font-weight-normal">Edit profile</h6>
                      </div>
                    </li>
                    <li className="mdc-list-item" role="menuitem">
                      <div className="item-thumbnail item-thumbnail-icon-only">
                        <i className="mdi mdi-settings-outline text-primary"></i>                      
                      </div>
                      <div className="item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="item-subject font-weight-normal">Logout</h6>
                      </div>
                    </li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </header>

  )
}

export default HeadBarActive