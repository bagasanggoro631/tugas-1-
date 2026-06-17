// ======================== DATA DUMMY ========================
window.dataBahanAjar = [
    { kodeLokasi: "OTMP01", kodeBarang: "ASIP4301", namaBarang: "Pengantar Ilmu Komunikasi", jenisBarang: "BMP", edisi: 2, stok: 548 },
    { kodeLokasi: "JLBR02", kodeBarang: "KOMU2103", namaBarang: "Komunikasi Massa", jenisBarang: "BMP", edisi: 3, stok: 210 },
    { kodeLokasi: "BDG05", kodeBarang: "SKOM4001", namaBarang: "Teori Komunikasi", jenisBarang: "Modul", edisi: 1, stok: 127 },
    { kodeLokasi: "SBY11", kodeBarang: "JURN2102", namaBarang: "Jurnalistik Dasar", jenisBarang: "BMP", edisi: 4, stok: 89 },
    { kodeLokasi: "PLG18", kodeBarang: "MTK21", namaBarang: "Matematika", jenisBarang: "BMP", edisi: 2, stok: 89 }
];

// ======================== MAIN APLIKASI STOK ========================
(function() {
    let stockData = [];

    const tbody = document.getElementById('tableBody');
    const totalItemsSpan = document.getElementById('totalItems');
    const totalStockSpan = document.getElementById('totalStock');
    const btnTambah = document.getElementById('btnTambahBaris');

    const inputKodeLokasi = document.getElementById('kodeLokasi');
    const inputKodeBarang = document.getElementById('kodeBarang');
    const inputNamaBarang = document.getElementById('namaBarang');
    const inputJenisBarang = document.getElementById('jenisBarang');
    const inputEdisi = document.getElementById('edisi');
    const inputStok = document.getElementById('stok');

    function updateStats() {
        const totalItems = stockData.length;
        const totalStock = stockData.reduce((sum, item) => {
            let stokVal = typeof item.stok === 'number' ? item.stok : parseInt(item.stok);
            return sum + (isNaN(stokVal) ? 0 : stokVal);
        }, 0);
        totalItemsSpan.innerText = totalItems;
        totalStockSpan.innerText = totalStock.toLocaleString('id-ID');
    }

    function renderTable() {
        while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
        if (!stockData.length) {
            const emptyRow = document.createElement('tr');
            emptyRow.className = 'empty-row';
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 8;
            emptyCell.textContent = '📭 Belum ada data stok. Silakan tambah baris stok baru.';
            emptyCell.style.textAlign = 'center';
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
            updateStats();
            return;
        }
        stockData.forEach((item, idx) => {
            const row = document.createElement('tr');
            const tdNo = document.createElement('td');
            tdNo.textContent = idx + 1;
            tdNo.style.fontWeight = '500';
            row.appendChild(tdNo);

            const tdKodeLokasi = document.createElement('td');
            tdKodeLokasi.textContent = item.kodeLokasi || '-';
            row.appendChild(tdKodeLokasi);

            const tdKodeBarang = document.createElement('td');
            tdKodeBarang.textContent = item.kodeBarang || '-';
            row.appendChild(tdKodeBarang);

            const tdNama = document.createElement('td');
            tdNama.textContent = item.namaBarang || '-';
            row.appendChild(tdNama);

            const tdJenis = document.createElement('td');
            tdJenis.textContent = item.jenisBarang || '-';
            row.appendChild(tdJenis);

            const tdEdisi = document.createElement('td');
            const edisiSpan = document.createElement('span');
            edisiSpan.className = 'badge-edisi';
            edisiSpan.textContent = `Edisi ${item.edisi ?? '-'}`;
            tdEdisi.appendChild(edisiSpan);
            row.appendChild(tdEdisi);

            const tdStok = document.createElement('td');
            tdStok.textContent = (item.stok !== undefined && item.stok !== null) ? item.stok.toLocaleString('id-ID') : '0';
            tdStok.style.fontWeight = '600';
            tdStok.style.color = (item.stok > 0) ? '#1e6f5c' : '#b33';
            row.appendChild(tdStok);

            const tdAksi = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️ Hapus';
            deleteBtn.className = 'btn-delete';
            deleteBtn.setAttribute('aria-label', 'Hapus baris');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Hapus data "${item.namaBarang}" (${item.kodeBarang}) dari daftar stok?`)) {
                    stockData.splice(idx, 1);
                    renderTable();
                }
            });
            tdAksi.appendChild(deleteBtn);
            row.appendChild(tdAksi);
            tbody.appendChild(row);
        });
        updateStats();
    }

    function addNewStockRow() {
        let kodeLokasi = inputKodeLokasi.value.trim();
        let kodeBarang = inputKodeBarang.value.trim();
        let namaBarang = inputNamaBarang.value.trim();
        let jenisBarang = inputJenisBarang.value.trim();
        let edisiRaw = inputEdisi.value.trim();
        let stokRaw = inputStok.value.trim();

        if (!kodeLokasi) { alert('❌ Kode Lokasi harus diisi!'); inputKodeLokasi.focus(); return; }
        if (!kodeBarang) { alert('❌ Kode Barang harus diisi!'); inputKodeBarang.focus(); return; }
        if (!namaBarang) { alert('❌ Nama Barang harus diisi!'); inputNamaBarang.focus(); return; }
        if (!jenisBarang) { alert('❌ Jenis Barang harus diisi!'); inputJenisBarang.focus(); return; }

        let edisi = parseInt(edisiRaw, 10);
        let stok = parseInt(stokRaw, 10);
        if (isNaN(edisi) || edisi < 1) { alert('⚠️ Edisi harus berupa angka positif (minimal 1).'); inputEdisi.value = 1; inputEdisi.focus(); return; }
        if (isNaN(stok) || stok < 0) { alert('⚠️ Stok harus berupa angka >= 0.'); inputStok.value = 0; inputStok.focus(); return; }

        const newItem = { kodeLokasi, kodeBarang, namaBarang, jenisBarang, edisi, stok };
        stockData.push(newItem);
        renderTable();

        inputKodeLokasi.value = '';
        inputKodeBarang.value = '';
        inputNamaBarang.value = '';
        inputJenisBarang.value = '';
        inputEdisi.value = '1';
        inputStok.value = '0';
        inputKodeLokasi.focus();

        const notif = document.createElement('div');
        notif.textContent = '✅ Baris stok baru berhasil ditambahkan!';
        notif.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#1f6e82; color:white; padding:8px 18px; border-radius:40px; font-size:0.8rem; z-index:999; box-shadow:0 4px 12px rgba(0,0,0,0.2);';
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 1800);
    }

    function loadInitialData() {
        if (window.dataBahanAjar && Array.isArray(window.dataBahanAjar)) {
            stockData = window.dataBahanAjar.map(item => ({ ...item }));
        } else {
            stockData = [
                { kodeLokasi: "OTMP01", kodeBarang: "ASIP4301", namaBarang: "Pengantar Ilmu Komunikasi", jenisBarang: "BMP", edisi: 2, stok: 548 },
                { kodeLokasi: "OTMP99", kodeBarang: "COM101", namaBarang: "Komunikasi Digital", jenisBarang: "BMP", edisi: 1, stok: 120 }
            ];
        }
        renderTable();
    }

    if (btnTambah) btnTambah.addEventListener('click', addNewStockRow);
    const formInputs = [inputKodeLokasi, inputKodeBarang, inputNamaBarang, inputJenisBarang, inputEdisi, inputStok];
    formInputs.forEach(input => {
        if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); addNewStockRow(); } });
    });
    loadInitialData();
})();

// ========== FUNGSI UNTUK HAMBURGER MENU (NAVBAR) ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.top-header') && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    }
});