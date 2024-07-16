import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import './styles/styles.css';
function TabActivityReport() {
  const [reportData,setReportData] = useState([]);
  const [intro, setIntro] = useState("");
  const [tester, setTester] = useState("");
  const [coordinator, setCoodinator] = useState("");
  const [responsible, setResponsible] = useState("");
  const [monitor, setMonitor] = useState("");
  const [assurance, setAssurance] = useState("");
  const [materially, setMaterially] = useState("");
  const [explanation, setExplanation] = useState("");
  const [cfo, setCFO] = useState("");
  const [cfoMore, setCFOMore] = useState("");
  const [cfo3, setCFO3] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false); // สร้าง state เพื่อเก็บค่าว่าให้แสดง input "อื่นๆ" หรือไม่
  const [selectedOption, setSelectedOption] = useState(""); // เพิ่ม state เพื่อเก็บค่ารายการที่ถูกเลือก
  const [selectedImage, setSelectedImage] = useState(null); // เพิ่ม state เพื่อเก็บรูปภาพที่ถูกเลือก
  const { id } = useParams();

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async() =>{
    try{
      const res = await axios.get(config.urlApi + `/report/dipictDataReport/${id}`);
      setReportData(res.data);
    }catch(e){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
        });
    }
  }

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value; // Get the selected value from the radio button
    setSelectedOption(selectedValue); // Update the selectedOption state
  
    if (selectedValue === 'other') {
      setShowOtherInput(true); // Show the input field for "other"
      setCFO3(''); // Reset cfo3 when "other" is selected
    } else {
      setShowOtherInput(false); // Hide the input field for "other"
      setCFO3(selectedValue); // Update the cfo3 state with the selected value
    }
  };

  const handleQuillChange = (value, setter) => {
    setter(value);
  };
  
  const handlerGenerateReport = async (e) => {
    try {
      e.preventDefault();

       if(intro === '' ||  tester === ''  || coordinator === '' || responsible === '' || monitor === '' || assurance === '' ||  materially === ''|| explanation === '' || cfo === '' || cfoMore === '' || cfo3 === '' || selectedImage === '' ){
        Swal.fire
        (
          {
            icon:'warning',
            title:'เตือน',
            text:'กรุณากรอกข้อมูลให้ครบถ้วน'
          }
        )

      }else { 
   
      const formData = new FormData();
      formData.append('activityperiod_id', id);
      formData.append('intro', intro);
      formData.append('tester', tester);
      formData.append('coordinator', coordinator);
      formData.append('responsible', responsible);
      formData.append('monitor', monitor);
      formData.append('assurance', assurance);
      formData.append('materially', materially);
      formData.append('explanation', explanation);
      formData.append('cfo_operation1', cfo);
      formData.append('cfo_operation2', cfoMore);
      formData.append('cfo_operation3', cfo3);
      formData.append('image_name', selectedImage);
  
      await Swal.fire({
        icon: 'info',
        title: 'สร้างข้อมูล',
        text: 'ต้องการสร้างรายงานใช่หรือไม่',
        showCancelButton: true,
      }).then(async (res) => {
        if (res.isConfirmed) {
          await Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'ระบบทำการสร้างรายงานเรียบร้อยแล้ว',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          
          
          // Post data to the server using axios
        // Post data to the server using axios
         await axios.post(config.urlApi + `/report/generateRport`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
          
          // Clear form fields after successful submission
    /*       setIntro('');
          setTester('');
          setCoodinator('');
          setResponsible('');
          setMonitor('');
          setAssurance('');
          setMaterially('');
          setExplanation('');
          setCFO('');
          setCFOMore('');
          setCFO3(''); */
          fetchData();
        }
      });
     } 
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    }
  };

  const handleDownload = async () => {
    try {
      const result = await Swal.fire({
        icon: 'question',
        title: 'ดาวน์โหลด',
        text: 'ต้องการดาวน์โหลดไฟล์ Excel หรือไม่',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่',
        cancelButtonColor:'#B84343'
      });
  
      if (result.isConfirmed) {
        const response = await axios.get(config.urlApi + `/download-excel/${id}`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'cfo.xlsx');
        document.body.appendChild(link);
        link.click();
        Swal.fire({
          icon: 'success',
          title: 'ดาวน์โหลดสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar:true
        });
      }
    } catch (error) {
      console.error('Error downloading Excel file: ', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์ Excel',
      });
    }
  };
  
  const handleGeneratePDF = async() => {
    try{
      const result = await Swal.fire({
        icon: 'question',
        title: 'ดาวน์โหลด',
        text: 'ต้องการดาวน์โหลดไฟล์ PDF หรือไม่',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่',
        cancelButtonColor:'#B84343'
      });
      if(result.isConfirmed){
    axios.get(config.urlApi + `/generate-pdf/${id}`, { responseType: 'blob' })
      .then(response => {
        // สร้าง URL จาก Blob
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        // เปิดเอกสาร PDF ในหน้าต่างใหม่
        window.open(fileURL);
      })
      Swal.fire({
        icon: 'success',
        title: 'ดาวน์โหลดสำเร็จ',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar:true
      });

    }
    }catch(e){
      Swal.fire({
        icon: 'error',
        title:'เกิดข้อผิดพลาด',
        text:e.message,
      });
    }
  };
  return (
    <div>
    <p className='h2'>รายงาน</p>
    {reportData.length === 0 && (
  <button
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    <AddCircleIcon /> เพิ่มรายงาน
  </button>
)}


      <div className="row">
 
        <div className="col-md-12 mt-5">
          <div className="card ">
            <div className="table-responsive">
              <table className="table table-bordered table-striped ">
                <thead>
                  <tr className="text-center">
                    <th>วันที่ออกรายงาน</th>
                    <th>รายงาน PDF</th>
                    <th>รายงาน Excel</th>
                    <th>ลบรายงาน</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((data,index)=>
                  <tr key={index} className="text-center">
                    <td>{data.createdAt}</td>
                    <td>
                    <button className="btn btn-lg btn-primary" onClick={handleGeneratePDF}>
                      <PictureAsPdfIcon fontSize="large" /> PDF
                    </button>

                    </td>
                    <td>
                      <button className="btn  btn-lg btn-success"  onClick={handleDownload}>
                        <TableViewIcon fontSize="large" /> Excel
                      </button>
                    </td>
                    <td>
                      <button className="btn  btn-lg btn-danger">
                        <DeleteIcon fontSize="large" /> ลบ
                      </button>
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                แบบฟอร์มการออกรายงาน
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
              <div>
              <input 
  type="file" 
  className="form-control" 
  accept=".jpg, .png, .jpeg" 
  onChange={(e) =>  setSelectedImage(e.target.files[0])} 
/>
            {/* ตรวจสอบว่ามีรูปภาพที่ถูกเลือกหรือไม่ */}
            {selectedImage !== null && (
    <div className="text-center image-preview">
        <img src={selectedImage} alt="Selected" />
    </div>
)}
        </div>

                <label>บทนำ</label>
                <ReactQuill
                  theme="snow"
                  value={intro}
                  style={{ height: "200px", marginBottom: "50px" }}
                  onChange={(value) => handleQuillChange(value, setIntro)}
                />

                <div className="col-md-5 m-3 px-5">
                  <label>
                    หน่วยงานทดสอบ <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setTester(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-md-5 m-3 px-5">
                  <label>
                    ชื่อ-สกุลของผู้ประสานงาน{" "}
                    <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCoodinator(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-md-5 m-3 px-5">
                  <label>
                    ชื่อ-สกุลของผู้รับผิดชอบ{" "}
                    <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setResponsible(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-md-5 m-3 px-5">
                  <label>
                    แนวทางที่ใช้ในการติดตามผล{" "}
                    <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setMonitor(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-md-5 m-3 px-5">
                  <label>
                    ระดับของการรับรอง <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setAssurance(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-md-5 m-3 px-5">
                  <label>
                    ระดับความมีสาระสำคัญ <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setMaterially(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <label>
                แผนผังการดำเนินงาน( อธิบาย ){" "}
                <sup style={{ color: "red" }}>*</sup>
              </label>
              <ReactQuill
                theme="snow"
                value={explanation}
                style={{ height: "200px", marginBottom: "50px" }}
                onChange={(value) => handleQuillChange(value, setExplanation)}
              />

              <label>
                1.ก๊าซเรือนกระจกที่พิจารณา <sup style={{ color: "red" }}>*</sup>
              </label>
              <ReactQuill
                theme="snow"
                value={cfo}
                style={{ height: "200px", marginBottom: "50px" }}
                onChange={(value) => handleQuillChange(value, setCFO)}
              />

              <label>
                2.ก๊าซเรือนกระจกที่พิจารณาอื่น ๆเพิ่มเติม{" "}
                <sup style={{ color: "red" }}>*</sup>
              </label>
              <ReactQuill
                theme="snow"
                value={cfoMore}
                style={{ height: "200px", marginBottom: "50px" }}
                onChange={(value) => handleQuillChange(value, setCFOMore)}
              />

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDisabled"
                  id="flexRadioDisabled"
                  checked={selectedOption === "ipcc"}
                  onChange={handleRadioChange}
                  value="ipcc"
                />
                <label className="form-check-label" htmlFor="flexRadioDisabled">
                  IPCC Fifth Assessment Report (AR5)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDisabled"
                  id="flexRadioCheckedDisabled"
                  onChange={handleRadioChange}
                  value="other"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexRadioCheckedDisabled"
                >
                  อื่นๆ
                </label>
              </div>
              {showOtherInput && (
                <div className="col-md-5">
                  {showOtherInput && (
  <div className="col-md-5">
    <input 
      type="text"
      value={cfo3} 
      onChange={(e) => setCFO3(e.target.value)} 
      className="form-control" 
    />
  </div>
)}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handlerGenerateReport}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabActivityReport;
