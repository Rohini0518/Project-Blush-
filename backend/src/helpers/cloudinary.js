import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const storage =  multer.memoryStorage();

async function handleImageUploadUtil(file) {
  const uploadResult = await cloudinary.uploader
    .upload(file, {
      resource_type: "auto",
    })
    .catch((error) => {
      console.log(error, "cloudinary upload error");
      res.json({
      success: false,
      message: "Error Occured",
    });
        throw error; 

    });

  console.log(uploadResult);
  return uploadResult;
}

const cloudinaryUpload = multer({ storage });

export { cloudinaryUpload, handleImageUploadUtil };
