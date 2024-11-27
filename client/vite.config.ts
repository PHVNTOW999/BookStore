import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const api = 'http://localhost:8000/api/v1/'

export default defineConfig({
    server: {
        proxy: {
            'foo': process.env.VUE_APP_BASE_API,
            '/api': {
                target: api,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    },
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
