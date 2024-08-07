import React from 'react'
import Main from '../components/Main';
import Footer from '../components/Footer';
import AsideBar from '../components/AsideBar';
import HeadBar from '../components/HeadBar';

export default function Reference() {
  return (
    <div className="body-wrapper">
    <AsideBar /> 
    <div className="main-wrapper mdc-drawer-app-content">
    <HeadBar />
    <div className="page-wrapper mdc-toolbar-fixed-adjust">

<main className="content-wrapper">

<div class="list-group">
  <div  class="list-group-item list-group-item-action " aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h3 class="mb-1">เอกสารอ้างอิง</h3>
    </div>
    <p class="mb-1 fw-normal h4">1.ข้อกำหนดในการคำนวณและรายงานคาร์บอนฟุตพริ้นท์ขององค์กร   โดยองค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน) พิมพ์ ครั้งที่ 8.</p>
    <small> (ฉบับปรับปรุงครั้งที่ 6, กรกฎาคม 2565)</small>
  </div>
  <div  class="list-group-item list-group-item-action">
  <p class="mb-1 fw-normal  h4">2.Emission Factor CFO </p>
    <small class="text-muted">(เมษายน 2565)</small>
  </div>

  <div  class="list-group-item list-group-item-action">
  <p class="mb-1 fw-normal h4">3.Emission Factor CFP </p>
    <small class="text-muted"> (กรกฎาคม 2565)</small>
  </div>

  <div  class="list-group-item list-group-item-action">
  <p class="mb-1 fw-normal  h4">4.GHG Emissions form Fertilizer (AR5)</p>
    <small class="text-muted"></small>
  </div>

  <div  class="list-group-item list-group-item-action">
  <p class="mb-1 fw-normal  h4">5.TGO CFP FY22-091-02-1038</p>
    <small class="text-muted"></small>
  </div>

  <div  class="list-group-item list-group-item-action">
  <p class="mb-1 fw-normal h4">6.DEFRA,2023</p>
    <small class="text-muted"></small>
  </div>

  <div  class="list-group-item list-group-item-action">
  <p class="mb-1 fw-normal h4">7.Supply Chain Greenhouse Gas Emission Factors for US Industries and Commodities (U.S. EPA 2020.)</p>
  </div>
</div>
</main>
</div>
    <Footer />
    </div>
  </div>
  )
}
