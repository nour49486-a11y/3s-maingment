let webcamStream = null;

const api = axios.create({ baseURL: "http://10.200.90.14:8080/api" });

const PEOPLE_URL = "/People";

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

function handleImageUpload(e) {
  const input = e.target;
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function (uploadEvent) {
    const base64String = await compressImage(uploadEvent.target.result);
    document.getElementById("inputImageBase64").value = base64String;
    const preview = document.getElementById("previewImg");
    preview.src = base64String;
    preview.style.display = "inline-block";
    input.value = ""; // عشان لو اختار نفس الصورة تاني يشتغل
  };
  reader.readAsDataURL(file);
}

async function openCameraModal() {
  const modalElement = document.getElementById("cameraModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const video = document.getElementById("webcamVideo");
  try {
    webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = webcamStream;
  } catch (err) {
    alert("Could not access webcam.");
    modal.hide();
  }
}

function closeCameraModal() {
  if (webcamStream) {
    webcamStream.getTracks().forEach((track) => track.stop());
    webcamStream = null;
  }
}

async function captureWebcam() {
  const video = document.getElementById("webcamVideo");
  const canvas = document.getElementById("webcamCanvas");
  canvas.width = video.videoWidth || 320;
  canvas.height = video.videoHeight || 240;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const base64String = await compressImage(canvas.toDataURL("image/jpeg", 0.9));

  document.getElementById("inputImageBase64").value = base64String;
  const preview = document.getElementById("previewImg");
  preview.src = base64String;
  preview.style.display = "inline-block";

  const modalElement = document.getElementById("cameraModal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  closeCameraModal();
}

// تعديل: بيشيل أي حاجة مش رقم وبيقطع الرقم عند 10 أرقام
function cleanPhone(value) {
  return String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, 10);
}

document.addEventListener("DOMContentLoaded", async () => {
  // تعديل: رقم التلفون أرقام بس وبحد أقصى 10 أرقام وقت الكتابة
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = cleanPhone(phoneInput.value);
    });
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);

    const userId = urlParams.get("id");

    if (!userId) {
      alert("No person selected.");
      window.location.href = "./index.html";
      return;
    }

    const res = await api.get(`${PEOPLE_URL}/${userId}`); // بيرجه بيانات الشخص في صقحه ال edit
    const currentUser = res.data;

    const birthDate = (currentUser.birthDate ?? "").toString().slice(0, 10);

    //  أسماء الحقول من الـ Backend: birthDate (بدل date) و picture (بدل image)
    document.getElementById("name").value = currentUser.name || "";
    document.getElementById("gender").value = (
      currentUser.gender || "male"
    ).toLowerCase();
    // تعديل: لو الرقم القديم أطول من 10 أرقام أو فيه رموز، بيتنضف هنا
    document.getElementById("phone").value = cleanPhone(currentUser.phone);
    document.getElementById("email").value = currentUser.email || "";
    document.getElementById("date").value = birthDate;

    if (currentUser.picture) {
      document.getElementById("inputImageBase64").value = currentUser.picture;
      const preview = document.getElementById("previewImg");
      preview.src = currentUser.picture;
      preview.style.display = "inline-block";
    }

    const form = document.getElementById("userForm"); //بيفعل زورار الحفظ والتعديل

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dateValue = document.getElementById("date").value;
      const existingImage = currentUser.picture || "";
      const newImage = document.getElementById("inputImageBase64").value;

      const updatedPerson = {
        id: Number(userId),
        name: document.getElementById("name").value.trim(),
        gender: document.getElementById("gender").value,
        phone: cleanPhone(document.getElementById("phone").value.trim()),
        email: document.getElementById("email").value.trim(),
        birthDate: dateValue,
        picture: newImage ? newImage : existingImage || null,
      };

      /// put بيعدل في السرفر
      try {
        await api.put(`${PEOPLE_URL}/${userId}`, updatedPerson);
        window.location.href = "./index.html";
      } catch (err) {
        console.error("Update failed:", err);
        alert(
          "Failed to update. Make sure the server is running and try again.",
        );
      }
    });
  } catch (err) {
    console.error("Error details:", err);
    alert("Failed to load this person: " + err.message);
  }
});
