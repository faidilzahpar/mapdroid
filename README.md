# MapDroid 🗺️📱

[![Build and Release MapDroid (Android & iOS)](https://github.com/faidilzahpar/mapdroid/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/faidilzahpar/mapdroid/actions/workflows/build-and-release.yml)
[![Latest Release](https://img.shields.io/github/v/release/faidilzahpar/mapdroid?color=blue&label=release)](https://github.com/faidilzahpar/mapdroid/releases/latest)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

**Aplikasi Mobile Peta Digital Berbasiskan MapLibre.org untuk Android & iOS**

MapDroid adalah aplikasi peta mobile berkinerja tinggi yang dibangun menggunakan **MapLibre Native SDK** untuk **Android** dan **iOS**, menghadirkan peta vektor interaktif yang ringan, lancar, dan bebas ketergantungan lisensi proprietary dengan tampilan dan fitur yang sama persis di kedua platform.

---

## 🚀 Fitur & Implementasi

Proyek ini telah mengimplementasikan aplikasi peta lintas platform:

1. **GitHub Workflow CI/CD Otomatis (Auto Tag & Release)**:
   - Terintegrasi di [`.github/workflows/build-and-release.yml`](.github/workflows/build-and-release.yml).
   - Mem-build aplikasi Android Release (`gradle assembleRelease` di Ubuntu) dan iOS Release (`xcodebuild` di macOS) secara paralel.
   - Otomatis membuat Git Tag versi (`v1.0.<run_number>`) dan menerbitkan rilis GitHub Release dengan aset instalasi langsung:
     - **Android**: `mapdroid-*.apk` dan `mapdroid-latest.apk`
     - **iOS**: `mapdroid-*.ipa` dan `mapdroid-latest.ipa`

2. **Landing Page Interaktif (`index.html`) Berbasis `croot.js`**:
   - Terletak di file root [`index.html`](index.html) dan modul JavaScript [`js/app.js`](js/app.js).
   - Menggunakan micro-framework **JSCroot (`croot.js`)** untuk mengambil metadata rilis terkini secara dinamis dari GitHub API (`getJSON`, `setInner`, dan `onClick`).
   - Menyediakan tombol unduh ganda untuk Android APK & iOS IPA, penampil tag rilis, ukuran berkas, tanggal publikasi, serta panduan pemasangan dengan tab interaktif.

3. **Aplikasi Peta Berbasis MapLibre SDK**:
   - **Android**: Menggunakan MapLibre Android SDK (`org.maplibre.gl:android-sdk:11.8.0`).
   - **iOS**: Menggunakan MapLibre GL Native iOS SDK via Swift Package Manager (`maplibre-gl-native-distribution`) dengan SwiftUI dan `UIViewRepresentable`.
   - **Fitur Identik di Kedua Platform**:
     - Memuat gaya peta vektor MapLibre demotiles (`https://demotiles.maplibre.org/style.json`).
     - Posisi awal kamera terpusat pada kepulauan Indonesia (`Lat -0.7893, Lon 113.9213`, Zoom 4.5).
     - Tombol floating action untuk Zoom In, Zoom Out, dan Reset Kamera ke Indonesia.
     - Penampil koordinat interaktif saat peta diketuk.

---

## 📥 Tautan Unduh Langsung

| Platform | Format | Tautan Unduh Langsung |
|---|---|---|
| 🤖 **Android** | `.apk` | [Download mapdroid-latest.apk](https://github.com/faidilzahpar/mapdroid/releases/latest/download/mapdroid-latest.apk) |
| 🍏 **iOS** | `.ipa` | [Download mapdroid-latest.ipa](https://github.com/faidilzahpar/mapdroid/releases/latest/download/mapdroid-latest.ipa) |
| 📦 **Semua Rilis** | - | [GitHub Releases](https://github.com/faidilzahpar/mapdroid/releases) |

---

## 📲 Panduan Pemasangan

### 🤖 Untuk Android (APK)
1. **Unduh File APK**: Klik tombol unduh APK pada landing page.
2. **Izinkan Sumber Tidak Dikenal**: Buka **Pengaturan** > **Keamanan & Privasi** > **Pasang Aplikasi Tidak Dikenal**, lalu aktifkan izin untuk browser/file manager.
3. **Pasang**: Buka file `.apk` yang baru saja diunduh, lalu ketuk **Install**.
4. **Jalankan Aplikasi**: Buka **MapDroid** dan mulai jelajah peta!

### 🍏 Untuk iOS (IPA)
1. **Unduh File IPA**: Unduh berkas `mapdroid-latest.ipa`.
2. **Sideloading**: Pasang IPA menggunakan alat sideloading seperti **AltStore**, **SideStore**, **Sideloadly**, atau **TrollStore**.
3. **Percayai Sertifikat**: Buka **Settings** > **General** > **VPN & Device Management**, pilih akun pengembang Anda lalu ketuk **Trust**.
4. **Jalankan Aplikasi**: Buka **MapDroid** di iPhone/iPad Anda.

---

## 🛠️ Struktur Proyek

```text
mapdroid/
├── .github/
│   └── workflows/
│       └── build-and-release.yml       # GitHub Actions CI/CD (Android APK & iOS IPA)
├── app/                                # Proyek Android Native
│   ├── build.gradle                    # Konfigurasi dependensi MapLibre Android
│   ├── proguard-rules.pro              # Konfigurasi proguard MapLibre
│   └── src/main/
│       ├── AndroidManifest.xml         # Izin internet & konfigurasi Activity
│       ├── java/com/mapdroid/app/
│       │   └── MainActivity.java       # Activity inisialisasi MapLibre Android
│       └── res/                        # Layout XML, resources string, warna, dan vektor
├── ios/                                # Proyek iOS Native (SwiftUI + MapLibre SPM)
│   ├── MapDroid.xcodeproj/             # Xcode Project & Scheme
│   ├── MapDroid/
│   │   ├── MapDroidApp.swift           # Entry point aplikasi SwiftUI
│   │   ├── ContentView.swift           # Tampilan utama & tombol kontrol floating
│   │   ├── MapLibreView.swift          # Wrapper UIViewRepresentable untuk MLNMapView
│   │   ├── Info.plist                  # Izin lokasi & konfigurasi bundle iOS
│   │   └── Assets.xcassets/            # AppIcon & AccentColor
│   └── project.yml                     # XcodeGen project spec
├── js/
│   └── app.js                          # Logika croot.js pemroses rilis GitHub
├── index.html                          # Landing page MapDroid dengan croot.js
├── README.md                           # Dokumentasi proyek
└── settings.gradle                     # Pengaturan Gradle Android
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [GNU General Public License v3.0](LICENSE).
