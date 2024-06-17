import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true
  },
  plugins: [vue(), VitePWA(
    {
      
      mode: "development",
      registerType: "autoUpdate",
      base: "/",
      filename: "sw.js",
      includeAssets: ["/favicon.ico"],
      strategies: "injectManifest",
      srcDir: "src",
      manifest: {
        "short_name": "DeliFresas",
        "name": "DeliFresas San Antonio",
        "icons": [
          {
            "src": "/icon-72x72.png",
            "type": "image/png",
            "sizes": "72x81"
          },
          {
            "src": "/icon-96x96.png",
            "type": "image/png",
            "sizes": "96x109"
          },
          {
            "src": "/icon-144x144.png",
            "type": "image/png",
            "sizes": "144x163"
          },
          {
            "src": "/icon-192x192.png",
            "type": "image/png",
            "sizes": "192x218"
          },
          {
            "src": "/icon-512x512.png",
            "type": "image/png",
            "sizes": "512x581"
          }
        ],
        "start_url": "/",
        "background_color": "#ffffff",
        "display": "standalone",
        "scope": "/",
        "theme_color": "#3367D6",
        "description": "App de pedidos de fresas en San Antonio de Prado",
        "screenshots": [
          {
            "src": "/front.jpg",
            "type": "image/jpg",
            "sizes": "372x767"
          },
          {
            
            "src": "/details.jpg",
            "type": "image/jpg",
            "sizes": "373x809"
          },
          {
            "form_factor": "wide",
            "src": "/wide.jpg",
            "type": "image/jpg",
            "sizes": "906x939"
          },
        ]
      },
    }
  )],
})
