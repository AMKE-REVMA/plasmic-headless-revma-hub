import { PLASMIC } from "@/plasmic-init";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { notFound } from "next/navigation";
import { PlasmicClientProvider } from "@/app/components/PlasmicClientProvider";

// This tells Next.js 15 to await the dynamic URL parameters
export default async function PlasmicCatchAllPage(props: {
  params: Promise<{ catchall: string[] | undefined; locale: string }>;
}) {
  const params = await props.params;
  const { catchall } = params;

  // We intentionally ignore the 'locale' here. 
  // If the user visits /el/stories or /en/stories, we tell Plasmic to fetch the exact same "/stories" visual layout.
  // Your TranslationProvider higher up in layout.tsx will handle translating the text!
  const plasmicPath = catchall ? `/${catchall.join("/")}` : "/";

  // Fetch the visual layout from the Plasmic API
  const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);

  // If the client hasn't built this page in Plasmic yet, return a 404
  if (!plasmicData) {
    notFound();
  }

  const compMeta = plasmicData.entryCompMetas[0];

  return (
    <PlasmicClientProvider prefetchedData={plasmicData}>
      <PlasmicComponent component={compMeta.displayName} />
    </PlasmicClientProvider>
  );
}
