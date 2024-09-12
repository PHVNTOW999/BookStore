import {createRouter, createWebHistory} from 'vue-router'
import NewsView from "@/views/NewsView.vue";
import AuthView from "@/views/AuthView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '',
            component: NewsView
        },
        {
            path: '/news',
            name: 'news',
            component: NewsView
        },
        {
            path: '/auth',
            name: 'auth',
            component: AuthView
        },
        // {
        //     path: '/account',
        //     name: 'myAccount',
        //     component: NewsView
        // }

        // > 	Bestsellers
        // > 	Search (str)
        // >
        // > 	Genre (uuid)
        // > 	Author (uuid)
        // >
        // > 	Basket
    ]
})

export default router
