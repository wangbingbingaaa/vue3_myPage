import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../page/Home.vue';
import scalBigVue from '../page/scalBig.vue';

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Home,
        // children: [
        //     {
        //         path: "/homepage",
        //         name: "homepage",
        //         component: () => import("../views/homepage/index.vue"),
        //         meta: {
        //             title: "首页",
        //         },
        //     },
        //     {
        //         path: "/more",
        //         name: "more",
        //         component: () => import("../views/more/index.vue"),
        //         meta: {
        //             title: "更多",
        //         },
        //     },
        // ],
    },
    {
        path: "/test",
        component: scalBigVue,
    }
];

const router = createRouter({
    history: createWebHistory(),  // history 模式
    routes,
});

export default router;
