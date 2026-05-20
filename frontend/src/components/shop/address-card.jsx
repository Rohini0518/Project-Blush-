import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import PhoneIcon from "@mui/icons-material/Phone";
import NoteIcon from "@mui/icons-material/Note";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      sx={{
        cursor: setCurrentSelectedAddress ? "pointer" : "default",
        border: isSelected ? "2.5px solid #b71c1c" : "1.5px solid #e0e0e0",
        borderRadius: 3,
        boxShadow: isSelected
          ? "0 4px 24px 0 rgba(183,28,28,0.15)"
          : "0 2px 10px 0 rgba(0,0,0,0.07)",
        transition: "box-shadow 0.2s, border 0.2s, transform 0.15s",
        position: "relative",
        overflow: "visible",
        background: isSelected
          ? "linear-gradient(135deg, #fff5f5 0%, #fff 100%)"
          : "#fff",
        "&:hover": {
          boxShadow: "0 6px 28px 0 rgba(183,28,28,0.13)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {isSelected && (
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: 14,
            zIndex: 2,
          }}
        >
          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
            label="Selected"
            size="small"
            sx={{
              backgroundColor: "#b71c1c",
              color: "#fff",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: 0.5,
              "& .MuiChip-icon": { color: "#fff" },
            }}
          />
        </Box>
      )}

      <CardContent sx={{ pb: 1, pt: 2.5, px: 2.5 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          <InfoRow
            icon={<LocationOnIcon sx={{ color: "#b71c1c", fontSize: 18 }} />}
            label="Address"
            value={addressInfo?.address}
          />
          <InfoRow
            icon={<LocationCityIcon sx={{ color: "#b71c1c", fontSize: 18 }} />}
            label="City"
            value={addressInfo?.city}
          />
          <InfoRow
            icon={
              <MarkunreadMailboxIcon sx={{ color: "#b71c1c", fontSize: 18 }} />
            }
            label="Pincode"
            value={addressInfo?.pincode}
          />
          <InfoRow
            icon={<PhoneIcon sx={{ color: "#b71c1c", fontSize: 18 }} />}
            label="Phone"
            value={addressInfo?.phone}
          />
          <InfoRow
            icon={<NoteIcon sx={{ color: "#b71c1c", fontSize: 18 }} />}
            label="Notes"
            value={addressInfo?.notes}
          />
        </Box>
      </CardContent>

      <Divider sx={{ mx: 2, borderColor: "#f5f5f5" }} />

      <CardActions sx={{ px: 2, py: 1.5, justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
          sx={{
            borderColor: "#b71c1c",
            color: "#b71c1c",
            borderRadius: 2,
            fontWeight: 600,
            fontSize: 13,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#fff5f5",
              borderColor: "#b71c1c",
            },
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          sx={{
            backgroundColor: "#b71c1c",
            color: "#fff",
            borderRadius: 2,
            fontWeight: 600,
            fontSize: 13,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#7f1010",
              boxShadow: "none",
            },
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
      <Box sx={{ mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.5 }}>
        <Box
          component="span"
          sx={{ fontWeight: 600, color: "#222", mr: 0.5 }}
        >
          {label}:
        </Box>
        {value || "—"}
      </Typography>
    </Box>
  );
}

export default AddressCard;