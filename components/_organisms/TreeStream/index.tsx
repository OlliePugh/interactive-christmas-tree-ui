import { treeDimensions } from "@/config/config";
import VideoStream from "../VideoStream";

const TreeStream = () => (
  <VideoStream
    style={{
      height: treeDimensions.width,
      width: treeDimensions.height,
      transformOrigin: "top left",
      transform: `translateY(${treeDimensions.height}px) rotate(-90deg)`,
    }}
    serverAddress="wss://janus.conf.meetecho.com/ws"
    streamId={1}
    playing={true}
  />
);

export default TreeStream;
