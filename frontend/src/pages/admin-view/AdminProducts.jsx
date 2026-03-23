import { useEffect, useState } from "react";
import { Box, Button, Drawer, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonForm from "../../components/common/CommonForm";
import { addAdminProductFormElements } from "../../config/formConfig";
import AdminProductImageUpload from "./AdminProductImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  getAllAdminProducts,
} from "../../store/admin/adminProductSlice";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreatePrdDialog, setOpenCreatePrdDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalData = {
      ...formData,
      image: uploadedImage,
    };

    try {
      const result = await dispatch(addNewProduct(finalData)).unwrap();
      console.log("submitted data is", result);
      setFormData(initialFormData);
      setUploadedImage("");
      setOpenCreatePrdDialog(false);
    } catch (error) {
      console.log("addProduct Failed-error", error);
    }
  };

  useEffect(() => {
    dispatch(getAllAdminProducts());
  }, [dispatch]);

  console.log(productList, "formData-productList");

  return (
    <>
      <Button variant="contained" onClick={() => setOpenCreatePrdDialog(true)}>
        Add New Product
      </Button>

      <Drawer
        anchor="right"
        open={openCreatePrdDialog}
        onClose={() => setOpenCreatePrdDialog(false)}
      >
        <Box
          sx={{
            width: 450,
            p: 2,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "cen ter",
              mb: 2,
            }}
          >
            <Typography variant="h6">Add New Product</Typography>

            <IconButton onClick={() => setOpenCreatePrdDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <AdminProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
          />
          <CommonForm
            formData={formData}
            setFormData={setFormData}
            formControls={addAdminProductFormElements}
            buttonText="Add"
            onSubmit={handleSubmit}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default AdminProducts;
