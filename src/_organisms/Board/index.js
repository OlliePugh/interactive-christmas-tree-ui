import { useRef, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import realtime from "../../config/fb_config";
import ColourPicker from "../../_atoms/ColourPicker";
import OutsideClickHandler from "react-outside-click-handler";
import { baubleColours } from "../../utils/palette";
import { writeData } from "../../utils/fb_funcs";
import { functions } from "../../config/fb_config";

const Board = ({ width, height, boardId, placeCooldownCheck }) => {
  const [currentClickPos, setCurrentClickPos] = useState();
  const canvasRef = useRef(null);

  const setColour = async (colour) => {
    if (!placeCooldownCheck()) {
      // cooldown not finished
      return;
    }
    // id=int currentIndex = offset + (3 * TFT_WIDTH * i) + (j * 3);
    const id = width * currentClickPos.row + currentClickPos.col;
    // setColor(colour);
    try {
      writeData(functions, {
        id,
        boardId,
        color: colour,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    canvas.width = width * 10;
    canvas.height = height * 10;
    canvas.style.width = `${width * 10}px`;
    canvas.style.height = `${height * 10}px`;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // create listeners
    for (let i = 0; i < height * width; i++) {
      const row = i % width;
      const col = Math.floor(i / width);
      const dbRef = ref(realtime, `board${boardId}/data/${i}`);
      onValue(dbRef, (snapshot) => {
        context.fillStyle = snapshot.val().color;
        context.fillRect(row * 10, col * 10, 10, 10);
      });
    }
  }, []);

  const canvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect(); // abs. size of element
    const scaleX = canvasRef.current.width / rect.width; // relationship bitmap vs. element for x
    const scaleY = canvasRef.current.height / rect.height; // relationship bitmap vs. element for y

    setCurrentClickPos({
      col: Math.floor(((event.clientX - rect.left) * scaleX - 1) / 10), // scale mouse coordinates after they have
      row: Math.floor(((event.clientY - rect.top) * scaleY - 1) / 10), // -1 to take into account the 1px border
    });
  };

  return (
    <>
      {currentClickPos && (
        <OutsideClickHandler onOutsideClick={() => setCurrentClickPos()}>
          <ColourPicker
            sx={{
              left: `${currentClickPos.col * 10}px`,
              top: `${currentClickPos.row * 10}px`,
            }}
            changeColour={setColour}
            offset={{
              xOffset: -(Object.keys(baubleColours).length * 12) / 2,
              yOffset: -20,
            }}
            colourPalette={baubleColours}
          />
        </OutsideClickHandler>
      )}
      <canvas
        onClick={(event) => canvasClick(event)}
        style={{ border: "1px solid black", imageRendering: "pixelated" }}
        ref={canvasRef}
      />
    </>
  );
};

export default Board;
