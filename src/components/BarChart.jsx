import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import StackOffsetDemo from './Chart';
import config from '../config';
import Swal from 'sweetalert2';
import { YearContext } from '../pages';

export default function BarChart() {
  const { searchTerm, setSearchTerm, selectedYear, setSelectedYear } = useContext(YearContext);
  const sectionRef = useRef(null);
  const [listYear, setListYear] = React.useState([]);

  React.useEffect(() => {
    const fetchDataApi = async () => {
      try {
        const res = await axios.get(config.urlApi + `/netzeroListyear/${selectedYear}`);
        setListYear(res.data);
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: e.message,
        });
      }
    };
    fetchDataApi();
  },  [selectedYear]);

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

 
  useEffect(() => {
    const section = sectionRef.current;
    const options = {
      root: null, // ใช้ viewport เป็น root
      threshold: 0.1 // แสดงเมื่อ section อยู่ใน viewport 10%
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target.querySelector('.card');
          card.classList.add('bounce-in-top');
          observer.unobserve(entry.target); // หยุดการสังเกตเมื่อเจอแล้ว
        }
      });
    }, options);

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className='bg-light ' 
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "10px",
        borderRadius: '5px',
        backgroundImage: `url('data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFFFFF" fill-opacity="1" d="M0,192L6.9,181.3C13.7,171,27,149,41,165.3C54.9,181,69,235,82,240C96,245,110,203,123,202.7C137.1,203,151,245,165,272C178.3,299,192,309,206,293.3C219.4,277,233,235,247,229.3C260.6,224,274,256,288,266.7C301.7,277,315,267,329,245.3C342.9,224,357,192,370,181.3C384,171,398,181,411,197.3C425.1,213,439,235,453,229.3C466.3,224,480,192,494,192C507.4,192,521,224,535,245.3C548.6,267,562,277,576,250.7C589.7,224,603,160,617,112C630.9,64,645,32,658,26.7C672,21,686,43,699,48C713.1,53,727,43,741,58.7C754.3,75,768,117,782,138.7C795.4,160,809,160,823,160C836.6,160,850,160,864,149.3C877.7,139,891,117,905,133.3C918.9,149,933,203,946,197.3C960,192,974,128,987,122.7C1001.1,117,1015,171,1029,197.3C1042.3,224,1056,224,1070,224C1083.4,224,1097,224,1111,234.7C1124.6,245,1138,267,1152,266.7C1165.7,267,1179,245,1193,240C1206.9,235,1221,245,1234,245.3C1248,245,1262,235,1275,192C1289.1,149,1303,75,1317,69.3C1330.3,64,1344,128,1358,149.3C1371.4,171,1385,149,1399,170.7C1412.6,192,1426,256,1433,288L1440,320L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"></path></svg>')}')`,
        opacity:0.95,
      }}>
    
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 rounded mb-4 bg-transparent mx-5">
              <div className="card-body p-5 align-items-center">
                <p className='fw-bold h4 ms-5'>ภาพรวมการปล่อยและการดูดกลับก๊าซเรือนกระจก</p>
                <StackOffsetDemo  years={years} series={series} />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
