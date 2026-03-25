import { Box, Button, MenuItem, TextField } from "@mui/material";

const styledTextField = {
  "& .MuiInputLabel-root": {
    position: "static",
    transform: "none",
    fontSize: "14px",
    fontWeight: 600,
    color: "#1a1a2e",
    mb: "6px",
    fontFamily: "'DM Sans', sans-serif",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1a1a2e",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#f0f4ff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    "& fieldset": {
      border: "1.5px solid transparent",
    },
    "&:hover fieldset": {
      border: "1.5px solid #1a1a2e",
    },
    "&.Mui-focused fieldset": {
      border: "1.5px solid #1a1a2e",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 16px",
  },
};

const emptyTextField = {
  ...styledTextField,
  "& .MuiOutlinedInput-root": {
    ...styledTextField["& .MuiOutlinedInput-root"],
    backgroundColor: "#ffffff",
    "& fieldset": {
      border: "1.5px solid #e2e8f0",
    },
    "&:hover fieldset": {
      border: "1.5px solid #1a1a2e",
    },
    "&.Mui-focused fieldset": {
      border: "1.5px solid #1a1a2e",
    },
  },
};

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled
}) => {
  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || "";
    const sx = value ? styledTextField : emptyTextField;

    switch (controlItem.componentType) {
      case "input":
        return (
          <TextField
            fullWidth
            label={controlItem.label}
            name={controlItem.name}
            type={controlItem.type || "text"}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
            sx={sx}
          />
        );
case "select":
  return (
    <TextField
      select
      fullWidth
      label={controlItem.label}
      name={controlItem.name}
      value={value}
      onChange={(e) =>
        setFormData({ ...formData, [controlItem.name]: e.target.value })
      }
      slotProps={{
        select: {
          displayEmpty: true,
          renderValue: (selected) => {
            if (!selected) {
              return (
                <span style={{ color: "#9e9e9e" }}>
                  {controlItem.placeholder || `Select ${controlItem.label}`}
                </span>
              );
            }

            const selectedOption = controlItem.options.find(
              (opt) => opt.id === selected
            );

            return selectedOption?.label || selected;
          },
        },
      }}
      sx={sx}
    >
      {controlItem.options?.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );

      case "textarea":
        return (
          <TextField
            multiline
            fullWidth
            rows={4}
            label={controlItem.label}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
            sx={{
              ...sx,
              "& .MuiOutlinedInput-input": {
                padding: "12px 16px",
              },
            }}
          />
        );

      default:
        return (
          <TextField
            label={controlItem.label}
            name={controlItem.name}
            type={controlItem.type || "text"}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
            sx={sx}
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <Box display="flex" flexDirection="column" gap="18px">
        {formControls?.map((controlItem) => (
          <div key={controlItem.name}>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </Box>

      <Button
        type="submit"
        fullWidth
         disabled={isBtnDisabled} 
        variant="contained"
        sx={{
          mt: "24px",
          py: "14px",
          fontSize: "15px",
          fontWeight: 700,
          color:'#fff',
          fontFamily: "'DM Sans', sans-serif",
          backgroundColor: "#1a1a2e",
          borderRadius: "10px",
          textTransform: "none",
          letterSpacing: "0.3px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#2d2d50",
            boxShadow: "none",
          },
          "&:active": {
            transform: "scale(0.99)",
          },
        }}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
