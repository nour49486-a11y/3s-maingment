let webcamStream = null;
let reconnectTimer = null;

const api = axios.create({
  baseURL: "http://10.200.90.14:8080/api",
  timeout: 15000,
});

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

function setPicture(base64String) {
  document.getElementById("inputImageBase64").value = base64String;
  const preview = document.getElementById("previewImg");
  preview.src = base64String;
  preview.style.display = "inline-block";
}

function handleImageUpload(e) {
  const input = e.target;
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function (uploadEvent) {
    const base64String = await compressImage(uploadEvent.target.result);
    setPicture(base64String);
    input.value = "";
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
  setPicture(base64String);

  const modalElement = document.getElementById("cameraModal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  closeCameraModal();
}

function startLiveStream() {
  const img = document.getElementById("remoteVideo");
  const status = document.getElementById("remoteStatus");
  if (!img || !status) return;

  img.crossOrigin = "anonymous";

  const connect = () => {
    img.src = api.defaults.baseURL + "/live/stream?t=" + Date.now();
  };

  img.onload = () => {
    if (!status.dataset.flash) status.textContent = "Live";
  };

  img.onerror = () => {
    if (!status.dataset.flash) status.textContent = "Waiting for the camera...";
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connect, 2000);
  };

  connect();
}

async function captureRemote() {
  const img = document.getElementById("remoteVideo");
  const status = document.getElementById("remoteStatus");

  if (!img || !img.naturalWidth) {
    alert("The camera is not live yet.");
    return;
  }

  try {
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext("2d").drawImage(img, 0, 0);

    const base64String = await compressImage(c.toDataURL("image/jpeg", 0.9));
    setPicture(base64String);

    status.dataset.flash = "1";
    status.textContent = "Photo captured ✅";
    setTimeout(() => {
      delete status.dataset.flash;
      status.textContent = "Live";
    }, 3000);
  } catch (err) {
    console.error("Capture failed:", err);
    alert("Capture failed. Check that CORS is enabled on the backend.");
  }
}

function stopLiveStream() {
  clearTimeout(reconnectTimer);
  const liveImg = document.getElementById("remoteVideo");
  if (liveImg) {
    liveImg.onerror = null;
    liveImg.removeAttribute("src");
  }
}

document.addEventListener("DOMContentLoaded", startLiveStream);

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const dateInput = document.getElementById("date");

  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  if (!userForm) return;

  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = dateInput.value;
    const image = document.getElementById("inputImageBase64").value || "";

    const newPerson = {
      name,
      gender,
      phone,
      email,
      birthDate: date,
      picture: image || null,
    };

    stopLiveStream();

    try {
      await api.post(PEOPLE_URL, newPerson);
      window.location.href = "./index.html";
    } catch (err) {
      startLiveStream();

      const status = err.response?.status;
      const data = err.response?.data;
      console.error("Save failed:", status, data || err.message, err);
      alert(
        "Failed to save.\nStatus: " +
          (status || "no response (network/CORS/timeout)") +
          "\n" +
          (typeof data === "string"
            ? data
            : JSON.stringify(data || err.message)),
      );
    }
  });
});
