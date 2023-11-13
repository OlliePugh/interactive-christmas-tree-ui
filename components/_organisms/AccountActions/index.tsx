import { Typography, Link } from "@mui/material";
import LoggedInHeader from "../../_atoms/LoggedInHeader";
import { UserContext } from "@/components/_atoms/UserProvider";
import { useContext } from "react";

const AccountActions = () => {
  const { user, signIn, signOut } = useContext(UserContext);
  return (
    <>
      {user ? (
        <LoggedInHeader signOutCallback={signOut} userData={user} />
      ) : (
        <Link component="button" onClick={signIn} underline="none">
          <Typography sx={{ display: "inline", color: "white" }}>
            Login
          </Typography>
        </Link>
      )}
    </>
  );
};

export default AccountActions;
