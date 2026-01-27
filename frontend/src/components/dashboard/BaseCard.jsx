import { Card, Box } from "@mui/joy";
import '../../styles/fonts.css'

export default function BaseCard({ children, sx }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",

        display: "flex",

        boxShadow: "lg",
        borderRadius: "md",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
