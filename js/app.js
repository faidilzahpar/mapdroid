import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner, onClick } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

const GITHUB_REPO = "faidilzahpar/mapdroid";
const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const FALLBACK_APK_URL = `https://github.com/${GITHUB_REPO}/releases/latest/download/mapdroid-latest.apk`;
const FALLBACK_IPA_URL = `https://github.com/${GITHUB_REPO}/releases/latest/download/mapdroid-latest.ipa`;

function updateReleaseInfo(data) {
  console.log("GitHub Release Data loaded via JSCroot:", data);

  if (!data || data.message === "Not Found") {
    // Belum ada release di github (misal action baru pertama kali dijalankan)
    setInner("release-tag", "v1.0.0");
    setInner("release-name", "MapDroid Release");
    setInner("release-date", "Menunggu rilis GitHub Actions");
    setInner("apk-size", "~15 MB");
    setInner("ipa-size", "~25 MB");
    setInner("download-apk-sub", "Format APK • Android");
    setInner("download-ipa-sub", "Format IPA • iOS");
    
    const apkBtn = document.getElementById("download-apk-btn");
    const ipaBtn = document.getElementById("download-ipa-btn");
    if (apkBtn) apkBtn.href = FALLBACK_APK_URL;
    if (ipaBtn) ipaBtn.href = FALLBACK_IPA_URL;
    return;
  }

  const tagName = data.tag_name || "v1.0.0";
  const releaseName = data.name || tagName;

  setInner("release-tag", tagName);
  setInner("release-name", releaseName);

  if (data.published_at) {
    const formattedDate = new Date(data.published_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    setInner("release-date", `${formattedDate} WIB`);
  }

  // Temukan aset APK (Android) dan IPA (iOS)
  let apkAsset = null;
  let ipaAsset = null;

  if (data.assets && data.assets.length > 0) {
    apkAsset = data.assets.find(asset => asset.name.endsWith(".apk"));
    ipaAsset = data.assets.find(asset => asset.name.endsWith(".ipa"));
  }

  const apkBtn = document.getElementById("download-apk-btn");
  const ipaBtn = document.getElementById("download-ipa-btn");
  const directApkLink = document.getElementById("direct-apk-link");
  const directIpaLink = document.getElementById("direct-ipa-link");

  // Update APK Info
  if (apkAsset) {
    if (apkBtn) apkBtn.href = apkAsset.browser_download_url;
    if (directApkLink) {
      directApkLink.href = apkAsset.browser_download_url;
      directApkLink.innerText = apkAsset.name;
    }
    const apkMb = (apkAsset.size / (1024 * 1024)).toFixed(1);
    setInner("apk-size", `${apkMb} MB`);
    setInner("download-apk-sub", `Versi ${tagName} • ${apkMb} MB`);
  } else {
    const directUrl = `https://github.com/${GITHUB_REPO}/releases/download/${tagName}/mapdroid-latest.apk`;
    if (apkBtn) apkBtn.href = directUrl;
    if (directApkLink) {
      directApkLink.href = directUrl;
      directApkLink.innerText = "mapdroid-latest.apk";
    }
    setInner("apk-size", "APK Siap Unduh");
    setInner("download-apk-sub", `Versi ${tagName} • APK`);
  }

  // Update IPA Info
  if (ipaAsset) {
    if (ipaBtn) ipaBtn.href = ipaAsset.browser_download_url;
    if (directIpaLink) {
      directIpaLink.href = ipaAsset.browser_download_url;
      directIpaLink.innerText = ipaAsset.name;
    }
    const ipaMb = (ipaAsset.size / (1024 * 1024)).toFixed(1);
    setInner("ipa-size", `${ipaMb} MB`);
    setInner("download-ipa-sub", `Versi ${tagName} • ${ipaMb} MB`);
  } else {
    const directUrl = `https://github.com/${GITHUB_REPO}/releases/download/${tagName}/mapdroid-latest.ipa`;
    if (ipaBtn) ipaBtn.href = directUrl;
    if (directIpaLink) {
      directIpaLink.href = directUrl;
      directIpaLink.innerText = "mapdroid-latest.ipa";
    }
    setInner("ipa-size", "IPA Siap Unduh");
    setInner("download-ipa-sub", `Versi ${tagName} • IPA`);
  }

  // Catatan rilis jika ada
  if (data.body) {
    const notesElem = document.getElementById("release-body");
    const notesContainer = document.getElementById("release-notes-container");
    if (notesElem && notesContainer) {
      notesElem.textContent = data.body;
      notesContainer.style.display = "block";
    }
  }
}

// Inisialisasi pengambilan data rilis via JSCroot API
try {
  getJSON(API_URL, updateReleaseInfo);
} catch (err) {
  console.warn("Gagal mengambil data rilis via JSCroot, menggunakan tautan default:", err);
}

// Interaksi Toast saat mengunduh APK
onClick("download-apk-btn", () => {
  showToast("Mengunduh APK MapDroid (Android)...", "Buka file setelah unduhan selesai untuk menginstal.");
});

// Interaksi Toast saat mengunduh IPA
onClick("download-ipa-btn", () => {
  showToast("Mengunduh IPA MapDroid (iOS)...", "Pasang menggunakan AltStore, SideStore, atau Sideloadly.");
});

function showToast(title, subtitle) {
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toast-title");
  const toastSub = document.getElementById("toast-subtitle");
  if (toastTitle) toastTitle.innerText = title;
  if (toastSub) toastSub.innerText = subtitle;
  
  if (toast) {
    toast.classList.remove("opacity-0", "translate-y-4");
    toast.classList.add("opacity-100", "translate-y-0");
    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-4");
    }, 4000);
  }
}
