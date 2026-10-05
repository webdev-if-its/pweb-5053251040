// PERTEMUAN 5 — JavaScript Dasar dan DOM
//
// Sama seperti index.html di m01: kode ini sengaja ditulis "asal jalan".
// Sebagian fungsi punya bug kecil, sebagian lain baru separuh jadi (tandanya
// komentar TODO). Perbaiki dan lengkapi bertahap, Level 1 sampai 10.
//
// Baca SOAL.md, lalu jalankan:  npm run levels
// File yang kalian sentuh: hanya file ini. Jangan ubah index.html atau test/.

export const katalog = [
  { judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', harga: 45000, tersedia: true },
  { judul: 'Bumi Manusia', penulis: 'Pramoedya Ananta Toer', harga: 60000, tersedia: false },
  { judul: 'Cantik Itu Luka', penulis: 'Eka Kurniawan', harga: 55000, tersedia: true },
  { judul: 'Negeri 5 Menara', penulis: 'Ahmad Fuadi', harga: 40000, tersedia: true },
  { judul: 'Ayat-Ayat Cinta', penulis: 'Habiburrahman El Shirazy', harga: 0, tersedia: false },
];

// Level 1 — harga 0 harus tampil "Rp 0".
export function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

// Level 2 — kembalikan buku yang `tersedia` saja tanpa mengubah `daftar`.
export function saringTersedia(daftar) {
  return daftar.filter((buku) => buku.tersedia);
}

// Level 3 — ubah teks #judul-pengumuman menjadi HURUF BESAR.
export function sorotJudulPengumuman() {
  const judul = document.querySelector('#judul-pengumuman');
  judul.textContent = judul.textContent.toUpperCase();
}

// Level 4 — beri prefix "⚠ " pada <li> yang mengandung "tutup",
// tanpa menumpuk prefix kalau dipanggil berulang.
export function tandaiPengumumanPenting() {
  const items = document.querySelectorAll('#daftar-pengumuman li');
  items.forEach((li) => {
    const teks = li.textContent;
    const mengandungTutup = teks.toLowerCase().includes('tutup');
    const sudahDiTandai = teks.startsWith('⚠ ');
    if (mengandungTutup && !sudahDiTandai) {
      li.textContent = '⚠ ' + teks;
    }
  });
}

// Level 5 — buat satu elemen <article> untuk satu buku dengan
// document.createElement dan textContent.
// Struktur: <article><h3>judul</h3><p>penulis</p><p>harga</p></article>
// Elemen dikembalikan, tidak langsung ditempel ke halaman.
export function buatKartuBuku(buku) {
  const kartu = document.createElement('article');

  const judul = document.createElement('h3');
  judul.textContent = buku.judul;

  const penulis = document.createElement('p');
  penulis.textContent = buku.penulis;

  const harga = document.createElement('p');
  harga.textContent = formatRupiah(buku.harga);

  kartu.append(judul, penulis, harga);
  return kartu;
}

// Level 6 & 10 — kosongkan #katalog lalu render ulang dari `data`.
// Dipakai untuk semua kondisi: daftar penuh, hasil pencarian, dan kosong.
export function render(data) {
  const wadah = document.querySelector('#katalog');
  const ringkasan = document.querySelector('#ringkasan');

  wadah.replaceChildren();
  ringkasan.textContent = data.length + ' buku ditemukan';

  if (data.length === 0) {
    const pesan = document.createElement('p');
    pesan.textContent = 'Tidak ada buku yang cocok.';
    wadah.append(pesan);
    return;
  }

  for (const buku of data) {
    const kartu = buatKartuBuku(buku);
    // Closure: handler ini "mengingat" `buku` milik iterasi ini.
    kartu.addEventListener('click', () => tampilkanDetail(buku));
    wadah.append(kartu);
  }
}

// Level 7 — dipanggil saat sebuah kartu diklik. Tampilkan judul,
// penulis, dan harga buku itu di #panel-detail dengan textContent.
function tampilkanDetail(buku) {
  const panel = document.querySelector('#panel-detail');

  const judul = document.createElement('h3');
  judul.textContent = buku.judul;

  const penulis = document.createElement('p');
  penulis.textContent = buku.penulis;

  const harga = document.createElement('p');
  harga.textContent = formatRupiah(buku.harga);

  panel.replaceChildren(judul, penulis, harga);
}

// Level 8 & 9 — pasang listener 'submit' pada #form-cari.
// - Level 8: cegah reload halaman (preventDefault).
// - Level 9: saring `katalog` berdasarkan judul, lalu panggil render(hasil).
export function pasangFormCari() {
  const form = document.querySelector('#form-cari');
  const input = document.querySelector('#input-cari');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const kata = input.value.trim().toLowerCase();
    const hasil = katalog.filter((buku) =>
      buku.judul.toLowerCase().includes(kata)
    );
    render(hasil);
  });
}

// Bootstrap halaman — jangan hapus, ini yang membuat halaman "hidup" saat
// dibuka di browser. Boleh dibaca untuk mengerti urutan pemanggilan.
sorotJudulPengumuman();
tandaiPengumumanPenting();
render(katalog);
pasangFormCari();