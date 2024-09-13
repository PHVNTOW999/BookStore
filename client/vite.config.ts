import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    server: {
        proxy: {
            // origin: 'http://127.0.0.1:8080',
            // 'foo': process.env.VUE_APP_BASE_API,
            '/api': {
                target: 'http://127.0.0.1:8000/api/v1/',
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
