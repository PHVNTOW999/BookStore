import {defineStore} from 'pinia';
import {computed, ref} from "vue";
import api from "@/config/axios";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";
import Notification from "@/helpers/notification";
import {useCookies} from "vue3-cookies";
import axios from "axios";
import asyncPattern from "@/helpers/asyncPattern";

export const useAuthStore = defineStore('Auth', () => {
    const router = useRouter();
    const {cookies} = useCookies()

    // states
    const user = ref(null)

    // getters
    const USER = computed(() => {
        return user
    })

    // mutations
    const clearAuth = () => {
        localStorage.removeItem('token')
        cookies.remove('sessionid')
        user.value = null
    }

    //actions
    const register = async (payload) => {
        await asyncPattern(api.post('/api/auth/register/', payload).then(() => {
            Notification('You have successfully registered!', 'success')
        }), true)
    }

    const login = async (payload) => {
        await asyncPattern(api.post('/api/auth/login/', payload).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            user.value = res.data.user
            router.push({'name': 'Home'})
        }).then(() => {
            Notification('You have successfully sign in!', 'success')
        }), true)
    }

    const oauthLogin = async () => {
        await asyncPattern(api.get('/api/auth/oauthLogin/').then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            user.value = res.data.user
            router.push({'name': 'Home'})
        }), true)
    }

    const current = async () => {
        await asyncPattern(api.get('/api/auth/current/').then(res => {
            user.value = res.data
        }), false)
    }

    const tokenRefresh = async (payload) => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            return await axios.post('/api/auth/token/refresh/', {refresh: payload.refresh}, {
                headers: {
                    'Authorization': `JWT ${payload.access}`
                }
            })
        } catch (e) {
            Notification(e.data.detail || e.statusText, 'error')
        } finally {
            loading.close()
        }
    }

    const tokenVerify = async (payload) => {
        await asyncPattern(api.post('/api/auth/token/verify/', {'token': payload}), true)
    }

    const logout = async () => {
        await asyncPattern(api.post('/api/auth/logout/').then(res => {
            Notification(res.data, 'success')
        }).then(clearAuth), true)
    }

    return {
        user,
        USER,
        register,
        login,
        oauthLogin,
        current,
        tokenRefresh,
        tokenVerify,
        clearAuth,
        logout,
    }
});