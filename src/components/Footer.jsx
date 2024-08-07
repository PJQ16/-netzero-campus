import React from 'react'
import './pae/assets/css/demo/style.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'
import './pae/assets/vendors/css/vendor.bundle.base.css'
import './pae/assets/vendors/flag-icon-css/css/flag-icon.min.css'


function Footer() {


  return (

        <div className="page-wrapper mdc-toolbar-fixed-adjust">

        <footer>
            <div className="mdc-layout-grid">
              <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop">
                  <span className="text-center text-sm-left d-block d-sm-inline-block tx-14">Copyright ©  2024 | NET ZERO CAMPUS Version 1.0.0</span>
                </div>
                <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop d-flex justify-content-end">
          
                </div>
              </div>
            </div>
        </footer>
  
        </div>

  )
}

export default Footer