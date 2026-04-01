import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import ResourceDashboard from "./app/components/ResourceDashboard";
import StoriesDashboard from "./app/components/StoriesDashboard";
import TeacherStatements from "./app/components/TeacherStatements";
import TimelinePreviewCard from "./app/components/TimelinePreviewCard";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "hSmcsWKw3zCBXehRUPYvUE",
      token: "oWLoNaJ0pnBobRgL57pXlBkpLgW8AMeEDLxoDgWu63GK6CucLEZ6IYDhmNZlULxXWQF74UnOTgfBO7G9YWeQ",
    },
  ],
  preview: true, // Set to false in production
});

// Register your complex components so the Studio can see them
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
