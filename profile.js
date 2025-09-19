
document.addEventListener("DOMContentLoaded", () => {
    const profilePreview = document.getElementById("profilePreview");
    const uploadBtn = document.getElementById("uploadBtn") || null;
  
    if (!profilePreview) return;
  
    // Create hidden file input
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
  
    const handleFile = async () => {
      const file = fileInput.files[0];
      if (!file) return;
  
      let blob = file;
  
      // Convert HEIC/HEIF to JPEG
      if (file.type === "image/heic" || file.type === "image/heif") {
        try {
          blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
        } catch (err) {
          alert("Failed to convert HEIC image. Try another file.");
          return;
        }
      }
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        profilePreview.src = dataURL;
        localStorage.setItem("profilePic", dataURL);
      };
      reader.readAsDataURL(blob);
    };
  
    profilePreview.addEventListener("click", () => fileInput.click());
    if (uploadBtn) uploadBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", handleFile);
  
    // Load saved pic
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) profilePreview.src = savedPic;
  });
  