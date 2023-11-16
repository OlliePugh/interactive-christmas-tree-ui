import { randomUUID } from "crypto";
import {
  Client as JanusClient,
  Session,
  StreamingPlugin,
  WebRTCShim,
} from "janus-gateway-tsdx";
import { ConnectionOptions } from "janus-gateway-tsdx/dist/client/connection";
import { useCallback, useEffect, useMemo, useState } from "react";

interface useJanusProps {
  url: string;
  streamId: number;
  connectionOptions: ConnectionOptions;
}

const useJanus = ({ url, connectionOptions, streamId }: useJanusProps) => {
  const [streamingPlugin, setStreamingPlugin] =
    useState<StreamingPlugin | null>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const janus = useMemo<JanusClient>(() => {
    return new JanusClient(
      url,
      connectionOptions,
      navigator.mediaDevices,
      new WebRTCShim()
    );
  }, [url, connectionOptions]);

  useEffect(() => {
    return stop;
  }, []);

  const watch = useCallback(async () => {
    if (remoteStream?.active) {
      console.error("watch called - stream already active");
    }

    const clientId = global.crypto.randomUUID().toString();
    const connection = await janus.createConnection(clientId);
    const session = (await connection.createSession()) as Session;
    const streamingPlugin = (await session.attachPlugin(
      StreamingPlugin.NAME
    )) as StreamingPlugin;
    setStreamingPlugin(streamingPlugin);

    streamingPlugin.on("pc:track:remote", (trackEvent: RTCTrackEvent) => {
      if (remoteStream == null) {
        setRemoteStream(trackEvent.streams[0]);
      }
    });

    const { jsep } = await streamingPlugin.watch(streamId, null, null);
    await streamingPlugin.start(jsep);
  }, [janus, streamId, remoteStream]);

  const stop = useCallback(() => {
    remoteStream?.getTracks().forEach((track) => track.stop());
    streamingPlugin?.stop();
    setRemoteStream(null);
  }, [remoteStream, streamingPlugin]);

  return { watch, remoteStream, stop };
};

export default useJanus;
