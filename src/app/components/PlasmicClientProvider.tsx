"use client";

import { PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

import ResourceDashboard from "./ResourceDashboard";
import StoriesDashboard from "./StoriesDashboard";
import TeacherStatements from "./TeacherStatements";
import TimelinePreviewCard from "./TimelinePreviewCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PlasmicClientProvider({ children, prefetchedData }: { children: React.ReactNode, prefetchedData?: any }) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={prefetchedData}>
      {children}
    </PlasmicRootProvider>
  );
}

// Register components so the Studio can see them
PLASMIC.registerComponent(ResourceDashboard, {
  name: "ResourceDashboard",
  props: {},
});

PLASMIC.registerComponent(StoriesDashboard, {
  name: "StoriesDashboard",
  props: {},
});

PLASMIC.registerComponent(TeacherStatements, {
  name: "TeacherStatements",
  props: {},
});

PLASMIC.registerComponent(TimelinePreviewCard, {
  name: "TimelinePreviewCard",
  props: {},
});
