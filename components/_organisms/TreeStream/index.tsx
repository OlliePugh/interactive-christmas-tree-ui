import { treeDimensions } from "@/config/config";
import VideoStream from "../VideoStream";

const TreeStream = () => (
  <VideoStream
    style={{
      height: treeDimensions.width,
      width: treeDimensions.height,
      transformOrigin: "top left",
      transform: `translateY(${treeDimensions.height}px) rotate(-90deg)`,
      maxWidth: "initial",
    }}
    serverAddress="wss://stream.ollieq.co.uk/ws"
    streamId={1}
    playing={true}
  />
);

export default TreeStream;
