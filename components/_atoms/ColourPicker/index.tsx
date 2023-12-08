import { Box, SxProps } from "@mui/material";
import { colours } from "@/config/palette";

interface ColourPickerProps {
  changeColour: (colour: string) => void;
  sx?: SxProps;
  offset: {
    xOffset?: number;
    yOffset?: number;
  };
  colourPalette: { [key: string]: string };
}

const ColourPicker = ({
  changeColour,
  sx,
  offset: { xOffset = 0, yOffset = 0 } = {},
  colourPalette,
}: ColourPickerProps) => (
  <Box
    className="colourPicker"
    position={"absolute"}
    zIndex={11}
    display={"flex"}
    flexDirection="row"
    sx={{
      ...sx,
      transform: `translate(${xOffset}px, ${yOffset}px)`,
      backgroundColor: colours.PRIMARY1,
    }}
    padding={"5px"}
    borderRadius={"10px"}
  >
    {Object.entries(colourPalette).map(([key, value]) => (
      <Box
        key={key}
        height={"10px"}
        width={"10px"}
        borderRadius={"10px"}
        marginX={"1px"}
        onClick={() => {
          changeColour(value);
        }}
        style={{ backgroundColor: value, cursor: "pointer" }}
      />
    ))}
  </Box>
);

export default ColourPicker;
