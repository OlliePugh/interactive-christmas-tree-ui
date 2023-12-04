import { createTheme, responsiveFontSizes } from "@mui/material";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

let theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
});

theme = responsiveFontSizes(theme);

export { theme };
