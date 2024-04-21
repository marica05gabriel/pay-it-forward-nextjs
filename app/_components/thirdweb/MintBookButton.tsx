import { TransactionReceipt } from 'thirdweb/transaction';
import { ThirdWebTransactionButton } from './ThirdWebTransactionButton';
import { PAPER_BOOK_BASE_CONTRACT_ADDRESS } from './thirdweb-utils';

interface Props {
  isbn: string;
  cid: string;
}
export const MintBookButton = ({ isbn, cid }: Props) => {
  const address = PAPER_BOOK_BASE_CONTRACT_ADDRESS;
  const method = 'function mint(uint48 isbn13, string memory cid) public';
  const params = [isbn, cid];

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
      address={address}
      method={method}
      params={params}
      handleTransactionConfirmed={handleTransactionConfirmed}
      handleTransactionError={handleTransactionError}
    />
  );
};
