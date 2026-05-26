import { useEffect, useState } from "react";
import CommonForm from "../common/CommonForm";
import { addressFormControls } from "@/config/formConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/addressSlice.js";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/useToast";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  const isEditing = currentEditedId !== null;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1.5px solid #f0f0f0",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {addressList && addressList.length > 0 && (
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "#222",
              mb: 2,
              fontSize: 15,
              letterSpacing: 0.2,
            }}
          >
            Saved Addresses
            <Box
              component="span"
              sx={{
                ml: 1,
                fontSize: 12,
                fontWeight: 500,
                color: "#b71c1c",
                background: "#fff5f5",
                border: "1px solid #ffcdd2",
                borderRadius: 10,
                px: 1,
                py: 0.2,
                verticalAlign: "middle",
              }}
            >
              {addressList.length} / 3
            </Box>
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            {addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))}
          </Box>
        </Box>
      )}

      {addressList && addressList.length > 0 && (
        <Divider sx={{ mx: 3, borderColor: "#f5f5f5" }} />
      )}

      <Box sx={{ p: 3, pt: addressList && addressList.length > 0 ? 2.5 : 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2.5 }}>
          <Paper
            elevation={0}
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              background: isEditing ? "#fff3e0" : "#fff5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isEditing ? (
              <EditLocationAltIcon sx={{ color: "#e65100", fontSize: 20 }} />
            ) : (
              <AddLocationAltIcon sx={{ color: "#b71c1c", fontSize: 20 }} />
            )}
          </Paper>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#1a1a1a", fontSize: 17, lineHeight: 1.2 }}
            >
              {isEditing ? "Edit Address" : "Add New Address"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#888", fontSize: 12 }}>
              {isEditing
                ? "Update your saved delivery address"
                : "Fill in details to save a new address"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            background: "#fafafa",
            borderRadius: 3,
            border: "1px solid #f0f0f0",
            p: 2.5,
          }}
        >
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={isEditing ? "Edit" : "Add"}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </Box>
      </Box>
    </Card>
  );
}

export default Address;