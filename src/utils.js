import { baseURL } from "./api/axiosClient";

export const handleUploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const path = `${baseURL}/image/upload`;
        const res = await fetch(path, {
          method: "POST",
          body: JSON.stringify({ data: reader.result }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
        resolve(res.secure_url);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};
