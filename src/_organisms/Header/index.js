import { Box } from "@mui/system";
import { colours } from "../../utils/palette";
import { Typography } from "@mui/material";
import AccountActions from "../AccountActions";

const Header = ({ signInCallback, signOutCallback, userData }) => {
  return (
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
        The Internet's Christmas Tree
      </Typography>
      <AccountActions
        signInCallback={signInCallback}
        signOutCallback={signOutCallback}
        userData={userData}
      />
    </Box>
  );
};

export default Header;
