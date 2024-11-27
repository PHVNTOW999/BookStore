import {createRouter, createWebHistory} from 'vue-router'
import NewsView from "@/views/NewsView.vue";
import {useAuthStore} from "@/stores/auth";
import TestView from "@/views/TestView.vue";
import OauthView from "@/views/Auth/SocialAuthView.vue";
import SignInView from "@/views/Auth/SignInView.vue";
import SignUpView from "@/views/Auth/SignUpView.vue";
import {useCookies} from "vue3-cookies";
import Notification from "@/helpers/notification";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
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
            redirect: '/auth/signin',
            children: [
                // login page
                {
                    path: '/auth/signin',
                    name: 'signin',
                    component: SignInView,
                },
                // register page
                {
                    path: '/auth/signup',
                    name: 'signup',
                    component: SignUpView
                },
                // sign in with social media
                {
                    path: '/auth/social',
                    name: 'social',
                    component: OauthView
                },
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: TestView,
            meta: {
                requiresAuth: true
            }
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
    const {tokenVerify} = useAuthStore()
    const {cookies} = useCookies()

    const token = JSON.parse(localStorage.getItem('token'))
    const sessionid = cookies.get('sessionid')

    const auth = !!(token && sessionid)

    // if user not auth and page require auth then redirect to authentication page
    if (!auth && to.meta["requiresAuth"]) {
        Notification('This page only for authorized users!', 'error')
        next(from.path)
        // if user is auth and page require authentication then verify token
    } else if (auth && to.meta["requiresAuth"]) {
        await tokenVerify(token.access).then(next())
        // if user is auth and this authentication page then transfer user to previous page
    } else if (auth && to.matched[0].name == 'auth') {
        next(from.path)
    } else {
        next()
    }
})

export default router
