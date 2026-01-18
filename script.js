window.onload = function () {
    // 1. สร้างละอองดาวแบบสุ่มตำแหน่ง (Magic Stars)
    createStars();

    // 2. ตรวจสอบเวลาเปิด-ปิดรับสมัคร
    checkRegistrationStatus();

    // 3. จัดการ Loader (หน้าจอโหลด)
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');

            // แสดงเนื้อหาหลักแบบนุ่มนวล
            const mainContent = document.querySelector('.registration-section');
            if (mainContent) {
                mainContent.style.opacity = "1";
            }
        }, 2500); // โชว์เอฟเฟคดาว 2.5 วินาที
    }
};

// ฟังก์ชันสร้างละอองดาวกระจายเต็มหน้าจอโหลด
function createStars() {
    const loader = document.getElementById('loader');
    const starCount = 40; // จำนวนละอองดาว

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // สุ่มตำแหน่งกระจายตัว
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3; // สุ่มขนาดดาว
        const delay = Math.random() * 5; // สุ่มเวลาเริ่มกระพริบ

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;

        loader.appendChild(star);
    }
}

// ฟังก์ชันเช็คเวลาเปิด-ปิด (20 - 25 ม.ค. 2026)
function checkRegistrationStatus() {
    const openDate = new Date('2026-01-20T09:00:00');
    const closeDate = new Date('2026-01-25T23:59:00');
    const now = new Date();

    const regBtn = document.querySelector('.reg-btn-elegant');
    const badge = document.querySelector('.next-gen-badge');

    if (now < openDate) {
        if (regBtn) {
            regBtn.style.pointerEvents = "none";
            regBtn.style.opacity = "0.5";
            regBtn.innerText = "COMING SOON";
        }
        if (badge) badge.innerText = "COMING SOON";
    } else if (now > closeDate) {
        if (regBtn) {
            regBtn.style.pointerEvents = "none";
            regBtn.style.background = "#555";
            regBtn.innerText = "CLOSED";
        }
        if (badge) badge.innerText = "CLOSED";
    }
}
