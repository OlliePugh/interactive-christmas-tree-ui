import { Box } from "@mui/system";
import WireCanvas from "../../_atoms/WireCanvas";
import Bulb from "../../_atoms/Bulb";
import lightConfig from "../../light_config.json";
import { lightAdjustment } from "../../config";
import { useMemo, useRef } from "react";
import { placementCooldown } from "../../config";
import Bauble from "../Bauble";

const Bulbs = ({
  visible,
  width,
  height,
  userData,
  setToastMessage,
  openBauble,
}) => {
  const lastPlacement = useRef(0);

  const placeCooldownCheck = () => {
    const now = new Date().getTime();
    if (now - lastPlacement.current > placementCooldown) {
      lastPlacement.current = now;
      return true;
    } else {
      setToastMessage({
        message: "Cooldown not finished...",
        severity: "error",
      });
      return false;
    }
  };

  const scaledBulbs = useMemo(() => {
    return lightConfig.map(({ x, y, id }) => ({
      id,
      x: x * lightAdjustment.x.scalar + lightAdjustment.x.offset,
      y: y * lightAdjustment.y.scalar + lightAdjustment.y.offset,
    }));
  }, []);
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
          userData={userData}
          key={item}
          id={id}
          sx={{
            left: x,
            top: y,
          }}
          placeCooldownCheck={placeCooldownCheck}
        />
      ))}
      <Bauble id={1} openBauble={openBauble} />
      <WireCanvas
        bulbConnections={scaledBulbs}
        bulbOffset={{ offsetX: 9, offsetY: 2 }}
      />
    </Box>
  );
};

export default Bulbs;
