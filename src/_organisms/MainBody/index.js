import { Box } from "@mui/system";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Bulbs from "../Bulbs";
import { treeDimensions } from "../../config";
import { useState } from "react";
import { Button } from "@mui/material";
import { functions } from "../../config/fb_config";
import { resetLights } from "../../utils/fb_funcs";

const MainBody = ({ sx, userData }) => {
  const [virtualBulbsVisible, setVirtualBulbsVisible] = useState(true);
  return (
    <Box sx={{ ...sx }}>
      <Button
        onClick={() => {
          setVirtualBulbsVisible(!virtualBulbsVisible);
        }}
      >
        Hide Stream
      </Button>
      <Button
        onClick={() => {
          resetLights(functions, { length: 50 });
        }}
      >
        Reset Lights
      </Button>
      <TransformWrapper
        limitToBounds={false}
        minScale={0.2}
        maxScale={15}
        initialScale={1}
      >
        <TransformComponent>
          <img
            alt="Christmas Tree"
            height={treeDimensions.height}
            width={treeDimensions.width}
            src={require("../../assetts/tree.jpg")}
          />
          <Bulbs
            userData={userData}
            visible={virtualBulbsVisible}
            height={treeDimensions.height}
            width={treeDimensions.width}
          />
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export default MainBody;
