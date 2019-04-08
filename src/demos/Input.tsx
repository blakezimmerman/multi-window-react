import React from "react";
import { useBroadcastChannel } from "../BroadcastChannel";

export const Input = () => {
  const [input, setInput] = useBroadcastChannel("input", "");

  return (
    <input value={input} onChange={e => setInput(e.currentTarget.value)} />
  );
};
