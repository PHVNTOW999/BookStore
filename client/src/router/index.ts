import {createRouter, createWebHistory} from 'vue-router'
import NewsView from "@/views/NewsView.vue";
import AuthView from "@/views/AuthView.vue";
import {useAuthStore} from "@/stores/auth";
import TestView from "@/views/TestView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: NewsView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/news',
            name: 'news',
            component: NewsView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/auth',
            name: 'auth',
            component: AuthView
        },
        {
            path: '/test',
            name: 'test',
            component: TestView,
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

router.beforeEach(async (to, from, next) => {
    const {current, logout, user} = useAuthStore()

    await current()

    // if user not auth and page required auth
    if (!user && to.meta["requiresAuth"]) {
        // redirect to page auth
        next('/auth')
    // if user is auth and page required auth
    } else if(user && to.meta["requiresAuth"]) {
        // check user token
        await current().then(next()).catch(() => {
            // if check is false logout and redirect to auth page
            logout()
            next('/auth')
        })
        // if user is auth page auth not access
    } else if (user && to.name === 'auth') {
        next('/')
    } else {
        next()
    }

})

export default router
