import { Box } from "@mui/system";
import WireCanvas from "../../_atoms/WireCanvas";
import Bulb from "../../_atoms/Bulb";

const Bulbs = ({ visible, width, height }) => {
  return (
    <Box
      height={height}
      width={width}
      border={"black 1px solid"}
      position="absolute"
      visibility={visible ? "visible" : "hidden"}
    >
      <Bulb sx={{ left: "0px", top: "500px" }} />
      <Bulb sx={{ left: "300px", top: "500px" }} />
      <Bulb sx={{ left: "600px", top: "300px" }} />
      <Bulb sx={{ left: "200px", top: "300px" }} />
      <WireCanvas
        bulbConnections={[
          [0, 500],
          [300, 500],
          [600, 300],
          [200, 300],
        ]}
        bulbOffset={{ offsetX: 9, offsetY: 2 }}
      />
    </Box>
  );
};

export default Bulbs;
