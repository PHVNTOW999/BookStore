import {defineStore} from 'pinia';
import {computed, ref} from "vue";
import api from "@/api/axios";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

export const useAuthStore = defineStore('Auth', () => {
    const router = useRouter();
    const {cookies} = useCookies();
    const sessionid = cookies.get('sessionid')

    // state
    const user = ref(null)

    // getters
    const USER = computed(() => { return user })

    //actions
    const register = async (payload) => {
        await api.post('/api/auth/register/', payload)
    }

    const login = async (payload) => {
        await api.post('/api/auth/login/', payload).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            user.value = res.data.user
        })
    }

    const oauthLogin = async () => {
        try {
            await api.get('/api/auth/oauthLogin/').then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                user.value = res.data.user
            })
        } catch (e) {
            console.log(e)
        }
    }

    const current = async () => {
        try {
            await api.get('/api/auth/current/').then(res => { user.value = res.data})
        } catch (e) {
            console.log(e)
        }
    }

    const tokenVerify = async () => {
        const token = JSON.parse(localStorage.getItem('token'))

        try {
            await api.post('/api/auth/token/verify/', {'token': token.access})
        } catch (e) {
            console.log(e)
        }
    }

    const logout = async () => {
        localStorage.removeItem('token')
        cookies.remove('sessionid')

        await api.post('/api/auth/logout/')
        await router.go(0)
    }

    return {user, USER, register, login, logout, current,  oauthLogin, tokenVerify}
});