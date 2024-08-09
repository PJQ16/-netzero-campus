import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const PolicyPage = () => {
   const navigate =  useNavigate();
  useEffect(() => {
    // เช็คว่าเคยแสดงนโยบายแล้วหรือยัง
    const policyShown = localStorage.getItem('policyShown');
    if (policyShown) {
      // หากเคยแสดงนโยบายแล้ว ให้ redirect ไปที่หน้า dashboard
      navigate('/dashboard') 
    } else {
      handlePolicyAcceptance();
    }
  }, []);
  

  const handlePolicyAcceptance = () => {
    Swal.fire({
      title: 'นโยบายความเป็นส่วนตัว',
      html: `
        <div class="accordion" id="policyAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                ข้อมูลของท่านจะถูกใช้เพื่อ
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#policyAccordion">
              <div class="accordion-body t text-start">
                <ol>
                  <li>การเก็บรวบรวมและจัดการข้อมูลการใช้บริการของท่าน</li>
                  <li>การปรับปรุงและพัฒนาผลิตภัณฑ์หรือบริการ</li>
                  <li>การสื่อสารกับท่านเกี่ยวกับข่าวสารและโปรโมชั่น</li>
                  <li>การปฏิบัติตามข้อกำหนดทางกฎหมายและระเบียบข้อบังคับ</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                การเก็บข้อมูลของท่าน
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-start">
                <ol>
                  <li>ข้อมูลที่เรารวบรวมจะถูกเก็บรักษาอย่างปลอดภัย</li>
                  <li>ข้อมูลจะไม่ถูกเปิดเผยแก่บุคคลที่สามโดยไม่ได้รับความยินยอม</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                สิทธิ์ของท่าน
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-start">
                <ol>
                  <li>ท่านมีสิทธิ์ในการเข้าถึงและแก้ไขข้อมูลส่วนตัวของท่าน</li>
                  <li>ท่านสามารถขอให้ลบข้อมูลของท่านจากฐานข้อมูลของเรา</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="policyCheckbox">
          <label class="form-check-label text-danger" htmlFor="policyCheckbox">
            ฉันได้อ่านและยอมรับนโยบายความเป็นส่วนตัว
          </label>
        </div>
      `,
      confirmButtonText: 'ตกลง',
      confirmButtonColor:'#0d6efd',
      backdrop: 'static', // ปิดการทำงานของ backdrop เพื่อไม่ให้ปิด SweetAlert2
      allowOutsideClick: false, // ป้องกันไม่ให้คลิกนอก modal ปิด dialog
      preConfirm: () => {
        const checkbox = Swal.getPopup().querySelector('#policyCheckbox');
        if (!checkbox.checked) {
          Swal.showValidationMessage('กรุณายืนยันการอ่านนโยบาย');
          return false;
        }
        return true;
      },
      didOpen: () => {
        // ให้ SweetAlert2 รู้จักการใช้งาน Bootstrap JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
        script.async = true;
        document.body.appendChild(script);

        // จัดการสถานะของปุ่ม Confirm ตาม checkbox
        const checkbox = Swal.getPopup().querySelector('#policyCheckbox');
        const confirmButton = Swal.getConfirmButton();
        
        const updateConfirmButtonState = () => {
          confirmButton.disabled = !checkbox.checked;
        };

        checkbox.addEventListener('change', updateConfirmButtonState);

        // เริ่มต้นการจัดการปุ่ม Confirm
        updateConfirmButtonState();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // บันทึกข้อมูลว่ามีการแสดงนโยบายแล้ว
        localStorage.setItem('policyShown', 'true');
        navigate('/dashboard') 
      }
    });
  };

  return null; // เนื่องจากเราใช้ SweetAlert2 แสดงนโยบาย
};

export default PolicyPage;
