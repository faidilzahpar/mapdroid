import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner, onClick } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

const GITHUB_REPO = "faidilzahpar/mapdroid";
const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const FALLBACK_DIRECT_URL = `https://github.com/${GITHUB_REPO}/releases/latest/download/mapdroid-latest.apk`;
const RELEASES_PAGE_URL = `https://github.com/${GITHUB_REPO}/releases`;

function updateReleaseInfo(data) {
  console.log("GitHub Release Data loaded via JSCroot:", data);

  if (!data || data.message === "Not Found") {
    // Belum ada release di github (misal action baru pertama kali dijalankan)
    setInner("release-tag", "v1.0.0");
    setInner("release-name", "MapDroid Release");
    setInner("release-date", "Menunggu rilis GitHub Actions pertama");
    setInner("apk-size", "Standar (~15 MB)");
    setInner("download-subtext", "Rilis APK Otomatis • Siap Pasang");
    const dlBtn = document.getElementById("download-btn");
    if (dlBtn) dlBtn.href = FALLBACK_DIRECT_URL;
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

  // Temukan aset APK
  let apkAsset = null;
  if (data.assets && data.assets.length > 0) {
    apkAsset = data.assets.find(asset => asset.name.endsWith(".apk"));
  }

  const downloadBtn = document.getElementById("download-btn");
  const fallbackLink = document.getElementById("fallback-link");
  const directLinkSpan = document.getElementById("direct-link-url");

  if (apkAsset) {
    if (downloadBtn) downloadBtn.href = apkAsset.browser_download_url;
    if (fallbackLink) fallbackLink.href = apkAsset.browser_download_url;
    if (directLinkSpan) directLinkSpan.innerText = apkAsset.browser_download_url;

    const sizeInMB = (apkAsset.size / (1024 * 1024)).toFixed(2);
    setInner("apk-size", `${sizeInMB} MB`);
    setInner("download-subtext", `Versi ${tagName} • Ukuran: ${sizeInMB} MB • Format: APK`);
    setInner("apk-filename", apkAsset.name);
  } else {
    const directUrl = `https://github.com/${GITHUB_REPO}/releases/download/${tagName}/mapdroid-latest.apk`;
    if (downloadBtn) downloadBtn.href = directUrl;
    if (fallbackLink) fallbackLink.href = directUrl;
    if (directLinkSpan) directLinkSpan.innerText = directUrl;
    setInner("apk-size", "Standar APK");
    setInner("download-subtext", `Versi ${tagName} • Langsung Unduh`);
  }

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

// Feedback interaktif saat tombol download ditekan
onClick("download-btn", () => {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.classList.remove("opacity-0", "translate-y-4");
    toast.classList.add("opacity-100", "translate-y-0");
    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-4");
    }, 4000);
  }
});
