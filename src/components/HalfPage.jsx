import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

export default function HalfPage() {
  const [firstSectionRef, firstSectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [secondSectionRef, secondSectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [thirdSectionRef, thirdSectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div
        ref={firstSectionRef}
        className={`d-flex flex-sm-row flex-column justify-content-center bg-light p-5 ${firstSectionInView ? "tracking-in-expand" : ""}`}
      >
         <div className="w-100 p-5">
          <img
            src={process.env.PUBLIC_URL +"/img/half1.jpg"}
            className={`rounded ms-3 ${firstSectionInView ? "flip-2-ver-left-1" : ""}`}
            style={{ width: "90%", height: "400px" }}
            alt=""
          />
        </div>
        <div className="w-100 p-5">
          <h3 className={firstSectionInView ? "tracking-in-expand" : ""}>Greenhouse Gas: GHG</h3>
          <h4 className={firstSectionInView ? "tracking-in-expand" : ""}>ก๊าซเรือนกระจก</h4>
          <p>
            ก๊าซเรือนกระจก คือ สารประกอบในรูปของก๊าซในบรรยากาศ
            ทั้งที่มีอยู่ในธรรมชาติและสร้างขึ้นโดยมนุษย์ซึ่งสามารถดูดซับและปล่อยรังสีที่ความยาวคลื่นอยู่ในช่วงความถี่ของรังสีอินฟาเรดที่ถูกปล่อยออกมาจากพื้นผิวโลกชั้นบรรยากาศ
            ซึ่งตามขอบเขตของ CFO พิจารณา ก๊าซเรือนกระจกจำนวน 7 ชนิด ได้แก่
            ก๊าซคาร์บอนไดออกไซด์ (CO2) , ก๊าซคาร์บอนไดออกไซด์ (CO2) ก๊าซมีเทน
            (CH4) , ก๊าซไนตรัสออกไซด์ (N2O) ก๊าซไฮโดรฟลูออโรคาร์บอน (HFCs) ,
            ก๊าซเพอร์ฟลูออโรคาร์บอน (PFCs) ก๊าซซัลเฟอร์เฮกซะฟลูออไรด์ (SF6) ,
            และก๊าซไนโตรเจนไตรฟลูออไรด์ (NF3)
          </p>
        </div>
       
      </div>
      <div
        ref={secondSectionRef}
        className={`d-flex flex-sm-row flex-column justify-content-center bg-light p-5 ${secondSectionInView ? "tracking-in-expand" : ""}`}
      >
        <div className="w-100 p-3">
          <img
            src={process.env.PUBLIC_URL +"/img/half2.jpg"}
            className={`rounded ms-3 ${secondSectionInView ? "flip-2-ver-left-1" : ""}`}
            style={{ width: "90%", height: "400px" }}
            alt=""
          />
        </div>
        <div className="w-100 p-5">
          <h3 className={secondSectionInView ? "tracking-in-expand" : ""}>Carbon Footprint for Organization: CFO</h3>
          <h4 className={secondSectionInView ? "tracking-in-expand" : ""}>คาร์บอนฟุตพริ้นท์ขององค์กร</h4>
          <p>
            คาร์บอนฟุตพริ้นท์ขององค์กร คือ
            ปริมาณก๊าซเรือนกระจกที่ปล่อยออกมาจากกิจกรรมต่างๆ ขององค์กร เช่น
            การเผาไหม้ของเชื้อเพลิง การใช้ไฟฟ้า การจัดการของเสีย และการขนส่ง
            วัดออกมาในรูปตันคาร์บอนไดออกไซด์เทียบเท่า โดยพิจารณาจาก 3 ส่วนหลัก
            แบ่งเป็น SCOPE ดังนี้
          </p>
            <p>
              SCOPE 1 การคำนวณคาร์บอนฟุตพริ้นท์ทางตรง (Direct GHG Emissions)
              จากกิจกรรมต่างๆ ขององค์กรโดยตรง เช่น การเผาไหม้ของเครื่องจักร
              การใช้พาหนะขององค์กร (ที่องค์กรเป็นเจ้าของเอง) การใช้สารเคมีในการ
              บำบัดน้ำเสีย การรั่วซึม/รั่วไหล จากกระบวนการหรือกิจกรรม เป็นต้น.
            </p>
            <p>
              SCOPE 2 การคำนวณคาร์บอนฟุตพริ้นท์ทางอ้อม (Energy Indirect GHG
              Emissions) จากการใช้พลังงานทางอ้อม
              โดยพิจารณาจากการใช้ไฟฟ้าที่องค์กรซื้อมาจากผู้ให้บริการต่างๆ
              เช่น การไฟฟ้าฝ่ายผลิตฯ การไฟฟ้านครหลวง เป็นต้น
            </p>
            <p>
              SCOPE 3 การคำนวณคาร์บอนฟุตพริ้นท์ทางอ้อม (Other Indirect GHG
              Emissions) ที่เกิดจากกิจกรรมอื่นๆ
              ที่อยู่นอกเหนือการควบคุมขององค์กร
              แต่เป็นกิจกรรมที่มีผลกระทบทางตรงหรือทางอ้อมกับกิจกรรมขององค์กร
              เช่น กิจกรรมจากการขนส่ง การเดินทางของพนักงาน
              การใช้พลังงานไฟฟ้าในบ้านของพนักงานที่ทำงานทางไกล (Work from
              Home) การกำจัดขยะมูลฝอย เป็นต้น
            </p>
         
        </div>
      </div>
      <div
        ref={thirdSectionRef}
        className={`d-flex flex-sm-row flex-column justify-content-center bg-light p-5 ${thirdSectionInView ? "tracking-in-expand" : ""}`}
      >
        <div className="w-100 p-3">
          <img
            src={process.env.PUBLIC_URL +"/img/half3.jpg"}
            className={`rounded ms-3 ${thirdSectionInView ? "flip-2-ver-left-1" : ""}`}
            style={{ width: "90%", height: "400px" }}
            alt=""
          />
        </div>
        <div className="w-100 p-5">
          <h3 className={thirdSectionInView ? "tracking-in-expand" : ""}>Carbon Footprint for Product: CFP</h3>
          <h4 className={thirdSectionInView ? "tracking-in-expand" : ""}>คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์</h4>
          <p>
            คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์ คือ
            ปริมาณก๊าซเรือนกระจกที่ปล่อยออกมาตลอดวัฏจักรชีวิตของผลิตภัณฑ์
            ตั้งแต่การได้มาซึ่งวัตถุดิบ การแปรรูป การขนส่ง การใช้งาน
            จนถึงการกำจัดเป็นของเสีย
            ซึ่งวัดออกมาในรูปตันคาร์บอนไดออกไซด์เทียบเท่า
          </p>
        </div>
      </div>
    </>
  );
}
