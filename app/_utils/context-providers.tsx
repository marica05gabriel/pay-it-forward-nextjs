'use client';

import {
  CLIENT_ID,
  PAPER_BOOK_BASE_CONTRACT_ADDRESS,
} from '@/components/thirdweb/thirdweb-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { createContext, useContext } from 'react';
import {
  ContractOptions,
  ThirdwebClient,
  createThirdwebClient,
  defineChain,
  getContract,
} from 'thirdweb';
import { sepolia } from 'thirdweb/chains';
import { Wallet, createWallet } from 'thirdweb/wallets';

interface ThirdWebContextProps {
  thirdWebClient: ThirdwebClient;
  chain: any;
  wallet: Wallet;
  contract: Readonly<ContractOptions<[]>>;
}
export const ThirdWebContext = createContext<ThirdWebContextProps | null>(null);

export const initializeThirdWebContext = () => {
  if (CLIENT_ID == undefined) {
    // throw Error('Third web CLIENT_ID is undefined. Check the credentials!');
  }
  const chain = defineChain(sepolia);
  const wallet = createWallet('io.metamask');
  const thirdWebClient = createThirdwebClient({
    clientId: CLIENT_ID!,
    // clientId: 'CLIENT_ID',
  });
  const contract = getContract({
    client: thirdWebClient,
    address: PAPER_BOOK_BASE_CONTRACT_ADDRESS,
    chain: chain,
  });

  return { thirdWebClient, chain, wallet, contract };
};

interface Props {
  children: any;
}
export const ThirdWebContextProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();
  const initialState = initializeThirdWebContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdWebContext.Provider value={initialState}>
        <ThirdwebProvider activeChain={initialState.chain.id}>
          {children}
        </ThirdwebProvider>
      </ThirdWebContext.Provider>
    </QueryClientProvider>
  );
};
// 0xa24c6a474b3239f1876deacf32b69983051c6c4ce3ea6d96cbe206d9822041aa56eb7542a9c0d64bf9db709c9f5a2f450bc937d2517ba5cb5db2a9151c5e9a101b
export const useThirdWebContext = () => useContext(ThirdWebContext);
