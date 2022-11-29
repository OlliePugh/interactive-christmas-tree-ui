import { Box } from "@mui/system";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Bulbs from "../Bulbs";
import { treeDimensions, treeStreamId } from "../../config";
import { useEffect, useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { functions } from "../../config/fb_config";
import { resetLights } from "../../utils/fb_funcs";
import BaublePaper from "../BaublePaper";
import Countdown from "../../_atoms/Countdown";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { placementCooldown } from "../../config";

const MainBody = ({ sx, userData }) => {
  const [virtualBulbsVisible, setVirtualBulbsVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState();
  const [toastOpen, setToastOpen] = useState(false);
  const [baubleOpen, setBaubleOpen] = useState();
  const [lastBulbPlacement, setLastBulbPlacement] = useState(0);

  useEffect(() => {
    if (!!toastMessage) {
      setToastOpen(true);
    }
  }, [toastMessage]);

  return (
    <Box sx={{ ...sx, height: "100%" }}>
      <BaublePaper
        setBaubleOpen={setBaubleOpen}
        baubleOpen={baubleOpen}
        userData={userData}
        boardId={1}
        setToastMessage={setToastMessage}
      />
      <BaublePaper
        setBaubleOpen={setBaubleOpen}
        baubleOpen={baubleOpen}
        userData={userData}
        boardId={2}
        setToastMessage={setToastMessage}
      />
      <BaublePaper
        setBaubleOpen={setBaubleOpen}
        baubleOpen={baubleOpen}
        userData={userData}
        boardId={3}
        setToastMessage={setToastMessage}
      />

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
        Hide Overlay
      </Button>
      <Button
        onClick={() => {
          resetLights(functions, { length: 50 });
        }}
      >
        Reset Lights
      </Button>
      <HourglassEmptyIcon style={{ transform: "translateY(7px)" }} />
      <Countdown
        key={`0-${lastBulbPlacement}`}
        targetDate={lastBulbPlacement + placementCooldown}
      />
      <TransformWrapper
        limitToBounds={false}
        minScale={0.2}
        maxScale={15}
        initialScale={1}
        centerZoomedOut={false}
      >
        <TransformComponent>
          <iframe
            style={{
              transformOrigin: "top left",
              transform: `translateY(${treeDimensions.height}px) rotate(-90deg)`,
            }}
            width={treeDimensions.height}
            height={treeDimensions.width}
            src={`https://www.youtube.com/embed/${treeStreamId}?autoplay=1&mute=1&enablejsapi=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <Bulbs
            userData={userData}
            visible={virtualBulbsVisible}
            height={treeDimensions.height}
            width={treeDimensions.width}
            setToastMessage={setToastMessage}
            openBauble={setBaubleOpen}
            lastPlacement={lastBulbPlacement}
            setLastPlacement={setLastBulbPlacement}
          />
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export default MainBody;
