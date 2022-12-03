import { useRef, useEffect, useState, useCallback } from "react";
import { ref, get, onChildChanged } from "firebase/database";
import realtime from "../../config/fb_config";
import ColourPicker from "../../_atoms/ColourPicker";
import OutsideClickHandler from "react-outside-click-handler";
import { baubleColours } from "../../utils/palette";
import { writeData } from "../../utils/fb_funcs";
import { functions } from "../../config/fb_config";

const rgbToHex = (r, g, b) => {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return "#" + ((r << 16) | (g << 8) | b).toString(16);
};

const Board = ({
  width,
  height,
  boardId,
  placeCooldownCheck,
  setToastMessage,
  userData,
}) => {
  const [currentClickPos, setCurrentClickPos] = useState();
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef();
  const currentOpenPixel = useRef();

  useEffect(() => {
    if (currentClickPos) {
      setCurrentOpenPixel(currentClickPos);
    }
  }, [currentClickPos]);

  const setCurrentOpenPixel = useCallback(({ col, row }) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // revert old pixel if it exists
    if (currentOpenPixel.current) {
      const oldPixel = context.getImageData(
        currentOpenPixel.current.col * 10 + 5,
        currentOpenPixel.current.row * 10 + 5,
        1,
        1
      );

      const oldColour = rgbToHex(
        oldPixel.data[0],
        oldPixel.data[1],
        oldPixel.data[2]
      );

      setPixelColour(
        currentOpenPixel.current.row,
        currentOpenPixel.current.col,
        oldColour
      );
    }

    drawOutline(col, row);

    currentOpenPixel.current = { col, row };
  }, []);

  const setColour = async (colour) => {
    if (!placeCooldownCheck()) {
      // cooldown not finished
      return;
    }

    const id = width * currentClickPos.row + currentClickPos.col;
    currentOpenPixel.current = null;
    setPixelColour(currentClickPos.row, currentClickPos.col, colour);
    try {
      writeData(functions, {
        id,
        boardId,
        colour,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const setPixelColour = (row, col, colour) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = colour;
    context.fillRect(col * 10, row * 10, 10, 10);
  };

  const drawOutline = (col, row) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    const scaledCol = col * 10;
    const scaledRow = row * 10;
    context.lineWidth = 1;
    context.moveTo(scaledCol + 0.5, scaledRow + 0.5);
    context.lineTo(scaledCol + 9.5, scaledRow + 0.5);
    context.lineTo(scaledCol + 9.5, scaledRow + 9.5);
    context.lineTo(scaledCol + 0.5, scaledRow + 9.5);
    context.lineTo(scaledCol + 0.5, scaledRow + 0.5);
    context.stroke();
  };

  const fillEntireBoard = useCallback(
    (entireBoard) => {
      Object.entries(entireBoard).forEach(([index, pixel]) => {
        const col = index % width;
        const row = Math.floor(index / width);
        setPixelColour(row, col, pixel.colour);
      });
    },
    [width]
  );

  useEffect(() => {
    // if this component is to start loading and its not already loaded
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
    // get entire board
    (async () => {
      const fullBoard = ref(realtime, `board${boardId}/data`);
      const result = await get(fullBoard);
      fillEntireBoard(result.val());
      const dbRef = ref(realtime, `board${boardId}/data`);
      onChildChanged(dbRef, (snapshot) => {
        const lightId = snapshot.key;
        const col = lightId % width;
        const row = Math.floor(lightId / width);
        setPixelColour(row, col, snapshot.val().colour);
      });
      setLoaded(true);
    })();
  }, [boardId, fillEntireBoard, height, width]);

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
      {!loaded && (
        <div className="Loading">
          <div className="Loading_Text">Getting Bauble Contents...</div>
        </div>
      )}
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
        onClick={
          userData
            ? (event) => canvasClick(event)
            : () =>
                setToastMessage({
                  message: "You need to be logged in to do that!",
                  severity: "error",
                })
        }
        style={{
          border: "1px solid black",
          imageRendering: "pixelated",
          display: loaded ? "block" : "none",
        }}
        ref={canvasRef}
      />
    </>
  );
};

export default Board;
