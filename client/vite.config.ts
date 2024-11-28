import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@': path.resolve(__dirname, './src/'),
      assets: path.resolve(__dirname, './src/assets/'),
      components: path.resolve(__dirname, './src/components/'),
      containers: path.resolve(__dirname, './src/containers/'),
      pages: path.resolve(__dirname, './src/pages/'),
      routes: path.resolve(__dirname, './src/routes/'),
      services: path.resolve(__dirname, './src/services/'),
      styles: path.resolve(__dirname, './src/styles/'),
      utils: path.resolve(__dirname, './src/utils/')
    }
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/_colors.scss" as *; @use "./src/styles/_screens.scss" as *; @use "./src/styles/_variables.scss" as *;'
      }
    }
  },
  server: {
    host: true,
    port: 3000
  },
  base: '/',
})