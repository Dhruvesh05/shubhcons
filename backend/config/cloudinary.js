import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const missingCreds = !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug logs
if (missingCreds) {
  console.error("❌ Cloudinary credentials missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in backend/.env");
} else {
  console.log("✅ Cloudinary configured successfully");
}

export const assertCloudinaryConfigured = () => {
  if (missingCreds) {
    const err = new Error("Cloudinary is not configured. Set CLOUDINARY_* env vars.");
    err.status = 500;
    throw err;
  }
};

export default cloudinary;