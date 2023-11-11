import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "cursive"].join(","),
  },
});

theme = responsiveFontSizes(theme);

export { theme };
