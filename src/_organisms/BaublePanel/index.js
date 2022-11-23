import { useEffect, useState, useRef } from "react";
import { ref, get } from "firebase/database";
import { resetBoard } from "../../utils/fb_funcs";
import realtime, { functions } from "../../config/fb_config";
import {
  TransformWrapper,
  TransformComponent,
} from "@tiendeo/react-zoom-pan-pinch";
import { placementCooldown } from "../../config";
import Board from "../Board";

const BaublePanel = ({ userData, boardId, setToastMessage, shouldLoad }) => {
  // could use an array of refs here to have access to each squares value
  const [{ boardWidth, boardHeight }, setBoardDimensions] = useState({
    boardWidth: null,
    boardHeight: null,
  });
  const [loading, setLoading] = useState(true);
  const lastPlacement = useRef(0);

  const initCanvas = async () => {
    await resetBoard(functions, { boardId: 1, width: 160, height: 124 });
  };

  const canvasListener = async () => {
    const metaDataRef = ref(realtime, `board${boardId}/metadata`);
    const result = await get(metaDataRef);
    const { height, width } = result.val();
    setBoardDimensions({ boardHeight: height, boardWidth: width });
    setLoading(false);
  };

  const placeCooldownCheck = () => {
    const now = new Date().getTime();
    if (now - lastPlacement.current > placementCooldown) {
      lastPlacement.current = now;
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
  }, [loading]);

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
      <TransformComponent>
        <div className="Board">
          <div className="Canvas">
            {boardWidth && boardHeight && (
              <Board
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
