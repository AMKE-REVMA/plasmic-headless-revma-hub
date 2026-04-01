import { initPlasmicLoader } from "@plasmicapp/loader-nextjs/react-server-conditional";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "hSmcsWKw3zCBXehRUPYvUE",
      token: "oWLoNaJ0pnBobRgL57pXlBkpLgW8AMeEDLxoDgWu63GK6CucLEZ6IYDhmNZlULxXWQF74UnOTgfBO7G9YWeQ",
    },
  ],
  preview: true, // Set to false in production
});


