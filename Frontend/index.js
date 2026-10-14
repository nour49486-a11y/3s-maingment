const i18n = {
  en: {
    langLabel: "العربية",
    title: "People",
    records: "records",
    refresh: "Refresh",
    addPerson: "+ Add person",
    searchPlaceholderAll: "Search by all fields...",
    searchPlaceholderName: "Search by name...",
    searchPlaceholderPhone: "Search by phone...",
    searchPlaceholderAge: "Search by age...",
    searchPlaceholderDate: "Search by birth date...",
    searchPlaceholderEmail: "Search by email...",
    optSearchAll: "Search All",
    optSearchName: "Name",
    optSearchPhone: "Phone",
    optSearchAge: "Age",
    optSearchDate: "Birth Date",
    optSearchEmail: "Email",
    thPhoto: "Photo",
    thName: "Name",
    thGender: "Gender",
    thPhone: "Phone",
    thEmail: "Email",
    thBirth: "Birth date",
    thAge: "Age",
    edit: "Edit",
    remove: "Remove",
    confirmDelete: "Are you sure you want to remove this record?",
    noMatches: "No records match",
    showingOf: "of",
    addTitle: "Add Person",
    editTitle: "Edit Person",
    lblFormPhoto: "Profile Picture",
    uploadBtn: "Upload",
    camBtn: "Camera",
    lblFormName: "Full Name",
    lblFormGender: "Gender",
    lblFormPhone: "Phone",
    lblFormEmail: "Email",
    lblFormDate: "Birth Date",
    lblFormAge: "Age",
    cancel: "Cancel",
    save: "Save",
    maleTag: "male",
    femaleTag: "female",
    optSortDefault: "Sort By",
    optSortNameAsc: "Name (A-Z / أ-ي)",
    optSortNameDesc: "Name (Z-A / ي-أ)",
    optSortAgeAsc: "Age (Youngest First)",
    optSortAgeDesc: "Age (Oldest First)",
    darkTheme: "Dark",
    lightTheme: "Light",
    statTotalLabel: "Total People",
    statMaleLabel: "Males",
    statFemaleLabel: "Females",
    camModalTitle: "Take Photo",
    captureBtn: "Capture",
    camError: "Could not access webcam.",
    //  da lel catch falid
    loadError: "Failed to load data from the server.",
    saveError: "Failed to save. Please try again.",
    deleteError: "Failed to delete the record.",
  },
  ar: {
    langLabel: "English",
    title: "إدارة المستخدمين",
    records: "سجل",
    refresh: "تحديث",
    addPerson: "+ إضافة شخص",
    searchPlaceholderAll: "ابحث في جميع الحقول...",
    searchPlaceholderName: "ابحث بالاسم...",
    searchPlaceholderPhone: "ابحث برقم الهاتف...",
    searchPlaceholderAge: "ابحث بالعمر...",
    searchPlaceholderDate: "ابحث بتاريخ الميلاد...",
    searchPlaceholderEmail: "ابحث بالبريد الإلكتروني...",
    optSearchAll: "البحث في الكل",
    optSearchName: "الاسم",
    optSearchPhone: "الهاتف",
    optSearchAge: "العمر",
    optSearchDate: "تاريخ الميلاد",
    optSearchEmail: "الإيميل",
    thPhoto: "الصورة",
    thName: "الاسم",
    thGender: "النوع",
    thPhone: "الهاتف",
    thEmail: "البريد الإلكتروني",
    thBirth: "تاريخ الميلاد",
    thAge: "العمر",
    edit: "تعديل",
    remove: "حذف",
    confirmDelete: "هل أنت تأكد من رغبتك في حذف هذا السجل؟",
    noMatches: "لا توجد نتائج تطابق",
    showingOf: "من إجمالي",
    addTitle: "إضافة شخص جديد",
    editTitle: "تعديل البيانات",
    lblFormPhoto: "الصورة الشخصية",
    uploadBtn: "رفع صورة",
    camBtn: "الكاميرا",
    lblFormName: "الاسم بالكامل",
    lblFormGender: "النوع",
    lblFormPhone: "رقم الهاتف",
    lblFormEmail: "البريد الإلكتروني",
    lblFormDate: "تاريخ الميلاد",
    lblFormAge: "العمر",
    cancel: "إلغاء",
    save: "حفظ",
    maleTag: "ذكر",
    femaleTag: "أنثى",
    optSortDefault: "ترتيب حسب",
    optSortNameAsc: "الاسم (أ-ي / A-Z)",
    optSortNameDesc: "الاسم (ي-أ / Z-A)",
    optSortAgeAsc: "العمر (الأصغر أولاً)",
    optSortAgeDesc: "العمر (الأكبر أولاً)",
    darkTheme: "داكن",
    lightTheme: "فاتح",
    statTotalLabel: "إجمالي الأشخاص",
    statMaleLabel: "الذكور",
    statFemaleLabel: "الإناث",
    camModalTitle: "التقاط صورة",
    captureBtn: "التقاط",
    camError: "تعذّر الوصول إلى الكاميرا.",
    //  da lel catch falid
    loadError: "فشل تحميل البيانات من السيرفر.",
    saveError: "فشل الحفظ. حاول مرة أخرى.",
    deleteError: "فشل حذف السجل.",
  },
};

// في اللوكل استوردج عادي ملهاش علاقه بال api    //ليه علاقه بالمتصفح
let currentLang = localStorage.getItem("3s_lang") || "en"; // default بتاع اللغه وال الtheme
let currentTheme = localStorage.getItem("3s_theme") || "dark"; //3s theme amd lang  for keys in theme

function ageFromDate(dateStr) {
  if (!dateStr) return 0; ///  بياكد ان في قيمه لو مفيش هيرجه قيمه
  const dob = new Date(dateStr); /// بياخد الديت من اليوزر بشكل تاريخ
  const today = new Date(); ///اليوم الحالي
  let age = today.getFullYear() - dob.getFullYear(); //هنا بيحسب فرق السنين الاول
  const m = today.getMonth() - dob.getMonth(); //هنا بيحسب الشهر
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  // فهمت اوكيه علي شان لما نقص شهرك وشهر النهارده وطلع بالسلاب
  //  يبقي عيد ملادك لسه مداش يبقي هينقص سنه
  // او برضو اليوم وطلع بالاب او اصغر يبقي برضو هننقص سنه
  return Math.max(0, age); // لو حد طلع في المستقبل يطلع صفر او السنه بالسلاب
}

//ana keda ba3mel el garson
const api = axios.create({ baseURL: "http://10.200.90.14:8080/api" });
// da elend point ele petthat fe elakher]
const PEOPLE_URL = "/People"; // end point
let products = [];

// اختبار إن الباك شغال: بينادي GET /api/camera/status ويطبع الرسالة في الـ Console
async function checkCamera() {
  try {
    const res = await api.get("/camera/status");
    console.log(res.data.message); // "Camera API is available."
  } catch (err) {
    console.error("Camera API error:", err);
  }
}

async function loadPeople() {
  try {
    const res = await api.get(PEOPLE_URL);

    products = res.data.map((p) => {
      // داله بتمشي علي عنصر عنصر جوه المصفوفهوكل عنصر سمناه p
      const date = (p.birthDate ?? "").toString().slice(0, 10);
      return {
        id: p.id, // api الـ id اللي بنستخدمه في الحذف والتعديل
        name: p.name ?? "",
        gender: (p.gender ?? "male").toLowerCase(), // الجدول بيستخدم male/female بحروف صغيرة
        phone: p.phone ?? "",
        email: p.email ?? "",
        date: date,
        age: ageFromDate(date),
        image: p.picture ?? "",
      };
    });
    showProducts();
  } catch (err) {
    console.error("Load failed:", err);
    alert(i18n[currentLang].loadError);
  }
}

const table = document.getElementById("tableBody");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const searchFieldSelect = document.getElementById("searchFieldSelect");
const rangeLabel = document.getElementById("rangeLabel");
const sortSelect = document.getElementById("sortSelect");

const perPage = 10;
let currentPage = 1;
let searchText = "";
let searchField = "all";
let currentSort = "none";
let webcamStream = null;

function toggleTheme() {
  /// بنبدل بين الواضعين
  currentTheme = currentTheme === "dark" ? "light" : "dark"; // زي ال if  condation
  localStorage.setItem("3s_theme", currentTheme); /// بنحفظ في اللوكل اسنودج الوضع علي شان لما تيجي تحقظ تاني تلاقي اختيارك
  applyTheme();
}

function applyTheme() {
  const t = i18n[currentLang]; // دا ثابت بياخد اللغه الحاليه بس من ال i18n

  document.documentElement.setAttribute("data-theme", currentTheme);
  /// بينفز في الصفحه doc --             -بتدي خصيصيه     ( اسم الخصيصيه و القيمه بتاعتها            )

  const themeLabel = document.getElementById("themeLabel");
  const themeIcon = document.getElementById("themeIcon");

  if (themeLabel && themeIcon) {
    // بياكد ان الهناصر موجوده قي الزورار علي شان لو حصل خطا ميعملش ايرور ويسكب الحته دي
    if (currentTheme === "dark") {
      themeLabel.textContent = t.lightTheme;
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    } else {
      themeLabel.textContent = t.darkTheme;
      themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
    }
  }
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("3s_lang", currentLang); // دي علي شان لو المشتخدم قفل الصفحه وفتحها يلاقي نفس اللغه
  applyLanguage();
}

function updateSearchPlaceholder() {
  const t = i18n[currentLang];
  if (!searchInput) return;

  switch (
    searchField //بيغير النص الموجود جوه خانه البحث
  ) {
    case "name":
      searchInput.placeholder = t.searchPlaceholderName;
      break;
    case "phone":
      searchInput.placeholder = t.searchPlaceholderPhone;
      break;
    case "age":
      searchInput.placeholder = t.searchPlaceholderAge; //سرش
      break;
    case "date":
      searchInput.placeholder = t.searchPlaceholderDate;
      break;
    case "email":
      searchInput.placeholder = t.searchPlaceholderEmail;
      break;
    default:
      searchInput.placeholder = t.searchPlaceholderAll;
  }
}

function updateStats() {
  const total = products.length;
  const males = products.filter((p) => p.gender === "male").length;
  const females = products.filter((p) => p.gender === "female").length;

  if (document.getElementById("statTotalVal"))
    document.getElementById("statTotalVal").textContent = total;
  if (document.getElementById("statMaleVal"))
    /// da masol 3n tahdes el arkam
    document.getElementById("statMaleVal").textContent = males;
  if (document.getElementById("statFemaleVal"))
    document.getElementById("statFemaleVal").textContent = females;
}

function applyLanguage() {
  const t = i18n[currentLang];
  const isRtl = currentLang === "ar";

  document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", currentLang);

  if (document.getElementById("langLabel"))
    document.getElementById("langLabel").textContent = t.langLabel;
  if (document.getElementById("titleTxt"))
    document.getElementById("titleTxt").textContent = t.title;
  if (document.getElementById("refreshBtn"))
    document.getElementById("refreshBtn").textContent = t.refresh;
  if (document.getElementById("addBtn"))
    document.getElementById("addBtn").textContent = t.addPerson;

  if (document.getElementById("statTotalLabel"))
    document.getElementById("statTotalLabel").textContent = t.statTotalLabel;
  if (document.getElementById("statMaleLabel"))
    document.getElementById("statMaleLabel").textContent = t.statMaleLabel;
  if (document.getElementById("statFemaleLabel"))
    document.getElementById("statFemaleLabel").textContent = t.statFemaleLabel;

  updateSearchPlaceholder();

  if (document.getElementById("optSearchAll")) {
    document.getElementById("optSearchAll").textContent = t.optSearchAll;
    document.getElementById("optSearchName").textContent = t.optSearchName;
    document.getElementById("optSearchPhone").textContent = t.optSearchPhone;
    document.getElementById("optSearchAge").textContent = t.optSearchAge;
    document.getElementById("optSearchDate").textContent = t.optSearchDate;
    document.getElementById("optSearchEmail").textContent = t.optSearchEmail;
  }

  updateTableHeaderIcons();
  if (document.getElementById("thPhoto"))
    document.getElementById("thPhoto").textContent = t.thPhoto;
  if (document.getElementById("thGender"))
    document.getElementById("thGender").textContent = t.thGender;
  if (document.getElementById("thPhone"))
    document.getElementById("thPhone").textContent = t.thPhone;
  if (document.getElementById("thEmail"))
    document.getElementById("thEmail").textContent = t.thEmail;
  if (document.getElementById("thBirth"))
    document.getElementById("thBirth").textContent = t.thBirth;

  if (document.getElementById("lblFormPhoto"))
    document.getElementById("lblFormPhoto").textContent = t.lblFormPhoto;
  if (document.getElementById("uploadBtn"))
    document.getElementById("uploadBtn").textContent = t.uploadBtn;
  if (document.getElementById("camBtn"))
    document.getElementById("camBtn").textContent = t.camBtn;
  if (document.getElementById("lblFormName"))
    document.getElementById("lblFormName").textContent = t.lblFormName;
  if (document.getElementById("lblFormGender"))
    document.getElementById("lblFormGender").textContent = t.lblFormGender;
  if (document.getElementById("lblFormPhone"))
    document.getElementById("lblFormPhone").textContent = t.lblFormPhone;
  if (document.getElementById("lblFormEmail"))
    document.getElementById("lblFormEmail").textContent = t.lblFormEmail;
  if (document.getElementById("lblFormDate"))
    document.getElementById("lblFormDate").textContent = t.lblFormDate;
  if (document.getElementById("lblFormAge"))
    document.getElementById("lblFormAge").textContent = t.lblFormAge;
  if (document.getElementById("cancelBtn"))
    document.getElementById("cancelBtn").textContent = t.cancel;
  if (document.getElementById("saveBtn"))
    document.getElementById("saveBtn").textContent = t.save;

  if (document.getElementById("camModalTitle"))
    document.getElementById("camModalTitle").textContent = t.camModalTitle;
  if (document.getElementById("captureBtn"))
    document.getElementById("captureBtn").textContent = t.captureBtn;
  if (document.getElementById("camCancelBtn"))
    document.getElementById("camCancelBtn").textContent = t.cancel;

  if (document.getElementById("optSortDefault")) {
    document.getElementById("optSortDefault").textContent = t.optSortDefault;
    document.getElementById("optSortNameAsc").textContent = t.optSortNameAsc;
    document.getElementById("optSortNameDesc").textContent = t.optSortNameDesc;
    document.getElementById("optSortAgeAsc").textContent = t.optSortAgeAsc;
    document.getElementById("optSortAgeDesc").textContent = t.optSortAgeDesc;
  }

  applyTheme();
  showProducts();
}

function updateTableHeaderIcons() {
  const t = i18n[currentLang];
  let nameArrow = " ↕";
  let ageArrow = " ↕";

  if (currentSort === "name-asc") nameArrow = " ↑";
  if (currentSort === "name-desc") nameArrow = " ↓";
  if (currentSort === "age-asc") ageArrow = " ↑";
  if (currentSort === "age-desc") ageArrow = " ↓";

  if (document.getElementById("thName"))
    document.getElementById("thName").textContent = t.thName + nameArrow;
  if (document.getElementById("thAge"))
    document.getElementById("thAge").textContent = t.thAge + ageArrow;
}

function handleSearchFieldChange(fieldValue) {
  searchField = fieldValue;
  updateSearchPlaceholder();
  currentPage = 1;
  showProducts();
}

function handleSortChange(sortValue) {
  currentSort = sortValue;
  updateTableHeaderIcons();
  currentPage = 1;
  showProducts();
}

function toggleSortField(field) {
  if (field === "name") {
    currentSort = currentSort === "name-asc" ? "name-desc" : "name-asc";
  } else if (field === "age") {
    currentSort = currentSort === "age-asc" ? "age-desc" : "age-asc";
  }
  if (sortSelect) sortSelect.value = currentSort;
  updateTableHeaderIcons();
  currentPage = 1;
  showProducts();
}

function getProcessedProducts() {
  let result = [...products]; // بيعمل نسخه من الobject علي شان الترتيب ميبظش

  if (searchText.trim()) {
    // بيشوف اليوزر كتب حاجه ولللا لا
    const query = searchText.toLowerCase().trim(); //trim بتشيل المسافات

    result = result.filter((p) => {
      const originalIndex = (products.indexOf(p) + 1).toString();

      switch (searchField) {
        case "name":
          return p.name.toLowerCase().includes(query);
        case "phone":
          return p.phone.toLowerCase().includes(query);
        case "age":
          return p.age.toString().includes(query);
        case "date":
          return p.date.toLowerCase().includes(query);
        case "email":
          return p.email.toLowerCase().includes(query);
        case "all":
        default:
          const nameMatch = p.name.toLowerCase().includes(query);
          const phoneMatch = p.phone.toLowerCase().includes(query);
          const emailMatch = p.email.toLowerCase().includes(query);
          const dateMatch = p.date.toLowerCase().includes(query);
          const ageMatch = p.age.toString().includes(query);
          const indexMatch =
            originalIndex === query || originalIndex.includes(query);

          return (
            nameMatch ||
            phoneMatch ||
            emailMatch ||
            dateMatch ||
            ageMatch ||
            indexMatch
          );
      }
    });
  }

  if (currentSort === "name-asc") {
    result.sort((a, b) =>
      a.name.localeCompare(b.name, ["ar", "en"], { sensitivity: "base" }),
    );
  } else if (currentSort === "name-desc") {
    result.sort((a, b) =>
      b.name.localeCompare(a.name, ["ar", "en"], { sensitivity: "base" }),
    );
  } else if (currentSort === "age-asc") {
    result.sort((a, b) => Number(a.age) - Number(b.age));
  } else if (currentSort === "age-desc") {
    result.sort((a, b) => Number(b.age) - Number(a.age));
  }

  return result;
}

function showProducts() {
  const t = i18n[currentLang];
  const processed = getProcessedProducts();
  const start = (currentPage - 1) * perPage; // دي تقسيمه الصفحه 3-1  *10  =20
  const pageItems = processed.slice(start, start + perPage);

  updateStats();

  if (!table) return; // بتحدث الاحصائيات

  if (pageItems.length === 0) {
    //بياكد ان الصفحه تاخد 10 بس
    table.innerHTML = `<tr><td colspan="10"><div class="empty" style="text-align: center; padding: 20px; color: var(--text-muted);">${t.noMatches} "${searchText}"</div></td></tr>`;
  } else {
    table.innerHTML = pageItems
      .map((el) => {
        const index = products.indexOf(el); // بيجيب مكان الشخص في المصقوقه الاصليه مش مكانه في الصفحه
        const tagLabel = el.gender === "male" ? t.maleTag : t.femaleTag;
        const defaultAvatar =
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path><circle cx='12' cy='7' r='4'></circle></svg>";
        const avatarSrc = el.image ? el.image : defaultAvatar;

        // تعديل: الاسم الطويل يتقطع بـ ... والاسم الكامل يظهر في tooltip
        // (escape للعلامات عشان الاسم ميبوظش الـ HTML)
        const safeName = String(el.name)
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        return `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${avatarSrc}" class="table-avatar" alt="Avatar" /></td>
          <td class="name-cell"><span class="name-text" title="${safeName}">${safeName}</span></td>
          <td><span class="tag tag-${el.gender}">${tagLabel}</span></td>
          <td>+20 ${el.phone}</td>
          <td class="muted-cell">${el.email}</td>
          <td class="muted-cell">${el.date}</td>
          <td>${el.age}</td>
          <td><button class="icon-btn" onclick="openModal(${index})">${t.edit}</button></td>
          <td><button class="icon-btn danger" onclick="removePerson(${index})">${t.remove}</button></td>
        </tr>`;
      })
      .join("");
  }

  if (rangeLabel) {
    rangeLabel.textContent = processed.length
      ? `${start + 1}–${Math.min(start + perPage, processed.length)} ${t.showingOf} ${processed.length}`
      : "0 of 0";
  }

  showPagination(processed.length);
}

function showPagination(totalFilteredCount) {
  if (!pagination) return;
  const totalPages = Math.ceil(totalFilteredCount / perPage) || 1;

  let html = `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">‹</a>
    </li>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
      </li>`;
  }

  html += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">›</a>
    </li>`;

  pagination.innerHTML = html;
}

function changePage(page) {
  const totalPages = Math.ceil(getProcessedProducts().length / perPage) || 1;
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  showProducts();
}
///----------------------//-////-------------///---------------------------
async function removePerson(index) {
  const t = i18n[currentLang];
  if (confirm(t.confirmDelete)) {
    // التحزير بتاع الحزف
    try {
      const id = products[index].id; // بيجيب ال id الحقيقي من ds
      await api.delete(`${PEOPLE_URL}/${id}`); // ليه بال    id      مش بالindex   index change from any process as delet

      await loadPeople(); // بعد الحزف بيعمل رقرش لصفحه اوتوماتك
    } catch (err) {
      console.error("Delete failed:", err);
      alert(t.deleteError);
      return;
    }

    const totalPages = Math.ceil(getProcessedProducts().length / perPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages; // بيرجعك علي اخر صفحه لو عندك اكتر من واحده

    showProducts();
  }
}

async function showProductsRefresh() {
  searchText = "";
  searchField = "all";
  if (searchInput) searchInput.value = "";
  if (searchFieldSelect) searchFieldSelect.value = "all"; // بتصفر البحث وكل حاخجه //بتجيب اخر تحديث من السرفر
  updateSearchPlaceholder();
  currentPage = 1;

  await loadPeople(); // بيحمل القايمه باخر تحديث من السرقر

  showProducts();
}

function openModal(editIdx = -1) {
  // دا الاسم الاقديم مش هنسي  ان شاء الله
  if (editIdx < 0) {
    /// لو نديت ال open model     من غير ما تبعت حاجه    معني مفيش شخص يعني اصافه
    window.location.href = "newuser.html";
    return;
  }
  const id = products[editIdx].id;
  window.location.href = `./edit.html?index=${editIdx}&id=${id}`; // بتجيب الid الحقيقي
}

function closeModal() {
  const modal = document.getElementById("userModal");
  if (modal) modal.classList.remove("active");
}

function compressImage(src, maxSize = 400, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(img.width * scale));
      c.height = Math.max(1, Math.round(img.height * scale));
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    img.src = src;
  });
}

/* دالة واحدة بتحط الصورة في الحقل المخفي والمعاينة */
function setPhoto(base64String) {
  document.getElementById("inputImageBase64").value = base64String;
  const preview = document.getElementById("previewImg");
  preview.src = base64String;
  preview.style.display = "block";
}

///بيختاالصوره
//بيقرا الملف url base 64
//تصغير الصوره بيعملها كمبرس
//بيحط الصوره في الهدن وبيستني يدوس سيف علي شان يعملها معاينه
//بعد ما يدوس حفظ ال api بيبعته
function handleImageUpload(e) {
  const input = e.target;
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function (uploadEvent) {
    try {
      setPhoto(await compressImage(uploadEvent.target.result));
    } catch (err) {
      console.error("Image load failed:", err);
    }
    input.value = "";
  };
  reader.readAsDataURL(file);
}

async function openCameraModal() {
  const camModal = document.getElementById("cameraModal");
  if (camModal) camModal.classList.add("active");
  const video = document.getElementById("webcamVideo");
  try {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop()); // علي شان لو المستخدم قفل الكاميرا بطريقه خلط قبل كده يقفلها
      webcamStream = null;
    }
    webcamStream = await navigator.mediaDevices.getUserMedia({ video: true }); // دا شرط المستخدم بالموافقه علي فتح الكاميرا
    video.srcObject = webcamStream;
    await video.play();
  } catch (err) {
    console.error(err);
    alert(i18n[currentLang].camError);
    closeCameraModal();
  }
}

function closeCameraModal() {
  const camModal = document.getElementById("cameraModal");
  if (camModal) camModal.classList.remove("active"); //بتشيل الكلاس اكتف من الcss
  if (webcamStream) {
    webcamStream.getTracks().forEach((track) => track.stop());
    webcamStream = null;
  }
}

async function captureWebcam() {
  const video = document.getElementById("webcamVideo");
  if (!video.videoWidth) return;

  const canvas = document.getElementById("webcamCanvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  try {
    setPhoto(await compressImage(canvas.toDataURL("image/jpeg", 0.9)));
  } catch (err) {
    console.error("Capture failed:", err);
  }

  closeCameraModal();
}

function calculateAge() {
  const dobVal = document.getElementById("inputDate").value;
  if (!dobVal) return;

  const dob = new Date(dobVal);
  const today = new Date();

  let calculatedAge = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    calculatedAge--;
  }

  document.getElementById("inputAge").value = Math.max(0, calculatedAge);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const editIdx = parseInt(document.getElementById("editIndex").value);

  const updatedPerson = {
    name: document.getElementById("inputName").value,
    gender: document.getElementById("inputGender").value,
    phone: document.getElementById("inputPhone").value,
    email: document.getElementById("inputEmail").value,
    date: document.getElementById("inputDate").value,
    age: parseInt(document.getElementById("inputAge").value) || 0,
    image: document.getElementById("inputImageBase64").value || "",
  };

  const personForApi = {
    name: updatedPerson.name,
    gender: updatedPerson.gender,
    phone: updatedPerson.phone,
    email: updatedPerson.email,
    birthDate: updatedPerson.date,
    picture: updatedPerson.image || null, // لو مفيش صورة نبعت null مش نص فاضي
  };

  try {
    if (editIdx >= 0) {
      const id = products[editIdx].id;
      await api.put(`${PEOPLE_URL}/${id}`, { id, ...personForApi }); // put  edit
    } else {
      await api.post(PEOPLE_URL, personForApi); //post  add
    }

    await loadPeople();
    closeModal();
  } catch (err) {
    console.error("Save failed:", err);
    alert(i18n[currentLang].saveError);
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchText = e.target.value;
    currentPage = 1;
    showProducts();
  });
}

// تعديل: رقم التلفون أرقام بس وبحد أقصى 10 أرقام
const phoneInput = document.getElementById("inputPhone");
if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
  });
}

applyLanguage();

loadPeople();
checkCamera();
