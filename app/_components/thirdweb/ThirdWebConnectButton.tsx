'use client';

import { useThirdWebContext } from '@/utils/context-providers';
import { ConnectButton } from 'thirdweb/react';

export const ThirdWebConnectButton = () => {
  const thirdWebContext = useThirdWebContext();
  if (thirdWebContext == null) {
    return <>No Third Web Context</>;
  }
  return <ConnectButton client={thirdWebContext.thirdWebClient} />;
};
