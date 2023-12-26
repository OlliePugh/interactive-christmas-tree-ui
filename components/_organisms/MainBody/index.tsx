import { Box, SxProps } from "@mui/system";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Bulbs from "../Bulbs";
import { projectClosed, treeDimensions } from "@/config/config";
import { useEffect, useState } from "react";
import { Button, Snackbar, Alert, AlertColor } from "@mui/material";
import BaublePaper from "../BaublePaper";
import Countdown from "../../_atoms/Countdown";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { placementCooldown } from "@/config/config";
import TreeStream from "../TreeStream";
import NavigationSphere from "../../_atoms/NavigationCircle";
import { ToastPayload } from "@/@types/toast";
import { useJoyride } from "@/components/_atoms/JoyrideProvider";

interface MainBodyProps {
  sx?: SxProps;
}

const MainBody = ({ sx }: MainBodyProps) => {
  const [virtualBulbsVisible, setVirtualBulbsVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState<ToastPayload | undefined>();
  const [toastOpen, setToastOpen] = useState(false);
  const [baubleOpen, setBaubleOpen] = useState<number | null>(null);
  const [lastBulbPlacement, setLastBulbPlacement] = useState(0);
  const { update, isInJoyride } = useJoyride();

  useEffect(() => {
    if (!!toastMessage) {
      setToastOpen(true);
    }
  }, [toastMessage]);

  return (
    <Box className="joyride-full-app" sx={{ ...sx, height: "100%" }}>
      <NavigationSphere />
      <BaublePaper
        setBaubleOpen={setBaubleOpen}
        baubleOpen={baubleOpen}
        boardId={1}
        setToastMessage={setToastMessage}
      />
      <BaublePaper
        setBaubleOpen={setBaubleOpen}
        baubleOpen={baubleOpen}
        boardId={2}
        setToastMessage={setToastMessage}
      />
      <BaublePaper
        setBaubleOpen={setBaubleOpen}
        baubleOpen={baubleOpen}
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
          id="hide-overlay-button"
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
        <HourglassEmptyIcon />
        <Countdown
          key={`0-${lastBulbPlacement}`}
          targetDate={lastBulbPlacement + placementCooldown}
        />
      </Box>
      <TransformWrapper
        disabled={isInJoyride}
        limitToBounds={false}
        minScale={0.2}
        maxScale={15}
        initialScale={1}
        centerZoomedOut={false}
      >
        <TransformComponent>
          {projectClosed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              height={1280}
              width={720}
              src="tree.jpeg"
              alt="A still image of the interactive christmas tree"
            />
          ) : (
            <TreeStream />
          )}

          <Bulbs
            visible={virtualBulbsVisible}
            height={treeDimensions.height}
            width={treeDimensions.width}
            setToastMessage={setToastMessage}
            openBauble={(value: number | null) => {
              setBaubleOpen(value);
              if (value === 3) {
                update({ baublePressed: true });
              }
            }}
            lastPlacement={lastBulbPlacement}
            setLastPlacement={setLastBulbPlacement}
          />
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export default MainBody;
