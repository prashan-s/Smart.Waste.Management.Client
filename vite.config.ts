import dotenv from 'dotenv';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5173,      // Optional: specify port (if not already set)
  },
  plugins: [react(), tsconfigPaths()],
  // define process env
  define: {
    "process.env": process.env,
  }
})
