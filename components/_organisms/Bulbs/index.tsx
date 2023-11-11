import { Box } from "@mui/system";
import WireCanvas from "../../_atoms/WireCanvas";
import Bulb from "../../_atoms/Bulb";
import lightConfig from "@/config/light_config.json";
import { lightAdjustment } from "@/config/config";
import { useEffect, useMemo, useRef, useState } from "react";
import realtime from "@/config/fb_config";
import { get, ref, onChildChanged } from "firebase/database";
import { placementCooldown, hiddenBulbs } from "@/config/config";
import Bauble from "../Bauble";
import { writeLights } from "@/utils/fb_funcs";
import { functions } from "@/config/fb_config";
import { User } from "firebase/auth";

interface BulbsProps {
  visible: any;
  width: number;
  height: number;
  userData: User;
  setToastMessage: CallableFunction;
  openBauble: (id: number) => void;
  lastPlacement: any;
  setLastPlacement: CallableFunction;
}

const Bulbs = ({
  visible,
  width,
  height,
  userData,
  setToastMessage,
  openBauble,
  lastPlacement,
  setLastPlacement,
}: BulbsProps) => {
  const [bulbsColours, setBulbsColours] = useState<string[] | undefined>();
  const bulbsColoursRef = useRef<string[] | undefined>();
  bulbsColoursRef.current = bulbsColours;
  useEffect(() => {
    (async () => {
      const lightsRef = ref(realtime, `lights/data`);
      const result = await get(lightsRef);
      const lights = result.val();
      setBulbsColours(lights);
      const dbRef = ref(realtime, `lights/data`);
      onChildChanged(dbRef, (snapshot) => {
        const lightId = Number(snapshot.key);
        setBulbColour(lightId, snapshot.val());
      });
    })();
  }, []);

  const setBulbColour = (id: number, colour: string) => {
    if (bulbsColoursRef.current) {
      const bulbsCopy = [...bulbsColoursRef.current];
      bulbsCopy[id] = colour;
      setBulbsColours(bulbsCopy);
    }
  };

  const broadcastBulbColour = (id: number, colour: string) => {
    if (!placeCooldownCheck()) {
      // cooldown not finished
      return;
    }
    writeLights(functions, { id, colour });
    setBulbColour(id, colour);
  };

  const placeCooldownCheck = () => {
    const now = Date.now();
    if (now - lastPlacement > placementCooldown) {
      setLastPlacement(now);
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
    return lightConfig
      .map(
        ({ x, y, id }) =>
          !hiddenBulbs.includes(id) && {
            id,
            x: x * lightAdjustment.x.scalar + lightAdjustment.x.offset,
            y: y * lightAdjustment.y.scalar + lightAdjustment.y.offset,
          }
      )
      .filter((lightPos) => lightPos) as {
      id: number;
      x: number;
      y: number;
    }[];
  }, []);
  return (
    <Box
      height={height}
      width={width}
      border={"black 1px solid"}
      position="absolute"
      visibility={visible ? "visible" : "hidden"}
    >
      {Object.entries(scaledBulbs).map(
        ([_, { x, y, id }]) =>
          bulbsColours?.[id] != null && (
            <Bulb
              colour={bulbsColours[id]}
              key={id}
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
                        message:
                          "You need to be logged in to change the lights!",
                        severity: "error",
                      });
                    }
              }
            />
          )
      )}
      <Bauble
        id={1}
        openBauble={openBauble}
        sx={{ top: "590px", left: "400px", opacity: "60%" }}
      />
      <Bauble
        id={2}
        openBauble={openBauble}
        sx={{ top: "950px", left: "160px", opacity: "60%" }}
      />
      <Bauble
        id={3}
        openBauble={openBauble}
        sx={{ top: "230px", left: "280px", opacity: "60%" }}
      />
      <WireCanvas
        bulbConnections={scaledBulbs}
        bulbOffset={{ offsetX: 9, offsetY: 2 }}
      />
    </Box>
  );
};

export default Bulbs;
