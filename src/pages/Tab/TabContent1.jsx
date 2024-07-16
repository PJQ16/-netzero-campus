import React from 'react'
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';


export default function TabContent1() {
    const Headcard = [
        {
           id:1,
           img:process.env.PUBLIC_URL +'/img/scope1.png',
           title:'การปล่อยก๊าซเรือนกระจกทางตรง',
           detail:'การปล่อยก๊าซเรือนกระจกทางตรง (Direct Emissions) จากกิจกรรมต่าง ๆ ขององค์กรโดยตรง',
           moreinfo:[
            'การใช้เชื้อเพลิง','การใช้สารดับเพลิง (การซ้อม/เหตุเพลิงไหม้)','การใช้/รั่วซึมน้ำยาแอร์ในระบบปรับอากาศและระบบทำความเย็น','การใช้ CO2, CH4, N2O ในห้องปฏิบัติการ','การใช้สารจำพวกคาร์บอนและคาร์บอเนตในห้องปฏิบัติการ','การใช้/รั่วซึมของการสารป้องกันการอาร์คในระบบไฟฟ้า (Substation)','การทำนาข้าว','การใช้ปุ๋ยและปูนขาวในการดูแลพื้นที่เพาะปลูกและพื้นที่สีเขียว','การเลี้ยงสัตว์','การจัดการมูลสัตว์','การจัดการซากสัตว์ (เผาและฝังกลบในพื้นที่ของมหาวิทยาลัย)','การเผาและฝังกลบของเสียในพื้นที่ของมหาวิทยาลัย','การจัดการน้ำเสียในพื้นที่ของมหาวิทยาลัย'
           ]
        },
        {
            id:2,
            img:process.env.PUBLIC_URL + '/img/scope2.jpeg',
           title:'การปล่อยก๊าซเรือนกระจกทางอ้อมจากการใช้พลังงาน',
           detail:'การปล่อยก๊าซเรือนกระจกทางอ้อมจากการใช้พลังงาน (Energy Indirect Emissions) ได้แก่ การซื้อพลังงานมาใช้ในองค์กร ได้แก่ พลังงานไฟฟ้า ความร้อน ความเย็น ไอน้ำ เป็นต้น',
           moreinfo:[
            'การใช้ไฟฟ้า'
           ]
        },
        {
            id:3,
            img:process.env.PUBLIC_URL +'/img/scope3.png',
            title:'การปล่อยก๊าซเรือนกระจกทางอ้อมอื่น ๆ',
            detail:'ปริมาณก๊าซเรือนกระจกที่เกิดขึ้นจากกิจกรรมต่าง ๆ นอกเหนือจากที่ระบุในประเภทที่ 1 และประเภทที่ 2 เช่น การเดินทางของพนักงานด้วยพาหนะที่ไม่ใช่ขององค์กร การเดินทางไปสัมมนานอกสถานที่ เป็นต้น',
            moreinfo:[
                'การใช้ไฟฟ้า','การซื้อพัสดุ/ครุภัณฑ์','การก่อสร้าง','การเดินทางราชการ/ปฏิบัติงาน (โดยเครื่องบิน, รถไฟ, รถทัวร์โดยสาร, รถตู้เช่าเหมา)','การเดินทางไปกลับระหว่างที่พักกับมหาวิทยาลัย รวมถึงการเดินทางภายในมหาวิทยาลัย (โดยรถส่วนตัวของบุคลากรและนักศึกษา)','การเช่าใช้พื้นที่ (ทั้งในฐานะผู้เช่าและผู้ให้เช่า)','การลงทุน'
            ]
        },
        {
            id:4,
            img:process.env.PUBLIC_URL +'/img/removal.png',
           title:'การดูดกลับและกักเก็บก๊าซเรือนกระจก',
           detail:'การดูดกลับก๊าซเรือนกระจกที่อยู่ในชั้นบรรยากาศไปกักเก็บไว้ในแหล่งกักเก็บก๊าซเรือนกระจกทั้งทางชีวภาพ (Biological sinks) และทางวิศวกรรมเคมี (Chemical engineering) เพื่อดูดซับและกักเก็บในระยะยาว',
           moreinfo:[
            'การปลูกต้นไม้','การติดตั้งเทคโนโลยีดักจับคาร์บอนเพื่อนำไปใช้ประโยชน์หรือกักเก็บ (Carbon Capture, Utilization and Storage: CCUS)'
           ]
        }
    ]

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
  <div className="card mb-3" key={index +1} style={{maxWidth: "540px"}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={`${data.img}`} className="img-fluid rounded-start" alt={`${data.title}`} />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.detail}</p>
        <Link data-bs-toggle="modal" data-bs-target={`#moreInfo${data.id}`} ><p className="card-text"><small className="text-body-secondary">-อ่านเพิ่มเติม</small></p></Link>
      </div>
    </div>
  </div>
  <Modal title={`${data.title}`} id={`moreInfo${data.id}`}>
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
