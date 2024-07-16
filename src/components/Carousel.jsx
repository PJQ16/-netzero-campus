import React, { useContext, useEffect, useState } from "react";
import './css/style.css'; // Import CSS file for animations
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import { YearContext } from "../pages";

const Counter = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const newValue = progress * (end - start) + start;
      setCount(newValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [start, end, duration]);

  return (
    <span className="text-center" style={{ fontSize: "32px", fontWeight: "bold" }}>
      {count.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
};

export default function Carousel() {
  const { listYear, setListYear, searchTerm, setSearchTerm, selectedYear, setSelectedYear } = useContext(YearContext);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [totalScope, setTotalScope] = useState([]);
  const [updatedScopenum, setUpdatedScopenum] = useState([]);

  const Scopenum = [
    { name: "ทั้งหมด", tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/thailand.jpeg" },
    { name: "SCOPE 1", tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/rescope1.jpeg" },
    { name: "SCOPE 2", tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/rescope2.jpeg" },
    { name: "SCOPE 3", tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/rescope3.jpeg" },
    { name: "รายงานแยก", tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/result.jpeg" },
    { name: "GHG Removal", tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/bg-body.jpg" },
  ];

  useEffect(() => {
    const fetchDataApi = async () => {
      try {
        const res = await axios.get(config.urlApi + `/netzero/${selectedYear}`);
        setTotalScope(res.data.result); // Assuming res.data contains the array of objects
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: e.message,
        });
      }
    };
    fetchDataApi();
  }, [selectedYear]); // Add selectedYear as a dependency

  useEffect(() => {
    if (totalScope.length > 0) {
      // Convert null tCO2e to 0 and calculate total tCO2e for the first item
      const totalTCO2e = totalScope.reduce((sum, scope) => sum + (parseFloat(scope.tCO2e) || 0), 0);

      // Update Scopenum with tCO2e values from totalScope
      const updated = Scopenum.map((item, index) => {
        if (index === 0) {
          return { ...item, tco2e: totalTCO2e };
        }
        const scopeData = totalScope.find((scope, scopeIndex) => scopeIndex === index - 1);
        return { ...item, tco2e: (scopeData ? (parseFloat(scopeData.tCO2e) || 0) : 0) };
      });

      setUpdatedScopenum(updated);
    }
  }, [totalScope]);

  const handleCardClick = () => {
    const element = document.getElementById("bar-chart");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container-fluid">
    <div className="row" style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL}/img/animate.gif)`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      width: '100%', 
      marginTop: '30px', 
      borderRadius: '20px' 
    }}>
      <div className="col-md-4 mt-5">
        {updatedScopenum.map((item, index) => (
          item.name === 'ทั้งหมด' && (
            <div className="col-12 " key={index} >
              <div className="card text-center my-2" style={{
                transition: "transform 0.3s ease-in-out",
                transform: hoveredCard === index ? "scale(1.1)" : "scale(1)",
                cursor: "pointer"
              }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={handleCardClick} >
                <div className="card-body">
                  <p className="h3">การปล่อยก๊าซเรือนกระจก<br />ของเครือข่ายมหาวิทยาลัย {/* {selectedYear+543} */}</p>
                  <p className="h3"><Counter start={0} end={item.tco2e} duration={1000} /> TCO<sub>2</sub>e</p>
                </div>
              </div>
            </div>
          )))}
      </div>
      
      <div className="col-md-4">
        <div className="col-12">
          <div className="card my-2">
            <div className="card-body text-center ">
              <p className="h3">จำนวนสถาบันที่รายงาน<br />การปล่อยก๊าซเรือนกระจก</p>
              <p className="h3">1 สถาบัน</p>
            </div>
          </div>
        </div>
        
        <div className="col-12">
          <div className="card my-2">
            <div className="card-body text-center">
              <p className="h3">จำนวนสถาบันการศึกษาทั้งหมด</p>
              <p className="h3">172 สถาบัน</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-md-4 text-center">
        {updatedScopenum.map((item, index) => (
          item.name !== 'ทั้งหมด' && item.name !== 'รายงานแยก' && (
            <div className="col-md-8" key={index}>
              <div className="card my-2">
                <div className="card-body ">
                  <p className="h3">{item.name} TCO<sub>2</sub>e</p>
                  <p className="h3"><Counter start={0} end={item.tco2e} duration={1000} /></p>
                </div>
              </div>
            </div>
          )))}
      </div>
    </div>
  </div>
  
  );
}
