import multer from "multer";
import cloudinary, { assertCloudinaryConfigured } from "../config/cloudinary.js";

// ===============================
// File Filter
// ===============================
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "video/mp4",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// ===============================
// Multer (memory storage)
// ===============================
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

// ===============================
// Cloudinary Upload Helper
// ===============================
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const resourceType = file.mimetype.startsWith("video")
      ? "video"
      : "image";

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "shubh_projects",
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
};

// ===============================
// Wrapped Middleware
// ===============================
const wrappedUpload = {
  single: (fieldName) => async (req, res, next) => {
    try {
      assertCloudinaryConfigured();
    } catch (cfgErr) {
      return res.status(cfgErr.status || 500).json({
        success: false,
        message: cfgErr.message || "Cloudinary not configured",
      });
    }

    // Ensure predictable shape
    req.uploadedFile = null;

    upload.single(fieldName)(req, res, async (err) => {
      if (err) {
        console.error("❌ Multer Error:", err.message);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      try {
        if (req.file) {
          console.log("☁️ Uploading to Cloudinary...");

          const result = await uploadToCloudinary(req.file);

          // ✅ IMPORTANT: attach clean object
          req.uploadedFile = {
            url: result.secure_url,
            public_id: result.public_id,
          };

          console.log("✅ Upload success:", result.secure_url);
        } else {
          console.log("ℹ️ No file provided, skipping Cloudinary upload");
        }

        next();
      } catch (error) {
        console.error("❌ Cloudinary Error:", error.message);
        // Fallback: allow request to proceed without image
        req.uploadedFile = null;
        next();
      }
    });
  },
};

export default wrappedUpload;