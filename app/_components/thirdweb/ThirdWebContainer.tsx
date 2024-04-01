"use client";

import { ThirdWeb } from "@/components/thirdweb/ThirdWeb";
import { MyThirdWebContext, initializeContext } from "./thirdweb-utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ThirdWebContainer() {
  const queryClient = new QueryClient();
  const initializeState = initializeContext();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MyThirdWebContext.Provider value={initializeState}>
          <div className="text-black">ThirdWebContainer</div>
          <ThirdWeb />
        </MyThirdWebContext.Provider>
      </QueryClientProvider>
    </>
  );
}
