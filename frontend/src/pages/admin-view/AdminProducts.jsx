import { useState } from "react";
import { Box, Button, Drawer, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonForm from "../../components/common/CommonForm";
import { addAdminProductFormElements } from "../../config/formConfig";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};


const AdminProducts = () => {
  const [openCreatePrdDialog, setOpenCreatePrdDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit=()=>{
    console.log("submitted data is")
  }
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
            width: 350,
            p: 2,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Add New Product</Typography>

            <IconButton onClick={() => setOpenCreatePrdDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="body2">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addAdminProductFormElements}
              buttonText="add"
             onSubmit={handleSubmit}
            />
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default AdminProducts;
