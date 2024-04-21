import { createContext } from "react";
import { ContractOptions, ThirdwebClient, createThirdwebClient, defineChain, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { Wallet, createWallet } from "thirdweb/wallets";

const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID_HARDHAT_LOCAL;
// const SECRET_KEY = process.env.THIRDWEB_SECRET_HARDHAT_LOCAL ?? ("" as string);
const CHAIN = defineChain(sepolia);

export const PAPER_BOOK_BASE_CONTRACT_ADDRESS =
//   "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  "0x090A87EbcD7Aa24B3B568C671947A305fd0B95BC"; // SEPOLIA 2

interface MyThirdWebContextProps {
  client: ThirdwebClient;
  chain: any;
  wallet: Wallet;
  contract: Readonly<ContractOptions<[]>>;
}
export const MyThirdWebContext = createContext<MyThirdWebContextProps | null>(
  null
);

export const initializeContext = () => {
  if (CLIENT_ID == undefined) {
    throw Error("THIRD WEB CLIENT ID UNDEFINED!");
  }
  const client = createThirdwebClient({
    clientId: CLIENT_ID,
  });
  const chain = defineChain(1337);
  const wallet = createWallet("io.metamask");
  const contract = getContract({
    client,
    address: PAPER_BOOK_BASE_CONTRACT_ADDRESS,
    chain: CHAIN,
  });

  return { client, chain, wallet, contract };
};
