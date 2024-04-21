import { prepareContractCall } from 'thirdweb';
import { TransactionButton } from 'thirdweb/react';
import { TransactionReceipt } from 'thirdweb/transaction';
import { getThirdWebContract } from './thirdweb-utils';

interface ThirdWebConnectButtonProps {
  label: string;
  address: string;
  method: any;
  params: Array<any>;
  handleTransactionConfirmed: (result: TransactionReceipt) => void;
  handleTransactionError: (error: Error) => void;
}
export const ThirdWebTransactionButton = ({
  label,
  address,
  method,
  params,
  handleTransactionConfirmed,
  handleTransactionError,
}: ThirdWebConnectButtonProps) => {
  const contract = getThirdWebContract(address);
  const options = {
    contract: contract,
    method: method,
    params: params,
  };

  return (
    <TransactionButton
      transaction={() => prepareContractCall(options)}
      onTransactionConfirmed={handleTransactionConfirmed}
      onError={handleTransactionError}
    >
      {label}
    </TransactionButton>
  );
};
