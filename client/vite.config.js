import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "LearnPath_Mfe",
      remotes: {
        Payment_MFE: "http://localhost:5003/assets/remoteEntry.js"
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
  },
  preview: {
  port: 5173
}
  

})
