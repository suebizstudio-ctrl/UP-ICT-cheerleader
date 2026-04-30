document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById('regForm');
    const submitBtn = document.getElementById('submitBtn');
    const fileInput = document.getElementById('photo');
    const fileNameText = document.getElementById('fileName');

    /* ===== เวลาเปิด-ปิด ===== */
    const openDate = new Date('2026-06-30T09:00:00');
    const closeDate = new Date('2026-07-30T23:59:00');

    function checkFormWindow() {
        const now = new Date();

        if (now < openDate) {
            submitBtn.disabled = true;
            submitBtn.innerText = "COMING SOON";
            submitBtn.style.opacity = "0.6";
        } 
        else if (now > closeDate) {
            submitBtn.disabled = true;
            submitBtn.innerText = "CLOSED";
            submitBtn.style.background = "#444";
        } 
        else {
            submitBtn.disabled = false;
            submitBtn.innerText = "สมัคร";
        }
    }

    checkFormWindow();

    /* ===== แสดงชื่อไฟล์ ===== */
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            fileNameText.innerText = fileInput.files[0].name;
        }
    });

    /* ===== submit form ===== */
    form.addEventListener('submit', e => {
        e.preventDefault();

        if (submitBtn.disabled) return;

        submitBtn.innerText = "UPLOADING...";
        submitBtn.disabled = true;

        const file = fileInput.files[0];

        if (!file) {
            alert("กรุณาอัปโหลดรูปภาพ");
            submitBtn.disabled = false;
            submitBtn.innerText = "สมัคร";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            fetch(form.action, {
                method: 'POST',
                body: JSON.stringify({
                    base64: reader.result.split(',')[1],
                    type: file.type,
                    name: file.name,
                    fullname: form.fullname.value,
                    nickname: form.nickname.value,
                    student_id: form.student_id.value,
                    contact: form.contact.value,
                    reason: form.reason.value
                })
            })
            .then(() => window.location = "success.html")
            .catch(() => {
                alert("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
                submitBtn.disabled = false;
                submitBtn.innerText = "สมัคร";
            });
        };

        reader.readAsDataURL(file);
    });

});

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (!loader) return; // 🔥 กัน error ถ้า id ไม่ตรง

    // ⏳ รอ 5 วิ
    setTimeout(() => {

        loader.classList.add("zoom-out");

        // ⏱ รอ animation จบ แล้วลบ element ทิ้ง
        setTimeout(() => {
            loader.remove(); // 🔥 ดีกว่า display:none
        }, 1000);

    }, 5000);
});
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
}
document.querySelector('.card-container').addEventListener('click', function() {
    this.classList.toggle('active');
});
