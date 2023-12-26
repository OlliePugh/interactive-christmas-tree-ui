import { Box } from "@mui/system";
import WireCanvas from "../../_atoms/WireCanvas";
import Bulb from "../../_atoms/Bulb";
import lightConfig from "@/config/light_config.json";
import { lightAdjustment, projectClosed } from "@/config/config";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import realtime from "@/config/fb_config";
import { get, ref, onChildChanged } from "firebase/database";
import { placementCooldown, hiddenBulbs } from "@/config/config";
import Bauble from "../Bauble";
import { writeLights } from "@/utils/fb_funcs";
import { functions } from "@/config/fb_config";
import { User } from "firebase/auth";
import { UserContext } from "@/components/_atoms/UserProvider";

interface BulbsProps {
  visible: any;
  width: number;
  height: number;
  setToastMessage: CallableFunction;
  openBauble: (id: number) => void;
  lastPlacement: any;
  setLastPlacement: CallableFunction;
}

const Bulbs = ({
  visible,
  width,
  height,
  setToastMessage,
  openBauble,
  lastPlacement,
  setLastPlacement,
}: BulbsProps) => {
  const { user } = useContext(UserContext);
  const [bulbsColours, setBulbsColours] = useState<string[] | undefined>();
  const bulbsColoursRef = useRef<string[] | undefined>();
  bulbsColoursRef.current = bulbsColours;
  useEffect(() => {
    (async () => {
      const lightsRef = ref(realtime, `lights/data`);
      const result = await get(lightsRef);
      const lights = result.val();
      setBulbsColours(lights);
      if (projectClosed) return;
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
    if (projectClosed) {
      setToastMessage({
        message: "The project is now read-only!",
        severity: "error",
      });
      return;
    }

    if (!placeCooldownCheck()) {
      // cooldown not finished
      return;
    }
    writeLights(functions, { id, colour });
    setBulbColour(id, colour);
  };

  const placeCooldownCheck = () => {
    if (projectClosed) {
      return;
    }
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

  // const handleBoxClick = (event: any) => {
  //   // Get the coordinates relative to the Box element
  //   const x = event.nativeEvent.offsetX;
  //   const y = event.nativeEvent.offsetY;

  //   // Use these coordinates as needed
  //   console.log("Clicked at coordinates:", { x, y });
  // };

  return (
    <Box
      height={height}
      width={width}
      border={"black 1px solid"}
      position="absolute"
      visibility={visible ? "visible" : "hidden"}
      // onClick={handleBoxClick} // Add this line to handle click events on the Box
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
                user
                  ? broadcastBulbColour
                  : () => {
                      setToastMessage({
                        message: projectClosed
                          ? "The project is now read-only!"
                          : "You need to be logged in to change the lights!",
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
        sx={{ top: "945px", left: "410px", opacity: "80%" }}
      />
      <Bauble
        id={2}
        openBauble={openBauble}
        sx={{ top: "560px", left: "260px", opacity: "80%" }}
      />
      <Bauble
        id={3}
        openBauble={openBauble}
        sx={{ top: "260px", left: "220px", opacity: "80%" }}
      />
      <WireCanvas
        bulbConnections={scaledBulbs}
        bulbOffset={{ offsetX: 9, offsetY: 2 }}
      />
    </Box>
  );
};

export default Bulbs;
