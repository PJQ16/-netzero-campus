import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ActivityData from './pages/ActivityData';
import ActivityDetail from './pages/ActivityDetail';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { UserDataProvider } from './components/MyContext';
import NotFound from './pages/NotFound';
import './index.css';
import Index from './pages/index';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';




function App() {
  const navigate = useNavigate();
  const [spinners, setSpinners] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinners(false);
    }, 2000);
  }, []);


  return (
    <>
      {spinners ? (
        <div style={{
          backgroundColor: '#FFFFFF',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: 'column', // Ensure items stack vertically on smaller screens
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
          margin: 0,
        }}>
          <img src={process.env.PUBLIC_URL + '/img/logo.png'} style={{ maxWidth: '25%', height: 'auto' }} /> {/* Ensure the image is responsive */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="spinner-grow" style={{color:'#4F9031'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#48832D'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#417729'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#3B6C25'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#366222'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#31591F'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#2D511C'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow"  style={{color:'#294A19'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <UserDataProvider>
          <Routes>
            <Route path='/login' element={<Login/>} />
           {/*  <Route path='/' element={<Index />} /> */}
            <Route path='/about' element={<Home />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/activitydata' element={<ActivityData  />} />
            <Route path='/activityDetail/:campus_id/:fac_id/:years/:id' element={<ActivityDetail/>} />
            <Route path='/' element={<Dashboard/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </UserDataProvider>
      )}
    </>
  );
}

export default App;
