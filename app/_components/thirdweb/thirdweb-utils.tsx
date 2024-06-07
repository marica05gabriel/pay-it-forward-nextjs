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

/**
 * On Ethereum and other networks compatible with the Ethereum Virtual Machine (EVM),
 * public addresses all share the same format:
 * they begin with 0x, and are followed by 40 alphanumeric characters (numerals and letters),
 * adding up to 42 characters in total.
 * @param receipt
 * @see <a>https://support.metamask.io/getting-started/the-ethereum-address-format-and-why-it-matters-when-using-metamask/#:~:text=On%20Ethereum%20and%20other%20networks,to%2042%20characters%20in%20total.</a>
 * @returns
 */
export const extractDataFromReceipt = (receipt: TransactionReceipt) => {
  const logsData = receipt.logs[0].data.substring(2);

  const data: MintReceiptData = {
    txHash: receipt.transactionHash,
    data: logsData,
    bookPublicId: logsData.substring(0, 64),
    valueMinted: logsData.substring(64),
    operator: get42Address(receipt.logs[0].topics[1]),
    from: get42Address(receipt.logs[0].topics[2]),
    to: get42Address(receipt.logs[0].topics[3]),
  };
  return data;
};

const get42Address = (address: string) => {
  if (address.length === 64) {
    return `0x${address.substring(24)}`;
  }
  if (address.length === 66) {
    return `0x${address.substring(26)}`;
  }
  console.warn('Unusual address:', address);
  return address;
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
