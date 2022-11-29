import { Typography, Link, Box } from "@mui/material";

const LoggedInHeader = ({ signOutCallback, userData }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="space-evenly"
    >
      <Typography color="white">{userData.displayName}</Typography>
      <Link underline="none" component="button" onClick={signOutCallback}>
        <Typography
          textAlign={"right"}
          sx={{ fontStyle: "italic", fontWeight: "200" }}
          color="white"
        >
          Sign Out
        </Typography>
      </Link>
    </Box>
  );
};

export default LoggedInHeader;
