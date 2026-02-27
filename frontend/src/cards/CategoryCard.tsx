import { Box } from "@mui/material";
import type { Theme } from "@mui/material";
import type { SxProps } from "@mui/material";

type CategoryCardProps = {
  img: string;
  sx?: SxProps<Theme>;
};

export default function CategoryCard({ img, sx }: CategoryCardProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          gap: 0,
        }}
      >
        {/* Outer ring */}
        <Box
          sx={{
            borderRadius: "50%",
            padding: "3px",
            background: "linear-gradient(135deg, #c5a882 0%, #e8d5be 50%, #c5a882 100%)",
            boxShadow: "0 4px 18px rgba(197,168,130,0.3)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.06)",
              boxShadow: "0 8px 28px rgba(197,168,130,0.45)",
              "& .cat-img": {
                transform: "scale(1.08)",
              },
            },
          }}
        >
          {/* Inner white gap ring */}
          <Box
            sx={{
              borderRadius: "50%",
              padding: "3px",
              background: "#fff",
            }}
          >
            {/* Image */}
            <Box
              sx={{
                width: { xs: 90, md: 120 },
                height: { xs: 90, md: 120 },
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={img}
                className="cat-img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "50%",
                  transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  ...sx,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}