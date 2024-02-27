import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/*"),
      "@export": path.resolve(__dirname, "./src/06__export"),
      "@styles": "/src/styles/index.scss",
      "@types": "/src/types/",
      "@components": "/src/02_Components",
    },
  },
});
