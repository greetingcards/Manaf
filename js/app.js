/* Greeting Card Generator (5 Languages) - SAFE, standalone */

// ---------- Optional "SAFE" navbar/back-to-top guards (won't error if not present) ----------
window.onscroll = function () {
  // Safe: navbar collapse
  const nav = document.getElementById("navbar");
  if (nav) {
    if (document.documentElement.scrollTop > 30) nav.classList.add("top-nav-collapse");
    else nav.classList.remove("top-nav-collapse");
  }

  // Safe: back-to-top button
  const myButton = document.getElementById("myBtn");
  if (myButton) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) myButton.style.display = "block";
    else myButton.style.display = "none";
  }
};

// ---------- Card Generator ----------
(() => {
  const langEl = document.getElementById("lang");
  const nameEl = document.getElementById("name");
  const canvas = document.getElementById("imageCanvas");
  const downloadBtn = document.getElementById("downloadBtn");
  const downloadLink = document.getElementById("downloadLink");

  const titleText = document.getElementById("titleText");
  const subtitleText = document.getElementById("subtitleText");
  const nameLabel = document.getElementById("nameLabel");

  if (!langEl || !nameEl || !canvas || !downloadBtn || !downloadLink) return;

  const ctx = canvas.getContext("2d");
  const bgImg = new Image();
  bgImg.crossOrigin = "anonymous";

  // --- Configure your 5 languages here ---
  const CARD_CONFIG = {
    ar: {
      langAttr: "ar",
      dir: "rtl",
      placeholder: "اكتب اسمك",
      nameLabel: "الاسم",
      title: "كل عام وأنتم بخير",
      subtitle: "يمكنك كتابة اسمك واختيار اللغة لتحميل تهنئتك الخاصة بسهولة.",
      bg: "images/card-ar.jpg",
      font: "bold 110px Tajawal",
      // name position (RTL usually right)
      align: "right",
      x: canvas.width - 260,
      y: 2900
    },
    en: {
      langAttr: "en",
      dir: "ltr",
      placeholder: "Type your name",
      nameLabel: "Name",
      title: "Eid Mubarak",
      subtitle: "Type your name, choose a language, and download your greeting card.",
      bg: "images/card-en.jpg",
      font: "bold 110px Tajawal",
      align: "left",
      x: 260,
      y: 2900
    },
    fr: {
      langAttr: "fr",
      dir: "ltr",
      placeholder: "Écrivez votre nom",
      nameLabel: "Nom",
      title: "Aïd Moubarak",
      subtitle: "Saisissez votre nom, choisissez la langue, puis téléchargez votre carte.",
      bg: "images/card-fr.jpg",
      font: "bold 110px Tajawal",
      align: "left",
      x: 260,
      y: 2900
    },
    bn: {
      langAttr: "bn",
      dir: "ltr",
      placeholder: "আপনার নাম লিখুন",
      nameLabel: "নাম",
      title: "ঈদ মোবারক",
      subtitle: "আপনার নাম লিখুন, ভাষা নির্বাচন করুন, এবং কার্ড ডাউনলোড করুন।",
      bg: "images/card-bn.jpg",
      font: "bold 110px Tajawal",
      align: "left",
      x: 260,
      y: 2900
    },
    id: {
      langAttr: "id",
      dir: "ltr",
      placeholder: "Tulis nama Anda",
      nameLabel: "Nama",
      title: "Selamat Idulfitri",
      subtitle: "Tulis nama Anda, pilih bahasa, lalu unduh kartu ucapan Anda.",
      bg: "images/card-id.jpg",
      font: "bold 110px Tajawal",
      align: "left",
      x: 260,
      y: 2900
    }
  };

  function getCfg() {
    return CARD_CONFIG[langEl.value] || CARD_CONFIG.ar;
  }

  function applyLanguage() {
    const cfg = getCfg();

    document.documentElement.lang = cfg.langAttr;
    document.documentElement.dir = cfg.dir;

    // UI text
    nameEl.placeholder = cfg.placeholder;
    if (nameLabel) nameLabel.textContent = cfg.nameLabel;
    if (titleText) titleText.textContent = cfg.title;
    if (subtitleText) subtitleText.textContent = cfg.subtitle;

    // Load background image
    bgImg.src = cfg.bg;
  }

  function draw() {
    const cfg = getCfg();

    // Draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Draw name
    const name = (nameEl.value || "").trim();
    if (!name) return;

    ctx.font = cfg.font;
    ctx.fillStyle = "#FFFFFF";
    ctx.textBaseline = "middle";
    ctx.textAlign = cfg.align;

    ctx.fillText(name, cfg.x, cfg.y);
  }

  function makeDownload() {
    draw();
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    downloadLink.href = dataUrl;

    // Better filename by language + name
    const safeName = (nameEl.value || "Employee").trim().replace(/[^\w\u0600-\u06FF\u0980-\u09FF\u00C0-\u017F\s-]/g, "").replace(/\s+/g, "_");
    const lang = langEl.value;
    downloadLink.download = `Greeting_${lang}_${safeName}.jpg`;

    // Trigger download via button
    downloadLink.click();
  }

  // Events
  langEl.addEventListener("change", applyLanguage);
  nameEl.addEventListener("input", draw);
  bgImg.onload = draw;
  downloadBtn.addEventListener("click", makeDownload);

  // Init
  applyLanguage();
})();
