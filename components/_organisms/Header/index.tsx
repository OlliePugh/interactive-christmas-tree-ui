import { Box } from "@mui/system";
import { colours } from "@/config/palette";
import { Typography } from "@mui/material";
import AccountActions from "../AccountActions";

const Header = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      backgroundColor: colours.PRIMARY1,
      padding: "10px",
    }}
  >
    <Typography
      sx={{
        display: "inline",
        flex: 1,
        color: "white",
        fontWeight: "bold",
      }}
      variant="h4"
    >
      The Interactive Christmas Tree{" "}
      <Typography
        sx={{
          display: "block",
          flex: 1,
          color: "white",
          fontWeight: "thin",
          fontStyle: "italic",
        }}
        variant="caption"
      >
        By Ollie Q - Hourly updates on Twitter{" "}
        <a
          href="https://twitter.com/interactivexmas"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", color: "lightblue" }}
        >
          @InteractiveXmas
        </a>
      </Typography>
    </Typography>
    <AccountActions />
  </Box>
);

export default Header;
