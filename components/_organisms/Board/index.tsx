import {
  useRef,
  useEffect,
  useState,
  useCallback,
  MouseEvent,
  useContext,
} from "react";
import { ref, onChildChanged } from "firebase/database";
import realtime, { functions } from "@/config/fb_config";
import ColourPicker from "@/components/_atoms/ColourPicker";
import OutsideClickHandler from "react-outside-click-handler";
import { baubleColours } from "@/config/palette";
import {
  getBaubleBmpUrl,
  getBaubleRecentChanges,
  writeBulk,
  writeData,
} from "@/utils/fb_funcs";
import axios from "axios";
import { User } from "firebase/auth";
import { AlertColor } from "@mui/material";
import { UserContext } from "@/components/_atoms/UserProvider";

const zeroPad = (num: string, places: number) =>
  String(num).padStart(places, "0");

const rgbToHex = (r: number, g: number, b: number) => {
  if (r > 255 || g > 255 || b > 255) throw Error("Invalid color component");
  return "#" + zeroPad(((r << 16) | (g << 8) | b).toString(16), 6);
};

interface BoardProps {
  width: number;
  height: number;
  boardId: number;
  placeCooldownCheck: () => boolean;
  adminMode: boolean;
  setToastMessage: ({
    message,
    severity,
  }: {
    message: string;
    severity: AlertColor;
  }) => void;
}

interface ClickPosition {
  col: number;
  row: number;
}

const Board = ({
  width,
  height,
  boardId,
  placeCooldownCheck,
  setToastMessage,
  adminMode,
}: BoardProps) => {
  const { user } = useContext(UserContext);
  const [currentClickPos, setCurrentClickPos] =
    useState<ClickPosition | null>();
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentOpenPixel = useRef<ClickPosition | null>();
  const [adminModeSelection, setAdminModeSelection] = useState<ClickPosition[]>(
    []
  );

  const setCurrentOpenPixel = useCallback(({ col, row }: ClickPosition) => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d", { willReadFrequently: true })!;
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
  useEffect(() => {
    if (currentClickPos) {
      // TODO used for seeing where a click is (for banning purposes)
      // console.log(width * currentClickPos.row + currentClickPos.col);
      // console.log(boardId);
      if (adminMode) {
        setAdminModeSelection((adminModeSelection) => {
          if (adminModeSelection.length != 2) {
            return [...adminModeSelection, currentClickPos];
          } else {
            return [];
          }
        });
      }
      setCurrentOpenPixel(currentClickPos);
    }
  }, [currentClickPos, setCurrentOpenPixel, adminMode]);

  const setColour = async (colour: string) => {
    if (!placeCooldownCheck()) {
      // cooldown not finished
      return;
    }

    const id = width * currentClickPos!.row + currentClickPos!.col;
    currentOpenPixel.current = null;
    setPixelColour(currentClickPos!.row, currentClickPos!.col, colour);
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

  const setBulkColour = useCallback(
    async (colour: string) => {
      console.log(adminModeSelection);
      if (adminModeSelection.length !== 2) return;
      const ids = [];

      const [click1, click2] = adminModeSelection;

      const topLeft = {
        row: Math.min(click1.row, click2.row),
        col: Math.min(click1.col, click2.col),
      };

      const bottomRight = {
        row: Math.max(click1.row, click2.row),
        col: Math.max(click1.col, click2.col),
      };

      // Iterate through the grid and add IDs that fall within the selection to the 'ids' array
      for (let row = topLeft.row; row <= bottomRight.row; row++) {
        for (let col = topLeft.col; col <= bottomRight.col; col++) {
          const id = row * width + col; // Assuming 160 columns
          if (id >= 0 && id < width * height) {
            ids.push(id);
          }
        }
      }

      console.log(ids);

      if (confirm("Are you sure") === true) {
        try {
          writeBulk(functions, {
            ids,
            boardId,
            colour,
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    [adminModeSelection, boardId, height, width]
  );

  const setPixelColour = (row: number, col: number, colour: string) => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    context.fillStyle = colour;
    context.fillRect(col * 10, row * 10, 10, 10);
  };

  const drawOutline = (col: number, row: number) => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
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
    (entireBoard: Uint8Array) => {
      let counter = 0;
      const offset = 54;
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          let currentIndex = offset + counter * 3;

          const colour = rgbToHex(
            entireBoard[currentIndex + 2],
            entireBoard[currentIndex + 1],
            entireBoard[currentIndex]
          );

          const col = counter % width;
          const row = Math.floor(counter / width);
          setPixelColour(row, col, colour);
          counter += 1;
        }
      }
    },
    [width, height]
  );

  useEffect(() => {
    // if this component is to start loading and its not already loaded
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
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
      const url = await getBaubleBmpUrl(boardId);
      const result = await axios.get(url, { responseType: "arraybuffer" });

      fillEntireBoard(new Uint8Array(result.data));
      const recentChanges = await getBaubleRecentChanges(boardId); // get changes since the BMP was created
      recentChanges.forEach((doc) => {
        const data = doc.data();
        const col = data.squareId % width;
        const row = Math.floor(data.squareId / width);
        setPixelColour(row, col, data.colour);
      });
      const dbRef = ref(realtime, `board${boardId}/data`);
      onChildChanged(dbRef, (snapshot) => {
        const lightId = Number(snapshot.key);
        const col = lightId % width;
        const row = Math.floor(lightId / width);
        setPixelColour(row, col, snapshot.val().colour);
      });
      setLoaded(true);
    })();
  }, [boardId, fillEntireBoard, height, width]);

  const canvasClick = (event: MouseEvent) => {
    if (canvasRef.current == null) {
      console.error("canvas ref is undefined");
      return;
    }
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
        <OutsideClickHandler onOutsideClick={() => setCurrentClickPos(null)}>
          <ColourPicker
            sx={{
              left: `${currentClickPos.col * 10}px`,
              top: `${currentClickPos.row * 10}px`,
              visibility:
                adminMode && adminModeSelection.length != 2
                  ? "hidden"
                  : "visible",
            }}
            changeColour={adminMode ? setBulkColour : setColour}
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
          user
            ? (event) => canvasClick(event)
            : () =>
                setToastMessage({
                  message: "You need to be logged in draw pixel art!",
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
