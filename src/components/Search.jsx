import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import StackOffsetDemo from "./Chart";
import PieChartWithCenterLabel from "./PieChart";
import './css/style.css';
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { YearContext } from "../pages/Dashboard";

const Counter = ({ start, end, duration, key }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const newValue = progress * (end - start) + start;
      setCount(newValue.toFixed(2)); // Convert new value to 2 decimal places
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [start, end, duration, key]);

  return (
    <span className="counter">
      {parseFloat(count).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
};

const SearchComponent = () => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [counterKey, setCounterKey] = useState(0);
  const [universitiesData, setUniversitiesData] = useState([]);
  const [universityInfo, setUniversityInfo] = useState([]);
  const [updatedScopenum, setUpdatedScopenum] = useState([]);
  const [listYear, setListYear] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Add state for selectedId

  const { selectedYear, setSelectedYear } = useContext(YearContext);
  // Function to fetch data for the selected ID

  const fetchDataApi = async (selectedId) => {
    try {
      const res = await axios.get(config.urlApi + `/netzeroListyearUniversity/${selectedId}/${selectedYear}`);
      setListYear(res.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
      });
    }
  };

  // Call fetchDataApi whenever selectedId changes
  useEffect(() => {
    if (selectedId) {
      fetchDataApi(selectedId);
    }
  }, [selectedId, selectedYear]);

  const transformData = (data) => {
    const years = data.map((item) => (parseInt(item.years) + 543).toString()); // Convert to BE
    const scopes = {};

    data.forEach((item) => {
      item.datascope.forEach((scope) => {
        if (!scopes[scope.name]) {
          scopes[scope.name] = [];
        }
        scopes[scope.name].push(scope.tCO2e);
      });
    });

    // Define colors for each series
    const colors = {
      
      "Scope 1": "#0E3B43",
      "Scope 2": "#357266",
      "Scope 3": "#A3BBAD",
      'Biogenic Carbon': "#65532F",
      'GHG Removal': "#312509",
    };

    return {
      years,
      series: Object.keys(scopes).map((scope) => ({
        label: scope,
        data: scopes[scope], // Include all data points for each scope
        color: colors[scope], // Set the color for each series
      })),
    };
  };

  const { years, series } = transformData(listYear);

  const fetchData = async (selectedId) => {
    try {
      const res = await axios.get(`${config.urlApi}/place/showFaculty`);
      const info = await axios.get(`${config.urlApi}/netzeroUniversity/${selectedId}/${selectedYear}`);
      setUniversityInfo(info.data.result); // Assuming info.data contains necessary university information
      setUniversitiesData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch when component mounts
  }, [selectedId, selectedYear]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setCounterKey(counterKey + 1); // Update counterKey to trigger Counter animation
    setShow(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = async (option) => {
     await setSelectedOption(option);
     await setSelectedId(option.id); // Set the selectedId
    await fetchData(option.id); // Call fetchData with selected option id
    await handleShow();
  };

  // Define options based on universitiesData
  const options = universitiesData.map((university, index) => ({
    fac_name: university.fac_name,
    id: university.id,
  }));

  const Scopenum = [
    { name: "TOTAL EMISSIONS",title:'', tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/1.png" },
    { name: "SCOPE 1", tco2e: 0,title:'DIRECT EMISSIONS', pic: process.env.PUBLIC_URL + "/img/dashboard/2.png" },
    { name: "SCOPE 2", tco2e: 0,title:'INDIRECT EMISSIONS', pic: process.env.PUBLIC_URL + "/img/dashboard/3.png" },
    { name: "SCOPE 3", tco2e: 0,title:'INDIRECT EMISSIONS', pic: process.env.PUBLIC_URL + "/img/dashboard/4.png" },
    { name: "BIOGENIC CARBON",title:'EMISSIONS', tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/5.png" },
    { name: "GHG REMOVAL",title:'', tco2e: 0, pic: process.env.PUBLIC_URL + "/img/dashboard/6.png" },
  ];

  useEffect(() => {
    if (universityInfo.length > 0) {
      // Convert null tCO2e to 0 and calculate total tCO2e for the first item
      const totalTCO2e = universityInfo.reduce((sum, scope) => sum + (parseFloat(scope.tCO2e) || 0), 0);

      // Update Scopenum with tCO2e values from universityInfo
      const updated = Scopenum.map((item, index) => {
        if (index === 0) {
          return { ...item, tco2e: totalTCO2e };
        }
        const scopeData = universityInfo[index - 1]; // Adjust index since Scopenum starts from index 0
        return { ...item, tco2e: (scopeData ? (parseFloat(scopeData.tCO2e) || 0) : 0) };
      });

      setUpdatedScopenum(updated); // Update state variable setUpdatedScopenum with updated array
    }
  }, [universityInfo]);

  return (
    <div>
      <div className="dropdown drop-end">
        <li
          className="dropdown-toggle  mt-2"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <SearchIcon />
          ค้นหาชื่อสถาบันการศึกษา
        </li>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ maxHeight: '200px', overflowY: 'scroll', maxWidth: '250px' }}>
          <li className="px-3 py-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </li>
          {options
            .filter((option) =>
              option.fac_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((option, index) => (
              <React.Fragment key={index}>
                <li key={index}>
                  <span className="dropdown-item-text">
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect(option)}
                    >
                      {option.fac_name}
                    </button>
                  </span>
                </li>
              </React.Fragment>
            ))}
        </ul>
      </div>

      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-fullscreen wrapper">
          <div
            className="modal-content"
            style={{
             
              backgroundSize: 'cover',
              backgroundRepeat: "no-repeat",
            }}
          >
            {[...Array(30)].map((_, index) => (
              <div key={index} className="bubble">
                <span className="dot"></span>
              </div>
            ))}
          <div className="modal-header border-0 d-flex justify-content-between align-items-center">
        <h4 className="modal-title h3" style={{ color: '#000000' }}>
          Greenhouse Gas Emissions
        </h4>
        <div className="mx-auto h3">{selectedOption.fac_name}</div>
        <button
          type="button"
          className="btn-close"
          onClick={handleClose}
        ></button>
      </div>
            <div className="modal-body p-5 mb-5">
              <div className="row">
              {universityInfo.length > 0 ? (
  <div className="row">
    {updatedScopenum.map((info, index) => (
      <div className="col-sm-12 col-md-4 col-lg-4" key={index}>
        <div
          className="card mb-3 p-3"
          style={{
            transition: "transform 0.3s, filter 0.3s",
            borderRadius: "5px",
            transform: hoveredCard === index ? "scale(1.05)" : "scale(1)",
            maxWidth: "540px",
            opacity: 0.85,
          }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={info.pic}
                className="img-fluid rounded-start text-center mt-2"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title h5">{info.name}</h2>
                {info.title === '' ?  <br/> : 
                <h5 className="card-title h6">{info.title}</h5>
                 }
                <h4 className="card-text h3">
                  <Counter start={0} end={info.tco2e} duration={1000} /> tCO<sub>2</sub>e
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}

<span className="text-center h3 my-5">ภาพรวมการปล่อยและการดูดกลับก๊าซเรือนกระจก</span>
    <div className="col-md-6 mt-3 d-flex">
      <div className="card flex-grow-1" style={{ opacity: 0.85 }}>
        <div className="card-body">
         

          <PieChartWithCenterLabel data={universityInfo} />

        </div>
      </div>
    </div>
    <div className="col-md-6 mt-3 d-flex">
      <div className="card flex-grow-1" style={{ opacity: 0.85 }}>
        <div className="card-body">
        
          <StackOffsetDemo years={years} series={series} />
        </div>
      </div>
    </div>
  </div>
) : (
  <div className="d-flex justify-content-center align-items-center">
  <h1 className="h1 text-dark">No Information Available</h1>
</div>
)}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchComponent;