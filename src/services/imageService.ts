import axios from "axios";

// You should preferably move these to environment variables
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
// NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_unsigned_preset"

const CLOUD_NAME = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dchkv39u8").trim();
const UPLOAD_PRESET = (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "whistleapp_preset").trim();

export const imageService = {
  async upload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error: any) {
      const cloudinaryMessage =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message;
      console.error("Cloudinary upload error:", cloudinaryMessage, error?.response?.data);
      throw new Error(cloudinaryMessage || "فشل في رفع الصورة");
    }
  },
};