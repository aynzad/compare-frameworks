/** @type {import('tailwindcss').Config} */
import sharedConfig from "@repo/tailwind-config";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig],
};
