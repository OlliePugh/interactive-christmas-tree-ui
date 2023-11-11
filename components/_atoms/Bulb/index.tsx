import { Box } from "@mui/system";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import ColourPicker from "../ColourPicker";
import { fairyLightsColours } from "@/config/palette";
import { SxProps } from "@mui/system";
import BulbSvg from "../BulbSvg";

interface BulbProps {
  sx: SxProps;
  id: number;
  colour: string;
  setColourCallback: (id: number, colour: string) => void;
}

const Bulb = ({ sx, id, colour, setColourCallback }: BulbProps) => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setPaletteOpen(false)}>
      {paletteOpen && (
        <ColourPicker
          sx={sx}
          changeColour={(colour: string) => {
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
          // console.log(id);
          setPaletteOpen(true);
        }}
        sx={{ ...sx, opacity: 0.7, zIndex: 5 }}
        display={"flex"}
        flexDirection={"column"}
        position={"absolute"}
      >
        {/* <BulbSvg
          height={20}
          style={{ transform: "translateY(1px)" }}
          src="/bulb.svg"
          stroke="black"
          fill={true}
          strokeWidth={20}
          alt="bulb"
        /> */}
        <BulbSvg height={20} fill={colour} stroke="black" strokeWidth={20} />
      </Box>
    </OutsideClickHandler>
  );
};

export default Bulb;
