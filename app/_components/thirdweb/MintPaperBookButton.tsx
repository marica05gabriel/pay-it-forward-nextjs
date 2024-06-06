import { TransactionReceipt } from 'thirdweb/transaction';
import { ThirdWebTransactionButton } from './ThirdWebTransactionButton';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PAPER_BOOK;

interface Props {
  isbn: string;
  cid: string;
}
export const MintBookButton = ({ isbn }: Props) => {
  if (!contractAddress) {
    throw Error('Missing contract address: PAPER_BOOK!');
  }
  const method = 'mint(string memory isbn13)';
  const params = [isbn];

  const handleTransactionConfirmed = (result: TransactionReceipt) => {
    console.log('TRANSACTION RESULT');
    console.log(`Transaction status: ${result.status}`);
    console.log(`Transaction hash: ${result.transactionHash}`);
    console.log(`Transaction block number: ${result.blockNumber}`);
  };

  const handleTransactionError = (error: Error) => {
    console.error(error);
  };

  return (
    <ThirdWebTransactionButton
      label='Mint Book'
      address={contractAddress}
      method={method}
      params={params}
      handleTransactionConfirmed={handleTransactionConfirmed}
      handleTransactionError={handleTransactionError}
    />
  );
};
