import { Typography, Link } from "@mui/material";
import LoggedInHeader from "../../_atoms/LoggedInHeader";
import { User } from "firebase/auth";

interface AccountActionsProps {
  signInCallback: () => void;
  signOutCallback: () => void;
  userData: User | boolean;
}
const AccountActions = ({
  signInCallback,
  signOutCallback,
  userData,
}: AccountActionsProps) => {
  return (
    <>
      {userData ? (
        <LoggedInHeader
          signOutCallback={signOutCallback}
          userData={userData as User}
        />
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
