import { useThirdWebContext } from '@/app/_utils/context-providers';
import { getContract } from 'thirdweb';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

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

export type MintReceiptData = {
  txHash: string;
  operator: string;
  from: string;
  to: string;
  bookPublicId: string;
  valueMinted: string;
  data: string;
};
export const extractDataFromReceipt = (receipt: TransactionReceipt) => {
  const logsData = receipt.logs[0].data.substring(2);
  const data: MintReceiptData = {
    txHash: receipt.transactionHash,
    data: logsData,
    bookPublicId: logsData.substring(0, 64),
    valueMinted: logsData.substring(65),
    operator: receipt.logs[0].topics[1],
    from: receipt.logs[0].topics[2],
    to: receipt.logs[0].topics[3],
  };
  return data;
};

export enum ErrorEnum {
  MINT_ERROR,
  ENROLL,
}
export type Error = {
  [key: string]: string;
};

export const ERRORS = {
  [ErrorEnum.MINT_ERROR]: 'Error occured during minting process!',
  [ErrorEnum.ENROLL]: 'Error occured while trying to enrol a book!',
};
