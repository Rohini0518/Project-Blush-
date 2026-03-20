import { Box, Typography, Button, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useRef } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import { axiosInstance } from "../../api/axiosInstance";

const AdminProductImageUpload = (props) => {
  const { imageFile, setImageFile, uploadedImage, setUploadedImage, imageLoading, setimageLoading } = props;
  const inputref = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
    else alert("no file uploaded");
    console.log(file, "uploaded file");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files, "-e.dataTransfer.files");
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImageFile(null);
    if (inputref.current) {
      inputref.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    console.log(axiosInstance, "axios Instance");

    try {
      const data = new FormData();
      data.append("img-file", imageFile);
      console.log(axiosInstance, "axios Instance");
      const response = await axiosInstance.post(
        "/api/admin/products/upload-image",
        data,
      );
      console.log(
        response.data,
        response.data.result.url,
        "imageupload response-data",
      );
      if (response) {
        setUploadedImage(response.data.result.url);
        setimageLoading(false)
      }
      console.log(uploadedImage,"uploadedImageUrl")
    } catch (error) {
      console.log(error, error.message, "uploadimage error");
    }
  };

  useEffect(() => {
    console.log(import.meta.env.VITE_API_BASE_URL, "baseurl");
    console.log("useeffect, uploadimagetocloudinary");
    console.log("imageFIle-", imageFile);
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <Box display="flex" flexDirection="column" gap={1.5} sx={{ mb: "20px" }}>
      <Typography variant="subtitle2" fontWeight={700}>
        Upload Image
      </Typography>
      <Box
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{ minHeight: "100px" }}
      >
        <input
          id="image-upload"
          type="file"
          style={{ display: "none" }}
          ref={inputref}
          onChange={handleImageChange}
        />

        <label htmlFor="image-upload">
          <Box
            component="span"
            sx={{
              width: "100%",
              border: "2px dashed #989797",
              borderRadius: 2,
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            {imageFile ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <InsertDriveFileIcon color="primary" />
                  <Typography variant="body1" noWrap>
                    {imageFile.name}
                  </Typography>
                </Box>

                <IconButton size="small" onClick={handleRemoveImage}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CloudUploadIcon fontSize="large" color="primary" />
                  <Typography>
                    Drag and drop or click to upload files
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </label>
      </Box>
    </Box>
  );
};

export default AdminProductImageUpload;
