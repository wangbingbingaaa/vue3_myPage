import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import * as echarts from 'echarts'
import "./assets/fonts/iconfont.css";
import "./assets/fonts/iconfont.js";

import 'element-plus/dist/index.css'
import ElementPlus from "element-plus";

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
    // Prism,
  });

const app = createApp(App);
//批量注入icon组件

app.use(store).use(router).use(ElementPlus).use(VueMarkdownEditor).mount('#app')
