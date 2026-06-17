// ============== LOGIN SYSTEM ==============
    function initializeUsers() {
        const existing = localStorage.getItem("registeredUsers");
        if (!existing) {
            const defaultUsers = [
                { email: "mahasiswa@ut.ac.id", password: "ut123" },
                { email: "upt@utdaerah.ac.id", password: "bahanajar" },
                { email: "Bagas@gmail.com", password: "054579545"}
            ];
            localStorage.setItem("registeredUsers", JSON.stringify(defaultUsers));
        }
    }
    initializeUsers();

    function getRegisteredUsers() {
        return JSON.parse(localStorage.getItem("registeredUsers")) || [];
    }

    function saveRegisteredUsers(users) {
        localStorage.setItem("registeredUsers", JSON.stringify(users));
    }

    function validateLogin(email, password) {
        const users = getRegisteredUsers();
        return users.find(u => u.email === email && u.password === password) !== undefined;
    }

    // Login handler -> redirect ke dashboard.html
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!validateLogin(email, password)) {
            alert("⚠️ email/password yang anda masukkan salah");
        } else {
            sessionStorage.setItem("loggedInUser", email);
            window.location.href = "dashboard.html";  // <-- redirect ke dashboard
        }
    });

    // Modal logic (Lupa Password & Daftar)
    const lupaModal = document.getElementById("lupaModal");
    const daftarModal = document.getElementById("daftarModal");
    const lupaBtn = document.getElementById("lupaPasswordBtn");
    const daftarBtn = document.getElementById("daftarBtn");
    const closeBtns = document.querySelectorAll(".closeBtn");

    function openModal(modal) { modal.classList.add("active"); }
    function closeModal(modal) { modal.classList.remove("active"); }

    lupaBtn.addEventListener("click", () => openModal(lupaModal));
    daftarBtn.addEventListener("click", () => openModal(daftarModal));
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            closeModal(lupaModal);
            closeModal(daftarModal);
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target === lupaModal) closeModal(lupaModal);
        if (e.target === daftarModal) closeModal(daftarModal);
    });

    // Lupa password
    document.getElementById("kirimResetBtn").addEventListener("click", () => {
        const resetEmail = document.getElementById("resetEmail").value.trim();
        if (!resetEmail) {
            alert("Masukkan email terlebih dahulu.");
            return;
        }
        const users = getRegisteredUsers();
        const userExists = users.some(u => u.email === resetEmail);
        if (userExists) {
            alert(`📧 Instruksi reset password telah dikirim ke ${resetEmail} (simulasi UT).`);
        } else {
            alert("Email tidak terdaftar. Silakan daftar terlebih dahulu.");
        }
        document.getElementById("resetEmail").value = "";
        closeModal(lupaModal);
    });

    // Registrasi
    document.getElementById("registerSubmitBtn").addEventListener("click", () => {
        const email = document.getElementById("regEmail").value.trim();
        const pass = document.getElementById("regPassword").value.trim();
        const confirm = document.getElementById("regConfirm").value.trim();

        if (!email || !pass || !confirm) {
            alert("Semua field harus diisi!");
            return;
        }
        if (pass !== confirm) {
            alert("Password dan konfirmasi tidak cocok!");
            return;
        }
        if (pass.length < 4) {
            alert("Password minimal 4 karakter.");
            return;
        }
        const users = getRegisteredUsers();
        if (users.find(u => u.email === email)) {
            alert("Email sudah terdaftar, silakan login.");
            closeModal(daftarModal);
            return;
        }
        users.push({ email: email, password: pass });
        saveRegisteredUsers(users);
        alert(`✅ Pendaftaran berhasil! Silakan login dengan akun ${email}`);
        closeModal(daftarModal);
        document.getElementById("regEmail").value = "";
        document.getElementById("regPassword").value = "";
        document.getElementById("regConfirm").value = "";
    });