"use client";

import { PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

export function PlasmicClientProvider({ children, prefetchedData }: { children: React.ReactNode, prefetchedData?: any }) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={prefetchedData}>
      {children}
    </PlasmicRootProvider>
  );
}
