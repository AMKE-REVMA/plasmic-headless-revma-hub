"use client";

import { PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PlasmicClientProvider({ children, prefetchedData }: { children: React.ReactNode, prefetchedData?: any }) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={prefetchedData}>
      {children}
    </PlasmicRootProvider>
  );
}
