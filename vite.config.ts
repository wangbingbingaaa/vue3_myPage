import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command }) => {
    let base= './';
    if (command === 'build'){
        base = './vue3_myPage/'
    } else {
        base = './'
    }
   
    return {
        plugins: [vue()],
        publicDir: 'public', // 静态资源服务的文件夹

    }
 
})
