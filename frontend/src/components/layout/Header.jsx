import { Box, Typography, Avatar } from "@mui/joy";

export default function Header() {
  const textFontColor = "#fff"
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      bgcolor: "#111111",
    }}>
      <Box
        sx={{
          height: "15vh",
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h1"
          sx={{
            color: `${textFontColor}`
          }}>
          AquaMonitor
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar />
          <Typography level="body-sm"
            sx={{
              color: "#fff"
            }}>
            Daniel Ferreira
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
