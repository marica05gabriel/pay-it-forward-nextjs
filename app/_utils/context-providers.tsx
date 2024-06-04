'use client';

import {
  CLIENT_ID,
  PAPER_BOOK_BASE_CONTRACT_ADDRESS,
} from '@/components/thirdweb/thirdweb-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

  return { thirdWebClient, chain, wallet, contract } as ThirdWebContextProps;
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
        {children}
      </ThirdWebContext.Provider>
    </QueryClientProvider>
  );
};

export const useThirdWebContext = () => useContext(ThirdWebContext);
