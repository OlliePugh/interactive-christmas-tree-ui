/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { WriteData, resetBoard } from "../../utils/fb_funcs";
import realtime, { functions } from "../../config/fb_config";
import { colors } from "../../utils/palette";
import Square from "./Square";
import Tools from "../Tools/Tools";
import {
  TransformWrapper,
  TransformComponent,
} from "@tiendeo/react-zoom-pan-pinch";

function Board({ userData, boardId }) {
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [colorMap, setColorMap] = useState([]);
  const [loading, setLoading] = useState(true);

  async function initCanvas() {
    if (userData.uid === "gtfpqsy1DLhy4AEndnsppYFFeH22") {
      console.log(
        await resetBoard(functions, { boardId: 1, width: 80, height: 80 })
      );
    } else {
      alert("You are not authorized to reset");
    }
  }

  function CanvasListener() {
    // TODO make it listen per tile so that no need to stream entire board to the client
    const dbRef = ref(realtime, `board${boardId}`);
    onValue(dbRef, (snapshot) => {
      console.log(Object.values(snapshot.val()));
      const data = Object.values(snapshot.val());
      setColorMap(data);
      setLoading(false);
    });
  }

  async function updateSquare(id, color) {
    console.log(
      await WriteData(functions, {
        id,
        boardId,
        color,
        lastModifierEmail: userData.email,
        lastModifierUID: userData.uid,
      })
    );
  }

  function SquareColorize(color) {
    let r = document.querySelector(":root");
    r.style.setProperty("--squareBgColor", color);
    setCurrentColor(color);
  }

  useEffect(() => {
    CanvasListener();
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
        setCurrentColor={SquareColorize}
        initCanvas={initCanvas}
        userData={userData}
      />
      <TransformComponent>
        <div className="Board">
          <div className="Canvas">
            {colorMap.map((val, key) => {
              return (
                <Square
                  upadateSquare={() => updateSquare(val.id, currentColor)}
                  key={key}
                  id={val.id}
                  color={val.color}
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
