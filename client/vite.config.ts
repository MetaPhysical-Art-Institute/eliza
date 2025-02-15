import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, "..");
  const env = loadEnv(mode, envDir, "");
  return {
    plugins: [
      react(),
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024,
      }),
    ],
    clearScreen: false,
    envDir,
    define: {
      "import.meta.env.VITE_SERVER_PORT": JSON.stringify(
        env.SERVER_PORT || "3000"
      ),
    },
    build: {
      outDir: "dist",
      minify: true,
      cssMinify: true,
      sourcemap: false,
      cssCodeSplit: true,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      // Allow the specified ngrok host
      allowedHosts: ["trainium.ngrok.dev"],["trainium.app"]
      // Optionally, if you need to set a custom port, you can also add:
       //port: Number(env.SERVER_PORT) || 3002,
    },
  };
});
