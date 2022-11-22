import { ReactComponent as BulbImage } from "../../assetts/bulb.svg";
import { ReactComponent as BulbSocket } from "../../assetts/socket.svg";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { functions } from "../../config/fb_config";
import { writeLights } from "../../utils/fb_funcs";
import realtime from "../../config/fb_config";
import { onValue, ref } from "firebase/database";
import ColourPicker from "../ColourPicker";
import { fairyLightsColours } from "../../utils/palette";

const Bulb = ({ sx, id, userData, placeCooldownCheck }) => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [currentColour, setCurrentColour] = useState("#ffffff");

  useEffect(() => {
    if (userData) {
      // only attempt if the user is logged in
      const dbRef = ref(realtime, `lights/data/${id}`);
      onValue(dbRef, (snapshot) => {
        setCurrentColour(snapshot.val());
      });
    }
  }, [userData, id]);

  const changeColour = (value) => {
    if (!placeCooldownCheck()) {
      // cooldown not finished
      return;
    }
    writeLights(functions, { id, color: value });
    setCurrentColour(value);
    setPaletteOpen(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setPaletteOpen(false)}>
      {paletteOpen && (
        <ColourPicker
          sx={sx}
          changeColour={changeColour}
          offset={{
            xOffset: -(Object.keys(fairyLightsColours).length * 12) / 2,
            yOffset: -20,
          }}
          colourPalette={fairyLightsColours}
        />
      )}
      <Box
        onClick={() => {
          setPaletteOpen(true);
        }}
        sx={{ ...sx, opacity: 0.7, zIndex: 5 }}
        display={"flex"}
        flexDirection={"column"}
        position={"absolute"}
      >
        <BulbSocket height={20} style={{ transform: "translateY(1px)" }} />
        <BulbImage
          height={20}
          fill={currentColour}
          stroke="black"
          strokeWidth={20}
        />
      </Box>
    </OutsideClickHandler>
  );
};

export default Bulb;
