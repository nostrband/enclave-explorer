import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss(), svgr()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
   build: {
      rollupOptions: {
         output: {
            manualChunks(id) {
               console.log(id)
               if (id.includes('@peculiar')) {
                  return '@peculiar'
               }
               if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router')) {
                  return '@react-router'
               }
            },
         },
      },
   },
})
