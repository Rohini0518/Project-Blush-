import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
  Paper,
} from "@mui/material";
import { filterProducts } from "../../config/formConfig";

export default function ProductFilter({ filters, handleFilter }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        minWidth: 240,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2.5,
        height: "fit-content",
        position: "sticky",
        marginTop: "50px",
        paddingLeft: "60px",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mb: 2, letterSpacing: "-0.3px" }}
      >
        Filters
      </Typography>

      {filterProducts.map((section, idx) => (
        <Box key={section.name}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{
              mb: 1,
              mt: idx === 0 ? 0 : 2,
              textTransform: "lowercase",
              fontSize: "0.85rem",
              color: "text.primary",
            }}
          >
            {section.label.toLowerCase()}
          </Typography>

          {section.componentType === "checkbox" && (
            <FormGroup>
              {section.options.map((opt) => {
                const checked = (filters[section.name] || []).includes(opt.id);

                return (
                  <FormControlLabel
                    key={opt.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={checked}
                        onChange={(e) =>
                          handleFilter(section.name, opt.id, e.target.checked)
                        }
                        sx={{
                          color: "text.disabled",
                          "&.Mui-checked": { color: "primary.main" },
                          p: "4px 8px",
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ userSelect: "none" }}>
                        {opt.label}
                      </Typography>
                    }
                    sx={{ ml: 0, my: 0.1 }}
                  />
                );
              })}
            </FormGroup>
          )}

          {idx < filterProducts.length - 1 && <Divider sx={{ mt: 2 }} />}
        </Box>
      ))}
    </Paper>
  );
}
