import { Box } from "@mui/system";
import WireCanvas from "../../_atoms/WireCanvas";
import Bulb from "../../_atoms/Bulb";
import lightConfig from "../../light_config.json";
import { lightAdjustment } from "../../config";
import { useEffect, useMemo, useRef, useState } from "react";
import realtime from "../../config/fb_config";
import { get, ref, onChildChanged } from "firebase/database";
import { placementCooldown } from "../../config";
import Bauble from "../Bauble";
import { writeLights } from "../../utils/fb_funcs";
import { functions } from "../../config/fb_config";

const Bulbs = ({
  visible,
  width,
  height,
  userData,
  setToastMessage,
  openBauble,
}) => {
  const [bulbsColours, setBulbsColours] = useState();
  const lastPlacement = useRef(0);
  const bulbsColoursRef = useRef();
  bulbsColoursRef.current = bulbsColours;

  useEffect(() => {
    (async () => {
      const lightsRef = ref(realtime, `lights/data`);
      const result = await get(lightsRef);
      const lights = result.val();
      setBulbsColours(lights);
      createIndividualListeners();
    })();
  }, []);

  const setBulbColour = (id, colour) => {
    if (bulbsColoursRef.current) {
      const bulbsCopy = [...bulbsColoursRef.current];
      bulbsCopy[id] = colour;
      setBulbsColours(bulbsCopy);
    }
  };

  const broadcastBulbColour = (id, colour) => {
    if (!placeCooldownCheck()) {
      // cooldown not finished
      return;
    }
    writeLights(functions, { id, colour });
    setBulbColour(id, colour);
  };

  const createIndividualListeners = () => {
    const dbRef = ref(realtime, `lights/data`);
    onChildChanged(dbRef, (snapshot) => {
      const lightId = Number(snapshot.key);
      setBulbColour(lightId, snapshot.val());
    });
  };

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
          colour={bulbsColours?.[id]}
          key={item}
          id={id}
          sx={{
            left: x,
            top: y,
          }}
          setColourCallback={
            userData
              ? broadcastBulbColour
              : () => {
                  setToastMessage({
                    message: "You need to be logged in to do that!",
                    severity: "error",
                  });
                }
          }
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
