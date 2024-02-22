"use client";

import { useDisconnect } from "wagmi";

export default function DisconnectButton() {
  const { disconnect } = useDisconnect();

  return (
    <>
      <button
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect
      </button>
    </>
  );
}
