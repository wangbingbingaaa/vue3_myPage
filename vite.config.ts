import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({command }) => {
    // let base= './';
    // if (command === 'build'){
    //     base = './vue3_myPage/'
    // } else {
    //     base = './'
    // }
   
    return {
        base: './',
        plugins: [vue()],
        publicDir: 'public', // 静态资源服务的文件夹,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "/src"),
                "@public": path.resolve(__dirname, "/public"),
              },
          }
      

    }
 
})
