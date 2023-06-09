import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../page/Home.vue';
import scalBigVue from '../page/scalBig.vue';
import threeShowObjMtll from '../three/threeShowObjMtll.vue'
import threeShowGlb from '../three/threeShowGlb.vue'
import CardMain from '../three/CardMain.vue'
import threeMain from '../three/threeMain.vue'
import girlVue from '../three/girl.vue';
import xiangsuVue from '../three/xiangsu.vue';
import systemShow from '../page/systemShow/systemShow.vue'
import commentPage from '../page/systemShow/commentPage.vue'
import NotFound from '../page/notFound.vue'

const routes: RouteRecordRaw[] = [
    {
        path: "/sys",
        component: systemShow,
        children: [
            {
                path: "comment",
                name: "comment",
                component: commentPage,
               
           
            },]
       
    },
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
         children: [
            {
                path: "thxw",
                name: "homepage",
                component: threeShowObjMtll,
               
            },
            {
                path: "",
                name: "girl",
                component: girlVue,
               
            },
            {
                path: "xsr",
                name: "xsr",
                component: xiangsuVue,
               
            },
                  {
                path: "threeShowGlb",
                name: "threeShowGlb",
                component: () => import("../three/threeShowGlb.vue"),
               
            },
        ],
           
    },
    {
        path: "/ui",
        component: CardMain,
    },
{
    path: "/404",
    component: NotFound,
},
    { path: '/:catchAll(.*)', redirect: '/404' }
];

const router = createRouter({
    history: createWebHashHistory(),  // history 模式
    routes,
});

export default router;
