import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { manifest } from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [vue(), crx({ manifest }),]
})
