import { Card } from "@mui/joy";

export default function BaseCard({ children, sx }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        boxShadow: "lg",
        borderRadius: "md",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
