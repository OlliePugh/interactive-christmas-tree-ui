import { useEffect, useState, useRef } from "react";
import { ref, get, child } from "firebase/database";
import { resetBoard } from "../../utils/fb_funcs";
import realtime, { functions } from "../../config/fb_config";
import { colors } from "../../utils/palette";
import Square from "./Square";
import Tools from "../Tools/Tools";
import {
  TransformWrapper,
  TransformComponent,
} from "@tiendeo/react-zoom-pan-pinch";
import { placementCooldown } from "../../config";

function Board({ userData, boardId }) {
  // could use an array of refs here to have access to each squares value
  const [{ boardWidth, boardHeight }, setBoardDimensions] = useState({
    boardWidth: null,
    boardHeight: null,
  });
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [loading, setLoading] = useState(true);
  const lastPlacement = useRef(0);

  const initCanvas = async () => {
    await resetBoard(functions, { boardId: 1, width: 80, height: 80 });
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
      console.log("not so fast");
      return false;
    }
  };

  const squareColorize = (color) => {
    let r = document.querySelector(":root");
    r.style.setProperty("--squareBgColor", color);
    setCurrentColor(color);
  };

  useEffect(() => {
    canvasListener();
  }, [loading]);

  if (loading) {
    return (
      <div className="Loading">
        <div className="Loading_Text">Loading...</div>
      </div>
    );
  }

  return (
    <TransformWrapper
      limitToBounds={false}
      minScale={0}
      maxScale={15}
      initialScale={0}
      initialPositionX={100}
      initialPositionY={100}
    >
      <Tools
        setCurrentColor={squareColorize}
        initCanvas={initCanvas}
        userData={userData}
      />
      <TransformComponent>
        <div className="Board">
          <div className="Canvas">
            {[...Array(boardHeight * boardWidth)].map((e, i) => {
              return (
                <Square
                  boardId={boardId}
                  key={i}
                  id={i}
                  currentColor={currentColor}
                  placeCooldownCheck={placeCooldownCheck}
                />
              );
            })}
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default Board;
