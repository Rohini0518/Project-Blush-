import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AllLinksNavbar() {
  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "NEW ARRIVALS", path: "/products/new" },
    { label: "FULL SETS", path: "/products/full-sets" },
    { label: "KURTHIES", path: "/products/kurthies" },
    { label: "KURTHA PANT", path: "/products/kurtha-pant" },
    { label: "CO-ORD SETS", path: "/products/co-ord" },
    { label: "TOPS", path: "/products/tops" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        py: 2,
        flexWrap: "wrap",
      }}
    >
      {navLinks.map((nav) => (
        <Link key={nav.path} to={nav.path} style={{ textDecoration: "none" }}>
          <Typography
            component="span"
            sx={{
              color: "#333333",
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              padding: "20px 15px",
              display: "inline-block",
              fontWeight: 200,
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {nav.label}
          </Typography>
        </Link>
      ))}
    </Box>
  );
}
