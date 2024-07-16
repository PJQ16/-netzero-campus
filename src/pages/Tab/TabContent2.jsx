import React from 'react'
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';

export default function TabContent2() {
    const Headcard = [
        {
          id: 1,
          img: process.env.PUBLIC_URL +'/img/petro.jpeg',
          title: 'ข้อมูลเชื้อเพลิง',
          detail: 'ให้แยกตามประเภทการเบิกจ่าย',
          moreinfo: [
            'การเบิกจ่ายเป็นรายครั้ง คือ การเบิกจ่ายจากใบเสร็จรับเงิน/ใบสำคัญจ่ายเงิน/เอกสารหลักฐานอื่นๆ ',
            'การเบิกจ่ายแบบ Feet car (โดยให้แยกตามชนิดของเชื้อเพลิงที่ใช้ในเดือนนั้นๆ โดยแยกเป็นข้อมูลปี 2565 และปี 2566)'
          ]
        },
        {
          id: 2,
          img: process.env.PUBLIC_URL +'/img/kme.jpeg',
          title: 'ข้อมูลการใช้สารเคมีจากห้องปฏิบัติการ',
          detail: 'ข้อมูลปริมาณการใช้สารเคมี ที่มีในการทดลอง ทำแลปวิจัย ในห้องปฏิบัติการ โดยจะคิดเฉพาะก๊าซเรือนกระจก 7 ชนิด ได้แก่',
          moreinfo: [
            'ก๊าซคาร์บอนไดออกไซด์ (CO2)',
            'ก๊าซมีเทน (CH4)',
            'ไนตรัสออกไซด์ (N2O)',
            'ไฮโดรฟลูออโรคาร์บอน (HFCs)',
            'เพอร์ฟลูออโรคาร์บอน (PFCs)',
            'ซัลเฟอร์เฮกซะฟลูออไรด์ (SF6)',
            'ไนโตรเจนไตรฟลูออไรด์ (NF3)'
          ]
        },
        {
          id: 3,
          img: process.env.PUBLIC_URL +'/img/subair.jpeg',
          title: 'การใช้สารทำความเย็น',
          detail: 'ข้อมูลปริมาณสารทำความเย็นของอุปกรณ์แต่ละชนิด โดยสามารถหาได้จาก Nameplate ของอุปกรณ์ (ยกเว้นเครื่องปรับอากาศที่มีการใช้สารทำความเย็น R22)',
          moreinfo: [
            'การใช้งานอุปกรณ์ โดยข้อมูลดังกล่าวจะเป็นตัวกำหนดสัดส่วนการรั่วซึมของสารทำความเย็นในแต่อุปกรณ์ซึ่งระบุไว้ในตาราง',
            'ชนิดอุปกรณ์: ระบบปรับอากาศ (Residential and Commercial AC), Air Dryer, Gas Dryer (Stand-alone commercial), ตู้เย็น/ตู้แช่/ตู้กดน้ำ (Domestic Refrigeration)',
            'ชนิดสารทำความเย็นและปริมาณสารทำความเย็น โดยจะระบุใน Nameplate ของอุปกรณ์ ส่วนปริมาณสารทำความเย็น ในการกรอกข้อมูลจะคิดในส่วนของปริมาณการรั่วซึมตามเงื่อนไขที่ระบุไว้'
          ]
        },
        {
          id: 4,
          img: process.env.PUBLIC_URL +'/img/businesstravel.jpeg',
          title: 'การเดินทางไป - กลับของพนักงาน',
          detail: 'ให้ทำการสร้างแบบสอบถามออนไลน์ โดยใช้ข้อมูลในไฟล์ Excel ไฟล์ชื่อ "ข้อมูลสร้างแบบฟอร์มออนไลน์_Employee" ไปสร้างต้นแบบใน Google form หรือ MS Form จากนั้นทำการ Export ข้อมูลออกมาเป็นไฟล์ Excel และทำการกรองข้อมูลปริมาณการใช้เชื้อเพลิงแต่ละชนิด เมื่อได้ผลลัพท์แล้วให้นำข้อมูลปริมาณเชื้อเพลิงที่ได้แยกตามชนิดเชื้อเพลิงมากรอกลงใน sheet "Employee" โดยที่ข้อมูลจะทำการลิ้งค์ไปที่ sheet หลัก',
          moreinfo: []
        }
      ];
      

  return (
  <>
  <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">คาร์บอนฟุตพริ้นท์ในระดับองค์กร</h1>
    <h3 className='display-5'>(Carbon Footprint for Organization: CFO)</h3>
    <p className="lead">คือ การประเมินปริมาณการปล่อยและดูดกลับก๊าซเรือนกระจกที่เกิดจากกิจกรรมต่าง ๆ ที่เกี่ยวข้องกับองค์กรในแต่ละปีทั้งทางตรงและทางอ้อม</p>
  </div>
</div>
  
  {Headcard.map((data,index)=>
  <div className="card mb-3" key={index + 1} style={{maxWidth: "540px"}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={`${data.img}`} className="img-fluid rounded-start" alt={`${data.title}`} />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.detail}</p>
        <Link data-bs-toggle="modal" data-bs-target={`#moreInfoForm${data.id}`} ><p className="card-text"><small className="text-body-secondary">-อ่านเพิ่มเติม</small></p></Link>
      </div>
    </div>
  </div>
  <Modal title={`${data.title}`} id={`moreInfoForm${data.id}`}>
      <ul>
        {data.moreinfo.map((info, index) => (
          <li key={index}>{info}</li>
        ))}
      </ul>
    </Modal>
</div>

)}

  </>
  )
}
