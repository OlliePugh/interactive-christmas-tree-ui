import { Box } from "@mui/system";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Bulbs from "../Bulbs";
import { treeDimensions } from "../../config";
import { useEffect, useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { functions } from "../../config/fb_config";
import { resetLights } from "../../utils/fb_funcs";

const MainBody = ({ sx, userData }) => {
  const [virtualBulbsVisible, setVirtualBulbsVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState();
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (!!toastMessage) {
      setToastOpen(true);
    }
  }, [toastMessage]);

  return (
    <Box sx={{ ...sx }}>
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
        centerZoomedOut={true}
      >
        <TransformComponent>
          <img
            alt="Christmas Tree"
            height={treeDimensions.height}
            width={treeDimensions.width}
            // src={require("../../assetts/tree.jpg")}
            src={"http://192.168.1.182:8080/?action=stream"}
          />
          <Bulbs
            userData={userData}
            visible={virtualBulbsVisible}
            height={treeDimensions.height}
            width={treeDimensions.width}
            setToastMessage={setToastMessage}
          />
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export default MainBody;
