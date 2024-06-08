import type { Config } from "tailwindcss";
import sharedConfig from "@abpreact/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/app/**/*.tsx",
    "../../packages/ui/**/*.tsx",
  ],
  presets: [sharedConfig],
};

export default config;
