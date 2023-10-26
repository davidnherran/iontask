import { Theme, responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";

let theme: Theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#04014a",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
