import {createRouter, createWebHistory, useRouter} from 'vue-router'
import NewsView from "@/views/NewsView.vue";
import AuthView from "@/views/AuthView.vue";
import {useAuthStore} from "@/stores/auth";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '',
            component: NewsView,
            meta: {
                requiresAuth: true
            }
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
        {
            path: '/test',
            name: 'test',
            component: AboutView,
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
    const router = useRouter();
    const {check, logout, isAuth} = useAuthStore()

    // if user not auth and page required auth
    if (!isAuth && to.meta["requiresAuth"]) {
        // redirect to page auth
        router.push({name: 'auth'}).then(next)
    // if user is auth and page required auth
    } else if(isAuth && to.meta["requiresAuth"]) {
        // check user token
        await check().then(next).catch(() => {
            // if check is false logout and redirect to auth page
            logout()
            router.push({name: 'auth'}).then(next)
        })
    } else {
        next()
    }

})

export default router
