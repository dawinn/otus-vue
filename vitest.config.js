import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [ vue({
        template: {
            compilerOptions: {
                isCustomElement: (tag) => [
                    'v-col',
                    'v-text-field',
                    'v-row',
                    'v-img',
                    'v-spacer',
                    'v-radio',
                    'v-radio-group',
                    'v-container',
                    'router-link',
                    'bold'
                ].includes(tag),
            }
        }
    }) ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        server: {
            deps: {
                inline: ['vuetify']
            },
        }
    },
    root: './src'
})
