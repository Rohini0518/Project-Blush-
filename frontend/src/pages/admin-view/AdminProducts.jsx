import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonForm from "../../components/common/CommonForm";
import { addAdminProductFormElements } from "../../config/formConfig";
import AdminProductImageUpload from "./AdminProductImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  getAllAdminProducts,
  updateProduct,
} from "../../store/admin/adminProductSlice";
import { useToast } from "../../hooks/useToast";
import AdminProductCard from "./AdminProductCard";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  size: "",
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
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalData = {
      ...formData,
      image: uploadedImage,
    };
    try {
      let result;
      if (editId) {
        result = await dispatch(
          updateProduct({ id: editId, formData: finalData }),
        ).unwrap();
      } else {
        result = await dispatch(addNewProduct(finalData)).unwrap();
      }
      if (result.success) {
        dispatch(getAllAdminProducts());
        setFormData(initialFormData);
        setUploadedImage("");
        setEditId(null);
        setOpenCreatePrdDialog(false);
        showToast(
          editId
            ? "Product Updated SuccesssFully"
            : "New Product Added Successfully!",
          "success",
        );
      }
    } catch (error) {
      showToast("product Operation Failed", "error");
    }
  };
  const isFormFilled = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleDelete= async (productId)=>{
    try {
      const response = await dispatch(deleteProduct(productId)).unwrap();
      dispatch(getAllAdminProducts());
    } catch (error) {
      
    }  }

 const handleEdit = (product) => {
    setOpenCreatePrdDialog(true);
    setEditId(product._id);
    setFormData(product);
    setUploadedImage(product.image);
  };



  useEffect(() => {
    dispatch(getAllAdminProducts());
  }, [dispatch]);


  return (
    <>
      <Button variant="contained" onClick={() => setOpenCreatePrdDialog(true)}>
        Add New Product
      </Button>

      <Drawer
        anchor="right"
        open={openCreatePrdDialog}
        onClose={() => {
          setOpenCreatePrdDialog(false);
          setEditId(null);
          setFormData(initialFormData);
          setUploadedImage("");
          setImageFile(null);
        }}
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
            buttonText={editId ? "Update Product" : "Add Product"}
            onSubmit={handleSubmit}
            isBtnDisabled={!isFormFilled()}
          />
        </Box>
      </Drawer>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {productList.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={4} lg={3}>
            <AdminProductCard
              product={product}
              setEditId={setEditId}
              setOpenCreatePrdDialog={setOpenCreatePrdDialog}
              setFormData={setFormData}
              setUploadedImage={setUploadedImage}
              handleDelete={ handleDelete}
              handleEdit={handleEdit}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AdminProducts;
