"use client";

import Header from "@/components/_organisms/Header";
import { Box } from "@mui/system";
import Footer from "@/components/_organisms/Footer";
import MainBody from "@/components/_organisms/MainBody";
import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/fb_config";
import { useState, useEffect } from "react";
import { ThemeProvider, Typography } from "@mui/material";
import { theme } from "@/utils/theme";
import FaqPage from "@/components/_organisms/FaqPage";
import { colours } from "@/config/palette";
import UserProvider from "@/components/_atoms/UserProvider";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Header />
          <Box sx={{ overflow: "hidden", flex: 1 }}>
            <MainBody />
          </Box>
          <Box
            style={{ backgroundColor: colours.SECONDARY1 }}
            paddingBottom={"3rem"}
          >
            <Typography
              marginTop="1rem"
              paddingLeft={"1rem"}
              variant="h4"
              color="white"
              fontWeight={600}
            >
              What is this?
            </Typography>
          </Box>
        </Box>
        <FaqPage />
        <Footer />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
