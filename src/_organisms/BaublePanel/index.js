import { useCallback, useEffect, useState } from "react";
import { ref, get } from "firebase/database";
// import { resetBoard } from "../../utils/fb_funcs";
import realtime from "../../config/fb_config";
import {
  TransformWrapper,
  TransformComponent,
} from "@tiendeo/react-zoom-pan-pinch";
import { placementCooldown } from "../../config";
import Board from "../Board";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Countdown from "../../_atoms/Countdown";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const BaublePanel = ({
  setBaubleOpen,
  userData,
  boardId,
  setToastMessage,
  shouldLoad,
}) => {
  // could use an array of refs here to have access to each squares value
  const [{ boardWidth, boardHeight }, setBoardDimensions] = useState({
    boardWidth: null,
    boardHeight: null,
  });
  const [loading, setLoading] = useState(true);
  const [lastPlacement, setLastPlacement] = useState(0);

  // const initCanvas = () => {
  //   resetBoard(functions, { boardId: boardId, width: 160, height: 128 });
  // };

  // // useEffect(initCanvas, []);

  const canvasListener = useCallback(async () => {
    const metaDataRef = ref(realtime, `board${boardId}/metadata`);
    const result = await get(metaDataRef);
    const { height, width } = result.val();
    setBoardDimensions({ boardHeight: height, boardWidth: width });
    setLoading(false);
  }, [boardId]);

  const placeCooldownCheck = () => {
    const now = Date.now();
    if (now - lastPlacement > placementCooldown) {
      setLastPlacement(now);
      return true;
    } else {
      setToastMessage({
        message: "Cooldown not finished...",
        severity: "error",
      });
      return false;
    }
  };

  useEffect(() => {
    canvasListener();
  }, [loading, canvasListener]);

  if (loading) {
    return (
      <div className="Loading">
        <div className="Loading_Text">Getting Bauble Size...</div>
      </div>
    );
  }

  return (
    <TransformWrapper
      limitToBounds={false}
      minScale={0.5}
      maxScale={15}
      initialScale={2}
      initialPositionX={100}
      initialPositionY={100}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 100,
          display: "inline",
          right: 0,
        }}
      >
        <HourglassEmptyIcon style={{ transform: "translateY(7px)" }} />
        <Countdown
          key={`${boardId}-${lastPlacement}`}
          targetDate={lastPlacement + placementCooldown}
        />
        <IconButton key={lastPlacement} onClick={() => setBaubleOpen()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <TransformComponent>
        <div className="Board">
          <div className="Canvas">
            {boardWidth && boardHeight && (
              <Board
                userData={userData}
                setToastMessage={setToastMessage}
                width={boardWidth}
                height={boardHeight}
                boardId={boardId}
                placeCooldownCheck={placeCooldownCheck}
                shouldLoad={shouldLoad}
              />
            )}
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default BaublePanel;
