import { Box } from "@mui/system";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Bulbs from "../Bulbs";
import { treeDimensions } from "../../config";

const MainBody = ({ sx }) => {
  return (
    <Box sx={{ ...sx }}>
      <TransformWrapper
        limitToBounds={false}
        minScale={0}
        maxScale={15}
        initialScale={1}
      >
        <TransformComponent>
          <Bulbs height={treeDimensions.height} width={treeDimensions.width} />
          <img
            height={treeDimensions.height}
            width={treeDimensions.width}
            style={{ position: "absolute", zIndex: -1 }}
            src={require("../../assetts/tree.jpg")}
          />
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export default MainBody;
