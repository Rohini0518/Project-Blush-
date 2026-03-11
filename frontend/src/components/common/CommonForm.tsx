import { Box, Button, MenuItem, TextField } from "@mui/material";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || "";
    switch (controlItem.componentType) {
      case "input":
        return (
          <TextField
            fullWidth
            label={controlItem.label}
            name={controlItem.name}
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
            value={value}
          />
        );

      case "select":
        return (
          <TextField
            select
            fullWidth
            label={controlItem.label}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(value) =>
              setFormData({ ...formData, [controlItem.name]: value })
            }
          >
            {controlItem.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case "textarea":
        return (
          <TextField
            multiline
            rows={4}
            fullWidth
            label={controlItem.label}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
      default:
        <TextField
          fullWidth
          label={controlItem.label}
          name={controlItem.name}
          type={controlItem.type || "text"}
          placeholder={controlItem.placeholder}
          id={controlItem.name}
          value={value}
          onChange={(event) =>
            setFormData({
              ...formData,
              [controlItem.name]: event.target.value,
            })
          }
        />;
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        {formControls?.map((controlItem) => (
          <div key={controlItem.name}>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </Box>
      <Button type="submit">{buttonText || "Submit"}</Button>
    </form>
  );
};

export default CommonForm;
