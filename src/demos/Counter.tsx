import React from "react";
import { useBroadcastChannel } from "../BroadcastChannel";

export const Counter = () => {
  const [counter, setCounter] = useBroadcastChannel("counter", 0);

  return (
    <>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      {counter}
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </>
  );
};
