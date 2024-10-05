import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@mui/utils/getReactNodeRef'], // Exclude this module from the bundle
    },
  },
  plugins: [react()],
}

)
