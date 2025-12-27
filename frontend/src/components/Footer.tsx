import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import blushLogo from "../assets/blushlogo.jpg";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "3rem 0 2rem 0",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          <Box>
            <Box
                component="img"
                src={blushLogo}
                alt="Logo"
                sx={{
                height: 100 ,
                width:  100 ,
                borderRadius: "50%",
                objectFit: "cover",
                }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#b0b0b0",
                lineHeight: 1.8,
                marginBottom: 2,
              }}
            >
              We strive to bring premium quality at an affordable price. Blush
              Boutique By Sushma provides super lightweight, elegant and stylish outfits.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                aria-label="facebook"
                sx={{
                  color: "#fff",
                  "&:hover": { color: "#c0efbb" },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="instagram"
                sx={{
                  color: "#fff",
                  "&:hover": { color: "#c0efbb" },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="youtube"
                sx={{
                  color: "#fff",
                  "&:hover": { color: "#c0efbb" },
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#c0efbb",
                marginBottom: 2,
                fontWeight: 600,
              }}
            >
              About Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Shop
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Home
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Contact Us
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#c0efbb",
                marginBottom: 2,
                fontWeight: 600,
              }}
            >
              Terms & Conditions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Terms & Conditions
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Customer Services
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Shopping Policy
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#c0efbb",
                marginBottom: 2,
                fontWeight: 600,
              }}
            >
              Account
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                My Account
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Track Your Order
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#b0b0b0",
                  "&:hover": { color: "#c0efbb" },
                  transition: "color 0.3s",
                }}
              >
                Returns & Refunds
              </Link>
            </Box>
          </Box>
        </Box>

       
      </Container>
    </Box>
  );
}