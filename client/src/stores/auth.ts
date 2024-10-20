import {defineStore} from 'pinia';
import {computed} from "vue";
import api from "@/configs/axios";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

export const useAuthStore = defineStore('Auth', () => {
    const router = useRouter();

    const user = computed(() => {
        const lsUser = JSON.parse(localStorage.getItem('user'))
        const lsToken = JSON.parse(localStorage.getItem('token'))
        if (lsUser && lsToken) {
            return lsUser
        } else {
            return null
        }
    })

    const login = async (payload) => {
        await api.post('/api/auth/login/', payload).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('token', JSON.stringify(res.data.token))
        })
        await user
    }

    const oauthLogin = async () => {
        try {
            await api.get('/api/auth/oauthLogin/').then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', JSON.stringify(res.data.token))
            })
        } catch (e) {
            console.log(e)
        } finally {
            await user
        }
    }

    const current = async () => {
        const { cookies } = useCookies();
        const sessionid = cookies.get('sessionid')
        if (sessionid) await api.get('/api/auth/current/')
    }

    const logout = async () => {
        const { cookies } = useCookies();

        localStorage.removeItem('user')
        localStorage.removeItem('token')
        cookies.remove('sessionid')

        await api.post('/api/auth/logout/')
        // await router.push({'name': 'auth'})
        await router.go(0)
    }

    return {login, logout, current, user, oauthLogin}
});