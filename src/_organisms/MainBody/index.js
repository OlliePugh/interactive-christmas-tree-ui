import { Box } from "@mui/system";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Bulbs from "../Bulbs";
import { treeDimensions } from "../../config";
import { useState } from "react";
import { Button } from "@mui/material";

const MainBody = ({ sx }) => {
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
      <TransformWrapper
        limitToBounds={false}
        minScale={0.2}
        maxScale={15}
        initialScale={1}
      >
        <TransformComponent>
          <img
            height={treeDimensions.height}
            width={treeDimensions.width}
            src={require("../../assetts/tree.jpg")}
          />
          <Bulbs
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
