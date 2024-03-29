"use client";

import React, { CSSProperties, useEffect, useRef } from "react";

import useJanus from "@/hooks/useJanus";

interface VideoStreamProps {
  serverAddress: string;
  streamId: number;
  playing: boolean;
  style?: CSSProperties;
}

const VideoStream = ({
  serverAddress,
  streamId,
  playing,
  style,
}: VideoStreamProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { watch, stop, remoteStream } = useJanus({
    url: serverAddress,
    connectionOptions: {
      keepalive: true,
      iceServers: [
        {
          urls: "turn:stream.ollieq.co.uk:3478",
          username: "rwg",
          credential: "rwg-temp",
        },
      ],
    },
    streamId,
  });

  useEffect(() => {
    if (playing) {
      if (remoteStream == null) watch();
    } else {
      stop();
    }
  }, [playing]);

  useEffect(() => {
    // TODO use this to trigger pausing and starting the stream
    const visibilityChangeCallback = () => {
      if (!playing) return; // if not playing dont change anything

      if (document.hidden) {
        stop(); // if now hidden stop the stream
      } else {
        watch(); // if no longe hidden restart the stream
      }
    };
    document.addEventListener("visibilitychange", visibilityChangeCallback);
    return () =>
      document.removeEventListener(
        "visibilitychange",
        visibilityChangeCallback
      );
  }, [playing, stop, watch]);

  useEffect(() => {
    if (remoteStream != null && videoRef.current) {
      videoRef.current.srcObject = remoteStream;
      videoRef.current.play();

      videoRef.current.onloadedmetadata = () => {
        remoteStream
          .getAudioTracks()
          .forEach((track) => (track.enabled = false)); // mute everything
        videoRef.current?.play();
      };
    }
  }, [remoteStream]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        try {
          videoRef.current?.play();
        } catch {
          console.log("failed to start video feed on timer");
        }
      }
    }, 1000); // im not proud of this

    return () => {
      clearInterval(interval);
    };
  }, [playing]);

  return (
    <video
      preload="metadata"
      autoPlay
      muted
      playsInline
      style={style}
      ref={videoRef}
    />
  );
};

export default VideoStream;
