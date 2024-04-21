'use client';

import { useContext, useEffect, useState } from 'react';
import {
  MyThirdWebContext,
  PAPER_BOOK_BASE_CONTRACT_ADDRESS,
} from './thirdweb-utils';
import { Account, createWallet } from 'thirdweb/wallets';
import { ConnectButton, TransactionButton } from 'thirdweb/react';
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
  toWei,
} from 'thirdweb';

const wallets = [
  // embeddedWallet(),
  createWallet('io.metamask'),
  // createWallet("com.coinbase.wallet"),
  // createWallet("me.rainbow"),
];

export const ThirdWeb = () => {
  const props = useContext(MyThirdWebContext);
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [receiptMessage, setReceiptMessage] = useState('NO RECEIPT YET');
  const [contract, setContract] = useState<any>(undefined);
  // const
  if (!props) {
    return (
      <div className='bg-red-400'>Something's wrong with the context...</div>
    );
  }

  // Init account
  useEffect(() => {
    const initAccount = async () => {
      const account = await props.wallet.getAccount();
      if (account) {
        setAccount(account);
      }
    };

    if (account == undefined) {
      initAccount().catch((error) => console.error(error));
    }
  }, [account]);

  // Init contract
  useEffect(() => {
    if (contract == undefined) {
      const initContract = getContract({
        // the client you have created via `createThirdwebClient()`
        client: props.client,
        // the chain the contract is deployed on
        chain: props.chain,
        // the contract's address
        address: PAPER_BOOK_BASE_CONTRACT_ADDRESS,
      });
      //   console.log(`Contract set to: ${contract}`);
      setContract(initContract);
    }
  }, [contract]);

  const handleTransaction = async () => {
    if (account == undefined) {
      console.error('Account is undefined!');
      return;
    }
    const tx = prepareContractCall({
      contract,
      method: 'function mint(uint48 isbn13, string memory cid) public',
      params: [1111111111111, '11111111111111111111111111111111'],
    });

    const receipt = await sendAndConfirmTransaction({
      transaction: tx,
      account: account,
    });
    console.log(`RECEIPT: ${receipt.blockNumber.toString()}`);
    setReceiptMessage(receipt.blockNumber.toString());
  };

  //   const connectWalletProps: ConnectWalletProps = {cl}
  return (
    <div className='text-black'>
      <div>ThirdWeb</div>
      <div>{props.client.clientId}</div>
      <ConnectButton client={props.client} />
      <div>Receipt {receiptMessage}</div>
      <button onClick={handleTransaction}>Handle transaction</button>
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: props.contract,
            method: 'function mint(uint48 isbn13, string memory cid) public',
            params: [
              9781643585345,
              'http://books.google.com/books/content?id=gE0wzAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            ],
          })
        }
        onTransactionConfirmed={(result) => {
          console.log('TRANSACTION RESULT');
          console.log(`Transaction status: ${result.status}`);
          console.log(`Transaction hash: ${result.transactionHash}`);
          console.log(`Transaction block number: ${result.blockNumber}`);
        }}
        onError={(error) => {
          console.error(error);
        }}
      >
        Transaction Button
      </TransactionButton>
    </div>
  );
};
