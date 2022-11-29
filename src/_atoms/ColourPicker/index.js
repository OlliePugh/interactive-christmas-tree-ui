import { Box } from "@mui/system";
import { colours } from "../../utils/palette";

const ColourPicker = ({
  changeColour,
  sx,
  offset: { xOffset = 0, yOffset = 0 } = {},
  colourPalette,
}) => {
  return (
    <Box
      position={"absolute"}
      zIndex={10}
      display={"flex"}
      flexDirection="row"
      sx={{
        ...sx,
        transform: `translate(${xOffset}px, ${yOffset}px)`,
      }}
      padding={"5px"}
      backgroundColor={colours.PRIMARY1}
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
          style={{ backgroundColor: value }}
        />
      ))}
    </Box>
  );
};

export default ColourPicker;
