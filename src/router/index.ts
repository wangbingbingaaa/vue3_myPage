import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../page/Home.vue';
import scalBigVue from '../page/scalBig.vue';
import threeShowObjMtll from '../three/threeShowObjMtll.vue'
import threeShowGlb from '../three/threeShowGlb.vue'
import CardMain from '../three/CardMain.vue'
import threeMain from '../three/threeMain.vue'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Home,
       
    },
    {
        path: "/test",
        component: scalBigVue,
    },
    {
        path: "/obj",
        component: threeShowObjMtll,
    },
    {
        path: "/glb",
        component: threeShowGlb,
    },
    {
        path: "/3D",
        component: threeMain,
    },
    {
        path: "/card",
        component: CardMain,
    }
];

const router = createRouter({
    history: createWebHashHistory(),  // history 模式
    routes,
});

export default router;
