import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/my-e-portfolio/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        skills: resolve(__dirname, 'skills.html'),
        prelim: resolve(__dirname, 'prelim.html'),
        midterm: resolve(__dirname, 'midterm.html'),
        finals: resolve(__dirname, 'finals.html'),
      },
    },
  },
})
