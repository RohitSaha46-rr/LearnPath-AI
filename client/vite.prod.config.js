import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      federation({
        name: "LearnPath_Mfe",
        remotes: {
          Payment_MFE: `${env.VITE_PAYMENT_MFE_URL}/assets/remoteEntry.js`
        },
        exposes: {
          "./Navbar": "./src/components/Navbar/Navbar.jsx"
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
          "react-router-dom": { singleton: true },
          "react-redux": { singleton: true },
          "@reduxjs/toolkit": { singleton: true }
        }
      })
    ],
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false
    }
  }
})
