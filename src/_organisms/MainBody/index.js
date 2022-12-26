import { Box } from "@mui/system";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Bulbs from "../Bulbs";
import { treeDimensions } from "../../config";
import { useEffect, useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import BaublePaper from "../BaublePaper";
import Countdown from "../../_atoms/Countdown";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { placementCooldown } from "../../config";
import NavigationSphere from "../../_atoms/NavigationCircle";

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
      <Box borderBottom={"1px solid black"}>
        <Button
          onClick={() => {
            setVirtualBulbsVisible(!virtualBulbsVisible);
          }}
        >
          Hide Overlay
        </Button>
        {/* <Button
        onClick={() => {
          resetLights(functions, { length: 50 });
        }}
        >
        Reset Lights
      </Button> */}
        <HourglassEmptyIcon style={{ transform: "translateY(7px)" }} />
        <Countdown
          key={`0-${lastBulbPlacement}`}
          targetDate={lastBulbPlacement + placementCooldown}
        />
      </Box>
      <NavigationSphere />
      <TransformWrapper
        limitToBounds={false}
        minScale={0.2}
        maxScale={15}
        initialScale={1}
        centerZoomedOut={false}
      >
        <TransformComponent>
          <img
            height={1280}
            alt="Bauble"
            src={require("../../assetts/tree.jpeg")}
          />
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
