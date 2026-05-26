import { useState } from "react";
import CommonForm from "@/components/common/CommonForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/adminOrderSlice";
import { useToast } from "@/hooks/useToast";
import {
  Box,
  Typography,
  Chip,
  Divider,
  DialogContent,
} from "@mui/material";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  function getStatusColor(status) {
    if (status === "confirmed") return "success";
    if (status === "rejected") return "error";
    return "default";
  }

  function getStatusBgColor(status) {
    if (status === "confirmed") return "green";
    if (status === "rejected") return "#dc2626";
    return "black";
  }

  return (
    <DialogContent sx={{ width: { sm: "600px" }, maxWidth: "100%" }}>
      <Box sx={{ display: "grid", gap: 3, mt: 1 }}>

        <Box sx={{ display: "grid", gap: 1.5 }}>
          {[
            { label: "Order ID", value: orderDetails?._id },
            { label: "Order Date", value: orderDetails?.orderDate?.split("T")[0] },
            { label: "Order Price", value: `$${orderDetails?.totalAmount}` },
            { label: "Payment Method", value: orderDetails?.paymentMethod },
            { label: "Payment Status", value: orderDetails?.paymentStatus },
          ].map(({ label, value }) => (
            <Box
              key={label}
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography fontWeight={500}>{label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {value}
              </Typography>
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography fontWeight={500}>Order Status</Typography>
            <Chip
              label={orderDetails?.orderStatus}
              size="small"
              sx={{
                backgroundColor: getStatusBgColor(orderDetails?.orderStatus),
                color: "white",
                fontWeight: 500,
                px: 1,
              }}
            />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography fontWeight={500}>Order Details</Typography>
          <Box component="ul" sx={{ display: "grid", gap: 1.5, p: 0, m: 0, listStyle: "none" }}>
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails.cartItems.map((item, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Typography variant="body2">Title: {item.title}</Typography>
                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                    <Typography variant="body2">Price: ${item.price}</Typography>
                  </Box>
                ))
              : null}
          </Box>
        </Box>

        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography fontWeight={500}>Shipping Info</Typography>
          <Box sx={{ display: "grid", gap: 0.5 }}>
            {[
              user.userName,
              orderDetails?.addressInfo?.address,
              orderDetails?.addressInfo?.city,
              orderDetails?.addressInfo?.pincode,
              orderDetails?.addressInfo?.phone,
              orderDetails?.addressInfo?.notes,
            ].map((info, index) =>
              info ? (
                <Typography key={index} variant="body2" color="text.secondary">
                  {info}
                </Typography>
              ) : null
            )}
          </Box>
        </Box>

        <Box>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </Box>

      </Box>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;