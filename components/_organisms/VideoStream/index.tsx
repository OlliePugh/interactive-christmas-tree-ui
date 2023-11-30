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
    connectionOptions: { keepalive: true },
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
    console.log("use effect");
    console.log("remote stream", remoteStream);
    console.log("videoRef", videoRef.current);
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
