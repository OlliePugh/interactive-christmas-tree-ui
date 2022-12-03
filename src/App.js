import Header from "./_organisms/Header";
import { Box } from "@mui/system";
import Footer from "./_organisms/Footer";
import MainBody from "./_organisms/MainBody";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "./config/fb_config";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const App = () => {
  const [userData, setUserData] = useState(false);
  const provider = new GoogleAuthProvider();

  const signInWrapper = () => {
    signInWithRedirect(auth, provider).then((result) => {
      setUserData(result.user);
    });
  };

  const signOutWrapper = () => {
    signOut(auth, provider).then((_) => {
      setUserData(false);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, [userData]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Header
          signInCallback={signInWrapper}
          signOutCallback={signOutWrapper}
          userData={userData}
        />
        <Box sx={{ overflow: "hidden", flex: 1 }}>
          <MainBody userData={userData} />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
