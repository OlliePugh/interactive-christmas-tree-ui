import { Box } from "@mui/system";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import ColourPicker from "../ColourPicker";
import { fairyLightsColours } from "@/config/palette";
import { SxProps } from "@mui/system";
import BulbSvg from "../BulbSvg";
import SocketSvg from "../SocketSvg";
import { useJoyride } from "../JoyrideProvider";

interface BulbProps {
  sx: SxProps;
  id: number;
  colour: string;
  setColourCallback: (id: number, colour: string) => void;
}

const Bulb = ({ sx, id, colour, setColourCallback }: BulbProps) => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { update, isInJoyride } = useJoyride();

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (!isInJoyride) {
          setPaletteOpen(false);
        }
      }}
    >
      {paletteOpen && (
        <ColourPicker
          sx={sx}
          changeColour={(colour: string) => {
            setColourCallback(id, colour);
            update({ lightColourChosen: true });
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
        className={`joyride-bulb-${id}`}
        onClick={() => {
          setPaletteOpen(true);
          update({ lightPressed: true });
        }}
        sx={{
          ...sx,
          opacity: 0.7,
          zIndex: 5,
          cursor: "pointer",
          transition: "all .2s ease-in-out",
          "&:hover": {
            transform: "scale(105%)",
            opacity: 1,
          },
        }}
        display={"flex"}
        flexDirection={"column"}
        position={"absolute"}
      >
        <SocketSvg
          height={20}
          style={{ transform: "translateY(1px)", fill: "black" }}
        />
        <BulbSvg height={20} fill={colour} stroke="black" strokeWidth={20} />
      </Box>
    </OutsideClickHandler>
  );
};

export default Bulb;
