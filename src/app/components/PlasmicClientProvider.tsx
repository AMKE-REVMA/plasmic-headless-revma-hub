"use client";
import { PlasmicRootProvider } from "@plasmicapp/loader-nextjs";

export function PlasmicClientProvider({ children, prefetchedData }: { children: React.ReactNode, prefetchedData?: any }) {
  return <PlasmicRootProvider prefetchedData={prefetchedData}>{children}</PlasmicRootProvider>;
}
