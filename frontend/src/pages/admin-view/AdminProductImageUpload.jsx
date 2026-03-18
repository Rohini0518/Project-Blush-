import { Box, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRef } from "react";

const AdminProductImageUpload = (props) => {
  const { imageFile, setImageFile, uploadedImage, setUploadedImage } = props;
const inputref=useRef(null);
const handleImageChange=(e)=>{
  const value=e.target.files;
  console.log(value)
}
  return (
    <Box display="flex" flexDirection="column" gap={1.5} sx={{ mb: "20px" }}>
      <Typography variant="subtitle2" fontWeight={700}>
        Upload Image
      </Typography>

      <input id="image-upload" type="file" style={{ display: "none" }} 
      ref={inputref} onChange={handleImageChange}
      />

      <label htmlFor="image-upload">
        <Button
          fullWidth
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ 
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Choose File
        </Button>
      </label>
    </Box>
  );
};

export default AdminProductImageUpload;
