/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { writeData, resetBoard } from "../../utils/fb_funcs";
import realtime, { functions } from "../../config/fb_config";
import { colors } from "../../utils/palette";
import Square from "./Square";
import Tools from "../Tools/Tools";
import {
  TransformWrapper,
  TransformComponent,
} from "@tiendeo/react-zoom-pan-pinch";

function Board({ userData, boardId }) {
  // could use an array of refs here to have access to each squares value
  const [{ boardWidth, boardHeight }, setBoardDimensions] = useState({
    boardWidth: null,
    boardHeight: null,
  });
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [loading, setLoading] = useState(true);

  const initCanvas = async () => {
    await resetBoard(functions, { boardId: 1, width: 80, height: 80 });
  };

  const canvasListener = () => {
    // TODO make it listen per tile so that no need to stream entire board to the client
    const metaDataRef = ref(realtime, `board${boardId}/metadata`);
    onValue(metaDataRef, (snapshot) => {
      const { height, width } = snapshot.val();
      setBoardDimensions({ boardHeight: height, boardWidth: width });
      setLoading(false);
    });
  };

  const updateSquare = async (id, color) => {
    console.log(
      await writeData(functions, {
        id,
        boardId,
        color,
        lastModifierEmail: userData.email,
        lastModifierUID: userData.uid,
      })
    );
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
