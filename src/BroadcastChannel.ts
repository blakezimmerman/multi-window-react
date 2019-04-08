import { useEffect, useState } from "react";

interface IMessageEvent<T> extends MessageEvent {
  data: { type: string; payload: T };
}

export const useBroadcastChannel = <T>(
  channelName: string,
  defaultValue: T
): [T, (value: T) => void] => {
  // Initialize state
  const [value, setValue] = useState<T>(defaultValue);
  const [channel, setChannel] = useState(new BroadcastChannel(channelName));

  // Channel setup
  useEffect(() => {
    let curChannel = channel;

    // A different channel was requested at runtime
    if (curChannel.name !== channelName) {
      curChannel = new BroadcastChannel(channelName);
      setChannel(curChannel);
    }

    // Request current state from peers
    curChannel.postMessage({ type: "NEW_CONNECTION" });

    // Cleanup function for unmount
    return () => curChannel.close();
  }, [channelName]);

  // Handle new messages
  useEffect(() => {
    channel.onmessage = (e: IMessageEvent<T>) => {
      switch (e.data.type) {
        case "NEW_CONNECTION":
          channel.postMessage({ type: "UPDATE", payload: value });
          break;
        case "UPDATE":
          setValue(e.data.payload);
          break;
      }
    };
  }, [channel, value]);

  const postMessage = (payload: T) => {
    // Update local state
    setValue(payload);

    // Send new state to peers
    channel.postMessage({ type: "UPDATE", payload });
  };

  return [value, postMessage];
};
