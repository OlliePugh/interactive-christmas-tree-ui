import { useEffect, useRef, useCallback } from "react";
import { treeDimensions, videoStreamUrl } from "@/config/config";
// import Hls from "hls.js";

const TreeStream = () => (
  <div
    style={{
      height: treeDimensions.width,
      width: treeDimensions.height,
      transformOrigin: "top left",
      transform: `translateY(${treeDimensions.height}px) rotate(-90deg)`,
    }}
  ></div>
);

// const TreeStream = () => {
//   const hlsRef = useRef(null);

//   const startStream = useCallback(() => {
//     if (!hlsRef.current) {
//       // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
//       const video = document.getElementById("video");

//       if (Hls.isSupported()) {
//         const hls = new Hls({
//           maxLiveSyncPlaybackRate: 1.5,
//         });
//         hlsRef.current = hls;

//         hls.on(Hls.Events.ERROR, (evt, data) => {
//           console.error(data);
//           if (data.fatal) {
//             hls.destroy();
//             setTimeout(startStream, 2000);
//           }
//         });

//         hls.loadSource(videoStreamUrl + "index.m3u8");
//         hls.attachMedia(video);
//       } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//         // since it's not possible to detect timeout errors in iOS,
//         // wait for the playlist to be available before starting the stream
//         fetch(videoStreamUrl + "stream.m3u8").then(() => {
//           video.src = videoStreamUrl + "index.m3u8";
//           video.play();
//         });
//       }
//     }
//   }, []);

//   useEffect(() => {
//     startStream();

//     return () => {
//       hlsRef.current?.destroy();
//     };
//   }, [startStream]);

//   return (
//     <video
//       id="video"
//       muted={true}
//       playsInline
//       autoPlay
//       style={{
//         height: treeDimensions.width,
//         width: treeDimensions.height,
//         transformOrigin: "top left",
//         transform: `translateY(${treeDimensions.height}px) rotate(-90deg)`,
//       }}
//     ></video>
//   );
// };

export default TreeStream;
