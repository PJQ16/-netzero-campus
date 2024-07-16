import React from 'react';

export default function Education() {
  return (
    <div className="d-flex flex-sm-row flex-column justify-content-center align-items-center mt-3 style={{backgroundColor:'#C8DAF0'}}">
      <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header h2 text-center text-white" style={{backgroundColor:'#0E3B43'}}>
              เครือข่ายสถาบันอุดมศึกษา
              </div>
                <div className="card-body">
          

      <div className='text-center h3'>
       มหาวิทยาลัยรัฐ และมหาวิทยาลัยในกำกับรัฐ
        <div className="mt-2" style={{ width: 'auto', height: 'auto' }}>
              <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={process.env.PUBLIC_URL +"/img/uv4.png"} className="d-block w-100 vh-100" alt="สมาชิก1"/>
          </div>
          <div className="carousel-item">
            <img src={process.env.PUBLIC_URL +"/img/uv2.png"} className="d-block w-100 vh-100" alt="สมาชิก2"/>
          </div>
        </div>
        <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon  bg-dark" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
        </div>
      </div>
    </div>
                </div>
                
            </div>
          </div>
      </div>
  );
}
