

import path from "node:path";

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve("./src/config/.env") });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

// Setup Multer Storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const fileFormat = file.mimetype === 'application/dicom' ? 'dcm' : 'jpg';
        return {
          folder: 'dicom_images',
          format: fileFormat, // 'dcm' for DICOM files
          public_id: `dicom_${Date.now()}_${file.originalname}`,
        };
      },
});

// Setup Multer
const upload = multer({ storage });

export { cloudinary, upload };

