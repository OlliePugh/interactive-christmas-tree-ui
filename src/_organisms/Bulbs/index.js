import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import WireCanvas from "../../_atoms/WireCanvas";
const Bulbs = ({ width, height }) => {
  return (
    <Box
      height={height}
      width={width}
      sx={{ opacity: 0.7 }}
      border={"black 1px solid"}
    >
      <Typography position={"absolute"} top="500px" left="0px">
        Hey
      </Typography>
      <Typography position={"absolute"} top="500px" left="300px">
        Hey
      </Typography>
      <Typography position={"absolute"} top="300px" left="600px">
        Hey
      </Typography>
      <Typography position={"absolute"} top="300px" left="200px">
        Hey
      </Typography>
      <WireCanvas
        bulbConnections={[
          [0, 500],
          [300, 500],
          [600, 300],
          [200, 300],
        ]}
        bulbOffset={{ offsetX: 10, offsetY: 5 }}
      />
    </Box>
  );
};

export default Bulbs;
