import React, { useState, useEffect, useContext } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { YearContext } from '../App';
import { toast } from "react-toastify";

const Calenda = () => {
  const { listYear, setListYear, searchTerm, setSearchTerm, selectedYear, setSelectedYear } = useContext(YearContext);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (year) => {
    setSelectedYear(year);
  };

  const uniqueYears = [...new Set(listYear.map(item => item.years))];

  return (
    <div>
      <div className="dropdown drop-end">
        <div
          className="dropdown-toggle mx-3 mt-2"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <CalendarMonthIcon />
          ค้นหาปี
        </div>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ maxHeight: '200px', overflowY: 'scroll', maxWidth: '250px' }}>
          <li className="px-3 py-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={handleSearchChange}
              value={selectedYear+543}
            />
          </li>
                    {uniqueYears
            .filter((year) => {
              const yearInBE = (year + 543).toString(); // แปลงปีเป็น พ.ศ.
              return yearInBE.includes(searchTerm);
            })
            .map((year, index) => (
              <React.Fragment key={index}>
                <li key={index}>
                  <span className="dropdown-item-text">
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect(year)}
                    >
                      {year + 543}
                    </button>
                  </span>
                </li>
              </React.Fragment>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Calenda;
