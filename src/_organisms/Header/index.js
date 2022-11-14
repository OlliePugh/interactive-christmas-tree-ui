import { Box } from "@mui/system";
import { colours } from "../../utils/palette";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: colours.PRIMARY1,
        padding: "10px",
      }}
    >
      <Typography sx={{ display: "inline", flex: 1, color: "white" }}>
        The Internet's Christmas Tree
      </Typography>
      <Typography sx={{ display: "inline", color: "white" }}>Login</Typography>
    </Box>
  );
};

export default Header;
