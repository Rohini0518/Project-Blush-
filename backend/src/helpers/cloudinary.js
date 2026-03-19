import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dow6qprq8",
  api_key: "976946189218995",
  api_secret: process.env.API_CLOUDINARY,
});

const storage = new multer.memoryStorage();

async function handleImageUploadUtil(file) {
  const uploadResult = await cloudinary.uploader
    .upload(file, {
      resource_type: "auto",
    })
    .catch((error) => {
      console.log(error, "cloudinary upload error");
    });

  console.log(uploadResult);
  return uploadResult;
}

const cloudinaryUpload = multer({ storage });

export { cloudinaryUpload, handleImageUploadUtil };
