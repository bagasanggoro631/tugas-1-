        // ========== SESSION CHECK : redirect ke login jika belum login ==========
        if (!sessionStorage.getItem("loggedInUser")) {
            window.location.href = "login.html";
        }

        // ========== NAVIGASI ==========
        const dashboardSection = document.getElementById("dashboardSection");
        const trackingSection = document.getElementById("trackingSection");
        const goToTracking = document.getElementById("goToTracking");
        const navDashboard = document.getElementById("navDashboard");
        const logoLink = document.getElementById("logoLink");

        function showDashboard() {
            dashboardSection.classList.remove("hidden");
            trackingSection.classList.add("hidden");
        }
        function showTracking() {
            dashboardSection.classList.add("hidden");
            trackingSection.classList.remove("hidden");
            document.getElementById("noDO").value = "";
            document.getElementById("resultBox").style.display = "none";
            document.getElementById("resultBox").innerHTML = "";
        }

        goToTracking.addEventListener("click", (e) => {
            e.preventDefault();
            showTracking();
        });
        navDashboard.addEventListener("click", (e) => {
            e.preventDefault();
            showDashboard();
        });
        logoLink.addEventListener("click", (e) => {
            e.preventDefault();
            showDashboard();
        });

        // Submenu laporan untuk mobile
        const laporanToggle = document.getElementById("laporanToggle");
        if (laporanToggle) {
            laporanToggle.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    laporanToggle.classList.toggle("active");
                }
            });
        }

        // Mobile hamburger
        const hamburger = document.getElementById("hamburgerBtn");
        const mainNav = document.getElementById("mainNav");
        hamburger.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                if (!e.target.closest(".header")) {
                    mainNav.classList.remove("active");
                }
                if (laporanToggle && !laporanToggle.contains(e.target)) {
                    laporanToggle.classList.remove("active");
                }
            }
        });
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                mainNav.classList.remove("active");
                if (laporanToggle) laporanToggle.classList.remove("active");
            }
        });

        // Data tracking (sama seperti kode Anda)
        const trackingData = {
            "18503984974": {
                nama: "Roka Heprida Sitio",
                alamat: "Pematangsiantar, Jl. Danau Laut Toba No.03",
                statusLangkah: [
                    { text: "Seluruh order di PEMATANGSIANTAR", time: "2023-09-20 13:34:59", done: true },
                    { text: "Proses order di PEMATANGSIANTAR", time: "2023-09-20 09:05:06", done: true },
                    { text: "Diteruskan ke Kantor Antaran PEMATANGSIANTAR", time: "", done: true },
                    { text: "Tiba di Hub SUP MEDIAN", time: "2023-09-20 23:05:42", done: true },
                    { text: "Diteruskan ke Hub SUP MEDIAN", time: "2023-09-19 23:05:36", done: true },
                    { text: "Diteruskan ke Kantor Antaran Lubuk Pakam", time: "", done: true },
                    { text: "Tiba di Hub TANGERANG SELATAN", time: "2023-09-12 16:37:02", done: true },
                    { text: "Penerimaan di loket: TANGERANG SELATAN", time: "2023-09-12 10:00:00", done: true },
                    { text: "Paket diterima oleh Mahasiswa", time: "2023-09-22 08:30:00", done: false }
                ],
                ekspedisi: { tglKirim: "2023-09-12", jenisPaket: "Bahan Ajar Cetak", totalPembayaran: "Rp 250.000" }
            },
            "1506062006": {
                nama: "Bagas Anggoro",
                alamat: "Jl. Beringin Raya No 20, Kel 8 ilir, Kota palembang",
                statusLangkah: [
                    { text: "Seluruh order di Jakarta, Indonesia", time: "2023-09-20 13:34:59", done: true },
                    { text: "Proses order di Jakarta, Indonesia", time: "2023-09-20 09:05:06", done: true },
                    { text: "Diteruskan ke Kantor Antaran Jakarta, Indonesia", time: "", done: true },
                    { text: "Tiba di Hub SUP MEDIAN", time: "2023-09-20 23:05:42", done: true },
                    { text: "Diteruskan ke Hub SUP MEDIAN", time: "2023-09-19 23:05:36", done: true },
                    { text: "Diteruskan ke Kantor Antaran Talang Kelapa", time: "", done: true },
                    { text: "Tiba di Hub Palembang", time: "2023-09-12 16:37:02", done: true },
                    { text: "Penerimaan di loket: Palembang", time: "2023-09-12 10:00:00", done: true },
                    { text: "Paket diterima oleh Mahasiswa", time: "2023-09-22 08:30:00", done: false }
                ],
                ekspedisi: { tglKirim: "2023-09-12", jenisPaket: "Bahan Ajar Cetak", totalPembayaran: "Rp 250.000" }
            }
        };

        function showTrackingData(noDO) {
            const data = trackingData[noDO];
            const resultBox = document.getElementById("resultBox");
            if (!data) {
                resultBox.style.display = "block";
                resultBox.innerHTML = "<p style='color:red;'>Data tidak ditemukan untuk nomor DO tersebut.</p>";
                return;
            }
            const totalSteps = data.statusLangkah.length;
            const completedSteps = data.statusLangkah.filter(s => s.done).length;
            const progressPercent = Math.round((completedSteps / totalSteps) * 100);
            let html = `<div class="student-name">${data.nama}</div>
                        <div class="delivery-detail-summary">${data.alamat} | No. DO: ${noDO}</div>
                        <div class="progress-container"><div class="progress-bar" style="width: ${progressPercent}%;"></div></div>
                        <div class="timeline">`;
            data.statusLangkah.forEach(step => {
                const icon = step.done ? "✓" : "●";
                const completedClass = step.done ? "completed" : "";
                html += `<div class="timeline-item ${completedClass}">
                            <div class="timeline-icon">${icon}</div>
                            <div class="timeline-content">
                                <div class="timeline-date">${step.time || ""}</div>
                                <div class="timeline-text">${step.text}</div>
                            </div>
                        </div>`;
            });
            html += `</div><div class="detail-ekspedisi">
                        <div class="detail-item"><span class="detail-label">Tanggal Kirim</span><span class="detail-value">${data.ekspedisi.tglKirim}</span></div>
                        <div class="detail-item"><span class="detail-label">Jenis Paket</span><span class="detail-value">${data.ekspedisi.jenisPaket}</span></div>
                        <div class="detail-item"><span class="detail-label">Total Pembayaran</span><span class="detail-value">${data.ekspedisi.totalPembayaran}</span></div>
                    </div>`;
            resultBox.innerHTML = html;
            resultBox.style.display = "block";
        }

        document.getElementById("btnCari").addEventListener("click", () => {
            const noDO = document.getElementById("noDO").value.trim();
            if (!noDO) alert("Masukkan nomor DO terlebih dahulu.");
            else showTrackingData(noDO);
        });
        document.getElementById("noDO").addEventListener("keypress", (e) => {
            if (e.key === "Enter") document.getElementById("btnCari").click();
        });

      // Logout -> hapus session dan kembali ke login
        document.getElementById("logoutLink").addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.removeItem("loggedInUser");
            window.location.href = "index.html"; // Diubah dari login.html ke index.html
        });