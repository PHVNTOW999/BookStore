import {createRouter, createWebHistory} from 'vue-router'
import NewsView from "@/views/NewsView.vue";
import AuthView from "@/views/Auth/SignInView.vue";
import {useAuthStore} from "@/stores/auth";
import TestView from "@/views/TestView.vue";
import OauthView from "@/views/Auth/SocialAuthView.vue";
import SignInView from "@/views/Auth/SignInView.vue";
import SignUpView from "@/views/Auth/SignUpView.vue";

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
    const {tokenVerify, USER, checkUp, current} = useAuthStore()

    // if user not auth and page required auth
    if (USER.value === null && to.meta["requiresAuth"]) {
        // redirect to page auth
        next('/auth')
        // if user is auth and page required auth
    } else if (USER.value && to.meta["requiresAuth"]) {
        const token = JSON.parse(localStorage.getItem('token'))
        // console.log(token.access)
        if (token) await tokenVerify(token.access).then(next())
        // next()
    } else {
        next()
    }
})

export default router
