import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../config';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';

function TabActivityOrganization() {
  const [imageLocations, setImageLocations] = useState([]);
  const [fileFr, setFileFr] = useState(3);
  const fileInputRef = useRef(null);
  const {id} = useParams();
  const [activityPeriodId,setActivityPeriodId] = useState(id);

  const [showImages,setShowImages] = useState([]);
  const [statusActivity, setStatusActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(()=>{
    fetchImages();
  })
  const fetchImages = async()=>{
      try{
        const res = await axios.get(config.urlApi + `/images/ImageFr03/${id}`)
        setShowImages(res.data);
        
      }catch(error){
        Swal.fire(
          {
            icon:'error',
            title:'error',
            text:error.message
          }
        )
      }
  }

  const handleFileSelectLo = () => {
    const fileLos = fileInputRef.current.files;
    if (fileLos && fileLos.length > 0) {
      if (imageLocations.length + fileLos.length > 5) {
        alert('You can only upload up to 5 images.');
        return;
      }

      const newImages = Array.from(fileLos).map((file) => ({
        src: URL.createObjectURL(file),
        file: file,
      }));

      setImageLocations((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleImageRemove = (index) => {
    const filteredImages = imageLocations.filter((image, i) => i !== index);
    setImageLocations(filteredImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    for (const image of imageLocations) {
      formData.append('images', image.file);
    }
    formData.append('fileFr', fileFr);
    formData.append('activityperiod_id',activityPeriodId);
  
    try {
      const res = await Swal.fire({
        icon: 'question',
        title: 'Confirm',
        text: 'คุณต้องการบันทึกรูป ใช่หรือไม่?',
        showCancelButton: true
      });

      if (res.isConfirmed) {
        await Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'เพิ่มข้อมูลสำรเร็จ',
          timer: 1500,
          timerProgressBar: true
        });

        await axios.post(config.urlApi + '/uploadImages', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        fetchImages();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    } 
};


const handleRemoveProfile = async (pfID) => {
  if (!pfID) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Value Invalid',
      showConfirmButton: false,
    });
  }

  const res = await Swal.fire({
    icon: 'question',
    title: 'Are you sure?',
    text: 'คุณต้องการลบรูปใช่หรือไม่?',
    showCancelButton: true,
  });

  if (res.isConfirmed) {
    await Swal.fire({
      icon: 'success',
      title: 'Success',
      showCancelButton: false,
      timer: 1000,
      timerProgressBar: true,
    });

    try {
      await axios.delete(`${config.urlApi}/uploadImages/${pfID}`);
      fetchImages(); // รีเฟรชข้อมูลรูปภาพ
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete image',
      });
    }
  }
};


useEffect(() => {
  const fetchStatus = async () => {
      try {
          const response = await axios.get(config.urlApi+`/checkStatusReport/${id}`);
          setStatusActivity(response.data.result.status_activity);
      } catch (err) {
          setError('Error fetching data');
      } finally {
          setLoading(false);
      }
  };

  fetchStatus();
}, [id]);

return (
  <div>
    <div className="row  mb-3">
    <p className='h2 text-center mt-2'>ภาพโครงสร้างขององค์กร</p>
      <div className="col-md-12 d-flex justify-content-center">
        {showImages.length > 0 ? (
          showImages.map((image) => (
          
            <div key={image.id}>
            {statusActivity === '3'  ?(<></>):(
              <Tooltip placement='top' title="ลบรูปภาพ">
                <button className="btn btn-danger rounded-circle shadow" onClick={(e) => handleRemoveProfile(image.id)}>
            <DeleteIcon/>
            </button>
            </Tooltip>
              )
            }
             <div className="card">
            <div className="card-body d-flex justify-content-center align-items-center flex-wrap">
            <label htmlFor="fileInput">
                  <img
                    src={`${config.urlApi}/uploads/${image.file_name}`}
                    alt={`Profile image of the organization ${image.id}`}
                    className="img-fluid"
                  />
                </label>

              </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card">
             <center className='fw-bold mt-3'> กรุณาอัพโหลดไฟล์ภาพโครงการสร้างขององค์กร	</center>
             <sub className='text- text-center mt-2'>(Upload รูปภาพองค์กร มีขนาดไม่เกิน 2 MB สูงสุด 5 ภาพ )</sub> 
            <div className="card-body d-flex justify-content-center align-items-center flex-wrap">
              {imageLocations.map((image, index) => (
                <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                  <img
                    src={image.src}
                    alt={`Uploaded image${index + 1}`}
                    className="img-fluid"
                    style={{ marginRight: '5px' }}
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    &#x2715;
                  </button>
                </div>
              ))}
              {imageLocations.length < 5 && (
                <label htmlFor="fileInput">
                  <img
                    src="https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
                    alt="Camera icon for uploading images"
                    className="img-fluid"
                  />
                </label>
              )}
              <input
                id="fileInput"
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                multiple
                onChange={handleFileSelectLo}
                accept=".png, .jpg, .jpeg, .svg"
              />
              <input type="hidden" name="fileFr" value={fileFr} onChange={(e) => setFileFr(e.target.value)} />
              <input type="hidden" name="activityperiod_id" value={activityPeriodId} onChange={(e) => setActivityPeriodId(e.target.value)} />
            </div>
            {imageLocations.length > 0 && ( // เพิ่มเงื่อนไขที่ตรวจสอบว่ามีไฟล์ที่ถูกเลือกเข้ามาหรือไม่
  <button className='btn' style={{backgroundColor:'#D6C2F1'}} onClick={handleSubmit}>บันทึก</button>
)}
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default TabActivityOrganization;


