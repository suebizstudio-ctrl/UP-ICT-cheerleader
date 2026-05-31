document.addEventListener("DOMContentLoaded", () => {
    
    // --- ส่วนที่ 1: จัดการปุ่มสมัครบน Card (หน้าแรก) ---
    const recruitBtn = document.getElementById('recruitSubmitBtn');
    
    /* ===== ตั้งค่าเวลาเปิด-ปิด ===== */
    const openDate = new Date('2026-05-31T09:00:00');
    const closeDate = new Date('2026-06-30T23:59:00');

    function checkFormWindow() {
        if (!recruitBtn) return; // ถ้าไม่เจอไอดีนี้ (เช่น อยู่หน้าอื่น) ให้ข้ามไป

        const now = new Date();

        // Reset สถานะก่อน
        recruitBtn.classList.remove('btn-disabled');
        recruitBtn.style.pointerEvents = "auto";
        recruitBtn.style.background = "";
        recruitBtn.style.opacity = "";

        if (now < openDate) {
            recruitBtn.classList.add('btn-disabled');
            recruitBtn.innerText = "พบกันเร็ว ๆ นี้";
            recruitBtn.style.pointerEvents = "none";
            recruitBtn.href = "javascript:void(0)";
        } 
        else if (now > closeDate) {
            recruitBtn.classList.add('btn-disabled');
            recruitBtn.innerText = "CLOSED";
            recruitBtn.style.pointerEvents = "none";
            recruitBtn.style.background = "#444"; 
        } 
        else {
            recruitBtn.innerText = "สมัคร";
            recruitBtn.href = "criteria.html";
        }
    }

    checkFormWindow();

    // --- ส่วนที่ 2: จัดการฟอร์มสมัคร (หน้า criteria.html) ---
    const form = document.getElementById('regForm');
    const submitBtn = document.getElementById('submitBtn'); // ปุ่มกดส่งในฟอร์ม
    const fileInput = document.getElementById('photo');
    const fileNameText = document.getElementById('fileName');

    // ตรวจสอบว่ามีฟอร์มอยู่ในหน้านี้ไหม ก่อนจะรัน Event ต่างๆ
    if (form && fileInput) {
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
    }

    // --- ส่วนที่ 3: Interactive Card ---
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
        cardContainer.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }
});

// --- ส่วนที่ 4: Loader ---
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("zoom-out");
        setTimeout(() => {
            loader.remove();
        }, 1000);
    }, 5000);
});
