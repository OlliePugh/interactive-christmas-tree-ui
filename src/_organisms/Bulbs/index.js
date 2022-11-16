import { Box } from "@mui/system";
import WireCanvas from "../../_atoms/WireCanvas";
import Bulb from "../../_atoms/Bulb";
import lightConfig from "../../light_config.json";
import { lightAdjustment } from "../../config";
import { useMemo } from "react";

const Bulbs = ({ visible, width, height }) => {
  const scaledBulbs = useMemo(() => {
    return lightConfig.map(({ x, y, id }) => ({
      id,
      x: x * lightAdjustment.x.scalar + lightAdjustment.x.offset,
      y: y * lightAdjustment.y.scalar + lightAdjustment.y.offset,
    }));
  }, [lightConfig]);
  return (
    <Box
      height={height}
      width={width}
      border={"black 1px solid"}
      position="absolute"
      visibility={visible ? "visible" : "hidden"}
    >
      {Object.entries(scaledBulbs).map(([item, { x, y, id }]) => (
        <Bulb
          key={item}
          sx={{
            left: x,
            top: y,
          }}
        />
      ))}
      <WireCanvas
        bulbConnections={scaledBulbs}
        bulbOffset={{ offsetX: 9, offsetY: 2 }}
      />
    </Box>
  );
};

export default Bulbs;
