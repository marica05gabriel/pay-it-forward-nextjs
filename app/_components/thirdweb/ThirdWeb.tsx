"use client";

import { useContext } from "react";
import { MyThirdWebContext } from "./thirdweb-utils";
import { ConnectWallet } from "@/components/thirdweb";
import { createWallet } from "thirdweb/wallets";
import { ConnectButton } from "thirdweb/react";

const wallets = [
  // embeddedWallet(),
  createWallet("io.metamask"),
  // createWallet("com.coinbase.wallet"),
  // createWallet("me.rainbow"),
];

export const ThirdWeb = () => {
  const props = useContext(MyThirdWebContext);
  if (!props) {
    return (
      <div className="bg-red-400">Something's wrong with the context...</div>
    );
  }

  //   const connectWalletProps: ConnectWalletProps = {cl}
  return (
    <div className="text-black">
      <div>ThirdWeb</div>
      <div>{props.client.clientId}</div>
      <ConnectButton client={props.client} />
    </div>
  );
};
