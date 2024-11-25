import { createTheme, responsiveFontSizes } from "@mui/material";
import typography from "./typography";

const theme = createTheme({
  typography: typography,
});

export default responsiveFontSizes(theme);
