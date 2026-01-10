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
      <Box>
        <Box
          component="img"
          src={img}
          sx={{
            width: { xs: 180, md: 250 },
            height: { xs: 180, md: 250 },
            borderRadius: "50%",
            objectFit: "cover",
            ...sx,
          }}
        />
      </Box>
    </>
  );
}
