import React, { createContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import '../components/css/style.css';
import HalfPage from '../components/HalfPage';
import Education from '../components/Education';
import StackChart from '../components/BarChart';
import axios from 'axios';
import config from '../config';
import Swal from 'sweetalert2';

export const YearContext = createContext();

function Index() {
  const [listYear, setListYear] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchDataApi = async (year) => {
    try {
      const res = await axios.get(`${config.urlApi}/activity/showPeriod?year=${year}`);
      setListYear(res.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
      });
    }
  };

  useEffect(() => {
    fetchDataApi(selectedYear);
  }, [selectedYear]);

  return (
    <YearContext.Provider value={{ listYear, setListYear, searchTerm, setSearchTerm, selectedYear, setSelectedYear }}>
      <div className='container-fluid'>
        <Navbar />
        <Carousel />
        <section id="bar-chart">
          <StackChart />
        </section>
        <HalfPage/>
        <Education />
        <Footer />
      </div>
    </YearContext.Provider>
  );
}

export default Index;
