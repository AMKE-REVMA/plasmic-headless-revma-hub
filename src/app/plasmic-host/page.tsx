import * as React from 'react';
import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs';
import { PlasmicClientProvider } from '@/app/components/PlasmicClientProvider';

export default function PlasmicHost() {
  return (
    <PlasmicClientProvider>
      <PlasmicCanvasHost />
    </PlasmicClientProvider>
  );
}
