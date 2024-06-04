'use client';

import { useThirdWebContext } from '@/utils/context-providers';
import { usePersonalWalletAddress, useSigner } from '@thirdweb-dev/react';
import { ConnectButton } from 'thirdweb/react';

export const ThirdWebConnectButton = () => {
  const thirdWebContext = useThirdWebContext();
  const signer = useSigner();

  if (thirdWebContext == null) {
    return <>No Third Web Context</>;
  }

  const handleSign = async () => {
    if (signer) {
      const signedMessage = await signer.signMessage('test');
      console.log('Signed message');
      console.log(signedMessage);
    }
  };

  //   const account = thirdWebContext.wallet.getAccount();
  //   if (account) {
  //     console.log('Accunt found');
  //     console.log('Trying to sign message');
  //     const response = await account.signMessage({ message: 'test' });
  //     console.log('Message signature:');
  //     console.log(response);
  //   } else {
  //     console.error('Account not found');
  //   }
  // };

  return (
    <>
      <ConnectButton client={thirdWebContext.thirdWebClient} />
      <div>
        <button onClick={handleSign}>Sign</button>
      </div>
    </>
  );
};
