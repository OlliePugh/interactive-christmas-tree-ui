import { ReactComponent as BulbImage } from "../../assetts/bulb.svg";
import { ReactComponent as BulbSocket } from "../../assetts/socket.svg";
import { Box } from "@mui/system";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { colours, fairyLightsColours } from "../../utils/palette";

const Bulb = ({ sx }) => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [currentColour, setCurrentColour] = useState("#ffffff");

  return (
    <OutsideClickHandler onOutsideClick={() => setPaletteOpen(false)}>
      {paletteOpen && (
        <Box
          position={"absolute"}
          zIndex={10}
          display={"flex"}
          flexDirection="row"
          sx={{
            ...sx,
            transform: `translate(-${
              (Object.keys(fairyLightsColours).length * 12) / 2
            }px, -20px)`,
          }}
          padding={"5px"}
          backgroundColor={colours.PRIMARY1}
          borderRadius={"10px"}
        >
          {Object.entries(fairyLightsColours).map(([key, value]) => (
            <Box
              key={key}
              height={"10px"}
              width={"10px"}
              borderRadius={"10px"}
              marginX={"1px"}
              onClick={() => setCurrentColour(value)}
              style={{ backgroundColor: value }}
            />
          ))}
        </Box>
      )}
      <Box
        onClick={() => {
          setPaletteOpen(true);
        }}
        sx={{ ...sx, opacity: 0.7, zIndex: 5 }}
        display={"flex"}
        flexDirection={"column"}
        position={"absolute"}
      >
        <BulbSocket height={20} style={{ transform: "translateY(1px)" }} />
        <BulbImage
          height={20}
          fill={currentColour}
          stroke="black"
          strokeWidth={20}
        />
      </Box>
    </OutsideClickHandler>
  );
};

export default Bulb;
