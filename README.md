# MapDroid 🗺️📱

[![Build and Release MapDroid APK](https://github.com/faidilzahpar/mapdroid/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/faidilzahpar/mapdroid/actions/workflows/build-and-release.yml)
[![Latest Release](https://img.shields.io/github/v/release/faidilzahpar/mapdroid?color=blue&label=release)](https://github.com/faidilzahpar/mapdroid/releases/latest)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

**Aplikasi Android Peta Berbasiskan MapLibre.org**

MapDroid adalah aplikasi peta mobile Android berkinerja tinggi yang dibangun menggunakan **MapLibre Native Android SDK**, menghadirkan peta vektor interaktif yang ringan, lancar, dan bebas ketergantungan lisensi proprietary.

---

## 🚀 Fitur & Implementasi

Proyek ini telah mengimplementasikan seluruh kebutuhan spesifikasi:

1. **GitHub Workflow CI/CD Otomatis (Auto Tag & Release)**:
   - Terintegrasi di [`.github/workflows/build-and-release.yml`](.github/workflows/build-and-release.yml).
   - Setiap kali kode di-push ke branch `main`, GitHub Actions secara otomatis melakukan build APK Release (`gradle assembleRelease`).
   - Otomatis membuat Git Tag versi (`v1.0.<run_number>`) dan menerbitkan rilis GitHub Release dengan aset APK (`mapdroid-*.apk` dan `mapdroid-latest.apk`) yang langsung dapat diunduh pengguna.

2. **Landing Page Interaktif (`index.html`) Berbasis `croot.js`**:
   - Terletak di file root [`index.html`](index.html) dan modul JavaScript [`js/app.js`](js/app.js).
   - Menggunakan micro-framework **JSCroot (`croot.js`)** untuk mengambil metadata rilis terkini secara dinamis dari GitHub API (`getJSON` & `setInner`).
   - Menyediakan tombol unduh APK instan, penampil tag rilis, ukuran berkas APK, tanggal publikasi rilis, serta panduan langkah instalasi APK untuk pengguna Android.

3. **Aplikasi Peta Berbasis MapLibre SDK**:
   - Menggunakan modul native `org.maplibre.gl:android-sdk:11.8.0`.
   - Menampilkan peta vektor interaktif dengan gaya MapLibre demotiles (`https://demotiles.maplibre.org/style.json`).
   - Dilengkapi kontrol navigasi zoom in, zoom out, penanda koordinat saat peta diketuk, dan tombol reset kamera ke seluruh kepulauan Indonesia.

---

## 📥 Tautan Unduh APK Langsung

- **Link Unduh APK Rilis Terakhir**: [Download mapdroid-latest.apk](https://github.com/faidilzahpar/mapdroid/releases/latest/download/mapdroid-latest.apk)
- **Halaman Semua Rilis**: [GitHub Releases](https://github.com/faidilzahpar/mapdroid/releases)

---

## 📲 Panduan Pemasangan APK di Android

1. **Unduh File APK**: Klik tombol unduh pada landing page atau tautan rilis di atas.
2. **Izinkan Sumber Tidak Dikenal**:
   - Masuk ke **Pengaturan (Settings)** > **Keamanan & Privasi (Security & Privacy)**.
   - Pilih **Pasang Aplikasi Tidak Dikenal (Install Unknown Apps)**.
   - Berikan izin pada aplikasi Browser atau File Manager yang digunakan untuk mengunduh.
3. **Pasang (Install)**: Buka file `.apk` yang baru saja diunduh, lalu ketuk **Install**.
4. **Jalankan Aplikasi**: Buka **MapDroid** dari menu aplikasi perangkat dan nikmati penjelajahan peta digital interaktif!

---

## 🛠️ Struktur Proyek

```text
mapdroid/
├── .github/
│   └── workflows/
│       └── build-and-release.yml       # GitHub Actions workflow auto tag & release
├── app/
│   ├── build.gradle                    # Konfigurasi dependensi MapLibre Android
│   ├── proguard-rules.pro              # Konfigurasi proguard MapLibre
│   └── src/main/
│       ├── AndroidManifest.xml         # Izin internet & konfigurasi Activity
│       ├── java/com/mapdroid/app/
│       │   └── MainActivity.java       # Activity inisialisasi MapLibre MapView
│       └── res/                        # Layout XML, resources string, warna, dan vektor
├── js/
│   └── app.js                          # Logika croot.js pemroses metadata rilis
├── build.gradle                        # Root Gradle build script
├── gradle.properties                   # Pengaturan JVM & AndroidX
├── settings.gradle                     # Manajemen repositori & modul
├── index.html                          # Landing page MapDroid dengan croot.js
└── README.md                           # Dokumentasi proyek
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [GNU General Public License v3.0](LICENSE).
