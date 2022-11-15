import { Typography, Link } from "@mui/material";
import LoggedInHeader from "../../_atoms/LoggedInHeader";

const AccountActions = ({ signInCallback, signOutCallback, userData }) => {
  return (
    <>
      {userData ? (
        <LoggedInHeader signOutCallback={signOutCallback} userData={userData} />
      ) : (
        <Link component="button" onClick={signInCallback} underline="none">
          <Typography sx={{ display: "inline", color: "white" }}>
            Login
          </Typography>
        </Link>
      )}
    </>
  );
};

export default AccountActions;
