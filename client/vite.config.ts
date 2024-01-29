import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process?.env, ...loadEnv(mode, process?.cwd?.(), '') }

  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      port: 4173,
      strictPort: true,
      watch: {
        usePolling: true
      },
      proxy: {
        '/api/user': {
          target: process?.env?.BACK_END_USER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/user/, ''),
        },
        '/api/settings': {
          target: process?.env?.BACK_END_SETTINGS,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/settings/, ''),
        },
        '/api/customers': {
          target: process?.env?.BACK_END_CUSTOMERS,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/customers/, ''),
        },
      }
    }
  })
}
