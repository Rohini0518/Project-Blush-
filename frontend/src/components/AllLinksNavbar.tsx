import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {shoppingViewHeaderItems} from '../config/formConfig';


export default function AllLinksNavbar() {
  
  const location = useLocation();

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        py: 0,
        flexWrap: "wrap",
        borderTop: "1px solid #f0ece6",
        borderBottom: "1px solid #f0ece6",
        background: "#fff",
      }}
    >
      {shoppingViewHeaderItems.map((nav) => {
        const isActive = location.pathname === nav.path;
        return (
          <Link key={nav.path} to={nav.path} style={{ textDecoration: "none" }}>
            <Typography
              component="span"
              sx={{
                position: "relative",
                color: isActive ? "#1a1a1a" : "#666",
                fontSize: { md: "11px", lg: "12px" },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: isActive ? 600 : 400,
                letterSpacing: "0.1em",
                px: 2,
                py: 1.8,
                display: "inline-block",
                transition: "color 0.2s ease",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: isActive ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                  transformOrigin: "center",
                  width: "60%",
                  height: "2px",
                  background: "#c5a882",
                  transition: "transform 0.25s ease",
                },
                "&:hover": {
                  color: "#1a1a1a",
                  "&::after": {
                    transform: "translateX(-50%) scaleX(1)",
                  },
                },
              }}
            >
              {nav.label}
            </Typography>
          </Link>
        );
      })}
    </Box>
  );
}