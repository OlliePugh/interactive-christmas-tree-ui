import { ReactComponent as BulbImage } from "../../assetts/bulb.svg";
import { ReactComponent as BulbSocket } from "../../assetts/socket.svg";
import { Box } from "@mui/system";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import ColourPicker from "../ColourPicker";
import { fairyLightsColours } from "../../utils/palette";

const Bulb = ({ sx, id, colour, setColourCallback }) => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setPaletteOpen(false)}>
      {paletteOpen && (
        <ColourPicker
          sx={sx}
          changeColour={(colour) => {
            setColourCallback(id, colour);
            setPaletteOpen(false);
          }}
          offset={{
            xOffset: -(Object.keys(fairyLightsColours).length * 12) / 2,
            yOffset: -20,
          }}
          colourPalette={fairyLightsColours}
        />
      )}
      <Box
        onClick={() => {
          console.log(id);
          setPaletteOpen(true);
        }}
        sx={{ ...sx, opacity: 0.7, zIndex: 5 }}
        display={"flex"}
        flexDirection={"column"}
        position={"absolute"}
      >
        <BulbSocket height={20} style={{ transform: "translateY(1px)" }} />
        <BulbImage height={20} fill={colour} stroke="black" strokeWidth={20} />
      </Box>
    </OutsideClickHandler>
  );
};

export default Bulb;
