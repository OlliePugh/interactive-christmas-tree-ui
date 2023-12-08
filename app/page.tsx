"use client";

import Header from "@/components/_organisms/Header";
import { Box } from "@mui/system";
import Footer from "@/components/_organisms/Footer";
import MainBody from "@/components/_organisms/MainBody";
import { ThemeProvider, Typography } from "@mui/material";
import { theme } from "@/utils/theme";
import FaqPage from "@/components/_organisms/FaqPage";
import { colours } from "@/config/palette";
import UserProvider from "@/components/_atoms/UserProvider";
import AnalyticsProvider from "@/components/_atoms/PostHogProvider";
import dynamic from "next/dynamic";
import { useState } from "react";
import JoyrideProvider from "@/components/_atoms/JoyrideProvider";

const App = () => {
  return (
    <AnalyticsProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <JoyrideProvider>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
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
          </JoyrideProvider>
        </UserProvider>
        <FaqPage />
        <Footer />
      </ThemeProvider>
    </AnalyticsProvider>
  );
};

export default App;
