import React, { useEffect, useState } from 'react'
import config from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

export default function SourcesFile() {
      
  const [exportSourcesFiles, setExportSourcesFiles] = useState([]); // Corrected variable name
  const [sourcesFiles, setSourFiles] = useState("");
  const {id} = useParams();

  useEffect(() => {
    fetchExportFile();
  }, [id]);
  
  const showDataPdf = (exportSourcesFile) => {
    Swal.fire({
      icon: "question",
      title: "เปิดไฟล์",
      text: "ต้องการเปิดไฟล์ใช่หรือไม่",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        window.open(
          `${config.urlApi}/sourcesfile/${exportSourcesFile.file_name}`,
          "_blank",
          "noreferrer"
        );
      }
    });
  };

  const handlerImportFile = async (e) => {
    e.preventDefault();
    try {
      if (!sourcesFiles) {
        await Swal.fire({
          icon: "warning",
          title: "เตือน!!",
          text: "กรุณาเพิ่มรูปภาพ",
        });
      } else {
        const confirmation = await Swal.fire({
          icon: "info",
          title: "สร้างข้อมูล",
          text: "ต้องการสร้างรายงานใช่หรือไม่",
          showCancelButton: true,
        });
        if (confirmation.isConfirmed) {
          await Swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: "ระบบทำการสร้างรายงานเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          const formData = new FormData();
          formData.append("file_name", sourcesFiles);
          formData.append("activityperiod_id", id);
          await axios.post(config.urlApi + `/importSourcesfile`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setSourFiles(null);
          fetchExportFile();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };


  const fetchExportFile = async () => {
    try {
      const response = await axios.get(config.urlApi + `/sourcesfile/${id}`);
      setExportSourcesFiles(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className='col-md-12'>  <div className="card text-center mt-2">
    <div
      className="card-header"
      style={{
        marginTop: "auto",
        color:"#CF6464"
      }}
    >
      Uploads ไฟล์เอกสารหลักฐาน <br/> ขนาดไฟล์: 4 MB สูงสุด 5 ไฟล์ (ถ้ามี)
    </div>
    <div
      className="card-body"
      style={{
        backgroundColor:'#7FACC5',
        marginTop: "auto"
      }}
    >
      <div className="mb-3">
        {exportSourcesFiles.length === 0 ? (
          <p className="text-center">ไม่มีหลักฐานข้อมูล</p>
        ) : (
          <>
            {exportSourcesFiles.map((exportSourcesFile, index) => (
              <div key={index}>
                <button
                  className="btn btn-primary m-3"
                  onClick={() => showDataPdf(exportSourcesFile)}
                >
                  <DownloadForOfflineIcon /> หลักฐาน
                </button>
                <span className="">
                  {exportSourcesFile.file_name}
                </span>
                
                <hr className="" />
              </div>
            ))}
          </>
        )}
        <br />
        {/*เช็คว่ามีกี่ไฟล์*/}
        {exportSourcesFiles.length === 2
        ? 
        <>

        </>
        :
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setSourFiles(e.target.files[0])}
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            accept="application/pdf"
            aria-label="Upload"
          />
          {sourcesFiles === "" ? (
            <button
              className="btn btn-secondary"
              type="button"
              disabled
              id="inputGroupFileAddon04"
              onClick={handlerImportFile}
            >
              เพิ่มหลักฐาน
            </button>
          ) : (
            <button
              className="btn btn-primary"
              type="button"
              id="inputGroupFileAddon04"
              onClick={handlerImportFile}
            >
              เพิ่มหลักฐาน
            </button>
          )}
        </div>
        }
      </div>
    </div>
  </div></div>
  )
}
