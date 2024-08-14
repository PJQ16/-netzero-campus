import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const PolicyPage = () => {
  const navigate = useNavigate();
  const accordionRef = useRef(null);
  const checkboxRef = useRef(null);

  useEffect(() => {
    // เช็คว่าเคยแสดงนโยบายแล้วหรือยัง
    const policyShown = localStorage.getItem('policyShown');
    if (policyShown) {
      // หากเคยแสดงนโยบายแล้ว ให้ redirect ไปที่หน้า dashboard
      navigate('/dashboard');
      window.location.reload();
    } else {
      handlePolicyAcceptance();
    }
  }, [navigate]);

  const handlePolicyAcceptance = () => {
    Swal.fire({
      title: 'นโยบายความเป็นส่วนตัว',
      html: `
        <div class="accordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                การเก็บและการประมวลผลข้อมูล
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show">
              <div class="accordion-body text-start">
                <p>เว็บไซต์ของเราจะทำการเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน เช่น ชื่อ, ที่อยู่อีเมล, และข้อมูลอื่นๆ ที่ท่านให้ไว้ ข้อมูลเหล่านี้จะถูกจัดเก็บและประมวลผลภายในระบบของเราเพื่อวัตถุประสงค์ดังต่อไปนี้:</p>
                <ol>
                  <li>การปรับปรุงและพัฒนาบริการของเราให้ดียิ่งขึ้น</li>
                  <li>การปฏิบัติตามข้อกำหนดทางกฎหมายและระเบียบข้อบังคับ</li>
                </ol>
                <p>ข้อมูลของท่านอาจถูกเผยแพร่เป็นสาธารณะหรือใช้ในรายงานที่ไม่เปิดเผยตัวตนเพื่อวัตถุประสงค์ในการวิจัยหรือการวิเคราะห์ แต่จะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านต่อบุคคลที่สามโดยไม่ได้รับความยินยอมจากท่าน</p>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                การยอมรับนโยบาย
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse">
              <div class="accordion-body text-start">
                <p>โดยการใช้บริการของเรา ท่านตกลงและยอมรับว่าข้อมูลของท่านจะถูกเก็บรวบรวมและประมวลผลตามที่ระบุในนโยบายนี้</p>
                <p>หากท่านมีคำถามหรือข้อกังวลเกี่ยวกับนโยบายการเก็บและประมวลผลข้อมูลของเรา ท่านสามารถติดต่อเราที่ <a href="mailto:netzerocampus@gmail.com">netzerocampus@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>

        <div class="form-check mt-3">
          <input type="checkbox" class="form-check-input" ref="${checkboxRef}">
          <label class="form-check-label text-danger">
            ฉันได้อ่านและยอมรับนโยบายการเก็บและประมวลผลข้อมูลของเว็บไซต์
          </label>
        </div>
      `,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#0d6efd',
      backdrop: 'static',
      allowOutsideClick: false,
      preConfirm: () => {
        const checkbox = document.querySelector('.form-check-input');
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

        // เริ่มต้นการจัดการปุ่ม Confirm
        const checkbox = document.querySelector('.form-check-input');
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
        localStorage.setItem('policyShown', 'true');
        navigate('/dashboard');
        window.location.reload();
      }
    });
  };

  return null; // เนื่องจากเราใช้ SweetAlert2 แสดงนโยบาย
};

export default PolicyPage;
