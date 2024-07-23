import React, { useContext } from 'react'
import './pae/assets/css/demo/style.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import './pae/assets/vendors/css/vendor.bundle.base.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import { UserContext } from './MyContext'
import config from '../config'
import { ActiveDSBContext } from '../pages/ActiveDashboard'
import CalendaActive from './CalendaActive'


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
               <input className="mdc-text-field__input" value={selectedYear + 543} onChange={(e) => selectedYear(e.target.value)} id="text-field-hero-input" />
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
              <div className="menu-button-container menu-profile d-none d-md-block">
                <button className="mdc-button mdc-menu-button">
                  <span className="d-flex align-items-center">
                  {userData.firstname !== '' ? (
                    <>
                     <span className="figure">
                         <img src={`${config.urlApi}/logos/${userData.logo}`}  className="user" />
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