import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // En desarrollo (npm run dev) usa "/" → funciona en localhost:5173
  // En producción (npm run build / npm run deploy) cambia el string
  // por el nombre exacto de tu repo en GitHub: "/nombre-de-tu-repo/"
  base: command === "build" ? "/mentorhub/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
