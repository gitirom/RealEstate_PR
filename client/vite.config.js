import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {                          //when you call an api automatically they added the target to the current place
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
