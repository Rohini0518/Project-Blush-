import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dow6qprq8",
  api_key: "976946189218995",
  api_secret: "M_K6on5huPw1DZljF090Ry-FGX0",
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

const upload = multer({ storage });

export { upload, handleImageUploadUtil };
