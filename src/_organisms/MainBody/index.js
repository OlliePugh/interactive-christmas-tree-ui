import { Box } from "@mui/system";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Bulbs from "../Bulbs";
import { treeDimensions } from "../../config";
import { useEffect, useState } from "react";
import { Button, Snackbar, Alert, Paper } from "@mui/material";
import { functions } from "../../config/fb_config";
import { resetLights } from "../../utils/fb_funcs";
import BaublePanel from "../BaublePanel";
import OutsideClickHandler from "react-outside-click-handler";

const MainBody = ({ sx, userData }) => {
  const [virtualBulbsVisible, setVirtualBulbsVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState();
  const [toastOpen, setToastOpen] = useState(false);
  const [baubleOpen, setBaubleOpen] = useState();

  console.log("Bauble Open", baubleOpen);

  useEffect(() => {
    if (!!toastMessage) {
      setToastOpen(true);
    }
  }, [toastMessage]);

  return (
    <Box sx={{ ...sx }}>
      <OutsideClickHandler onOutsideClick={() => setBaubleOpen()}>
        <Paper
          sx={{
            display: baubleOpen === 1 ? "block" : "none",
            zIndex: 100,
            margin: "auto",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            position: "absolute",
            height: "80%",
            width: "95%",
            overflow: "hidden",
          }}
          elevation={24}
          className={"bauble-wrapper"}
        >
          <BaublePanel
            userData={userData}
            boardId={1}
            setToastMessage={setToastMessage}
          />
        </Paper>
      </OutsideClickHandler>

      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setToastOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setToastOpen(false);
          }}
          severity={toastMessage?.severity}
          sx={{ width: "100%" }}
        >
          {toastMessage?.message}
        </Alert>
      </Snackbar>
      <Button
        onClick={() => {
          setVirtualBulbsVisible(!virtualBulbsVisible);
        }}
      >
        Hide Stream
      </Button>
      <Button
        onClick={() => {
          resetLights(functions, { length: 50 });
        }}
      >
        Reset Lights
      </Button>
      <TransformWrapper
        limitToBounds={false}
        minScale={0.2}
        maxScale={15}
        initialScale={1}
        centerZoomedOut={false}
      >
        <TransformComponent>
          <img
            alt="Christmas Tree"
            style={{
              transformOrigin: "top left",
              transform: `translateY(${treeDimensions.height}px) rotate(-90deg)`,
            }}
            src={"http://192.168.1.182:8080/?action=stream"}
          />
          <Bulbs
            userData={userData}
            visible={virtualBulbsVisible}
            height={treeDimensions.height}
            width={treeDimensions.width}
            setToastMessage={setToastMessage}
            openBauble={setBaubleOpen}
          />
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export default MainBody;
