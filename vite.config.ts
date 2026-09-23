import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:            resolve(__dirname, 'index.html'),
        especialidad:    resolve(__dirname, 'especialidad.html'),
        avisoPrivacidad: resolve(__dirname, 'aviso-privacidad.html'),
      },
    },
  },
})
