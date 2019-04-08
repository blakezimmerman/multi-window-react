import React, { useState } from "react";
import { useBroadcastChannel } from "../BroadcastChannel";

export const ChangeChannel = () => {
  const [channelName, setChannelName] = useState("demo");
  const [input, setInput] = useBroadcastChannel(channelName, "");

  return (
    <>
      <div>
        Channel Name:
        <input
          value={channelName}
          onChange={e => setChannelName(e.currentTarget.value)}
        />
      </div>
      <div>
        <input value={input} onChange={e => setInput(e.currentTarget.value)} />
      </div>
    </>
  );
};
