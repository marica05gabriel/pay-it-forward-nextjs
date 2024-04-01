import { createContext } from "react";
import {
  ThirdwebClient,
  createThirdwebClient,
  defineChain,
} from "thirdweb";

const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID_HARDHAT_LOCAL;
// const SECRET_KEY = process.env.THIRDWEB_SECRET_HARDHAT_LOCAL ?? ("" as string);
const CHAIN = defineChain(1337);

const PAPER_BOOK_BASE_CONTRACT_ADDRESS =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface MyThirdWebContextProps {
  client: ThirdwebClient;
  chain: any;
}
export const MyThirdWebContext = createContext<MyThirdWebContextProps | null>(
  null
);

export const initializeContext = () => {
  if (CLIENT_ID == undefined) {
    throw Error("THIRD WEB CLIENT ID UNDEFINED!");
  }
  const client = createThirdwebClient({
    // clientId: "9b865543a9a55efe07db65198a653053",
    clientId: CLIENT_ID,
  });
  const chain = defineChain(1337);
  return { client, chain };
};
