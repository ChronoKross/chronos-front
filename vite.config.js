// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Set the base path to support hash-based routing
  esbuild: {
    jsxFactory: "React.createElement", // Configure the jsx pragma
    jsxInject: "import React from 'react'", // Import React for JSX
  },
});
