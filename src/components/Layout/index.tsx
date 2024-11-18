import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Box component="div" sx={{ width: "100vw", height: "100vh", py: 2 }}>
      <Container maxWidth="md" sx={{ height: "100%" }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default RootLayout;
