import React, {useEffect, useState } from 'react'
import Main from '../components/Main';
import Footer from '../components/Footer';
import AsideBar from '../components/AsideBar';
import HeadBar from '../components/HeadBar';

function NewDashBoard() {
   
  
  return (
      <div className="body-wrapper">
      <AsideBar /> 
      <div className="main-wrapper mdc-drawer-app-content">
      <HeadBar />
      <Main />
      <Footer />
      </div>
    </div>
   
  );
}

export default NewDashBoard;
