import { useThirdWebContext } from '@/app/_utils/context-providers';
import { getContract } from 'thirdweb';

export const CLIENT_ID =
  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID_HARDHAT_LOCAL;
// const SECRET_KEY = process.env.THIRDWEB_SECRET_HARDHAT_LOCAL ?? ("" as string);

export const PAPER_BOOK_BASE_CONTRACT_ADDRESS =
  //   "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  '0x090A87EbcD7Aa24B3B568C671947A305fd0B95BC'; // SEPOLIA 2

export const getThirdWebContract = (address: string) => {
  const thirdWebContext = useThirdWebContext();

  if (thirdWebContext == null) {
    throw Error('Third Web Context is null');
  }

  return getContract({
    client: thirdWebContext.thirdWebClient,
    address: address,
    chain: thirdWebContext.chain,
  });
};
