import {defineStore} from 'pinia';
import {computed, reactive} from "vue";
import api from "@/configs/axios";

export const useAuthStore = defineStore('Auth', () => {
    const auth = reactive({
        user: null,
        token: {
            access: null,
            refresh: null,
        }
    })

    const isAuth = computed(() => {
        const lsUser = JSON.parse(localStorage.getItem('user'))
        const lsToken = JSON.parse(localStorage.getItem('token'))
        if (lsUser && lsToken) {
            auth.user = lsUser
            auth.token = lsToken
            return true
        } else {
            return false
        }
    })

    const login = async (payload) => {
        await api.post('/api/auth/login/', payload).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('token', JSON.stringify(res.data.token))
        })
    }

    const check = async () => {
        if(isAuth) await api.get('/api/auth/check/')
    }

    const logout = async () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        if (isAuth === true) {
            await api.post('/api/auth/logout/')
        }
    }

    // const verifyToken = async (payload) => {
    //     if (isAuth) return await api.post('/api/token/verify/', {'token': payload})
    // }

    // const refreshToken = async (payload) => {
    //     await api.post('/api/token/refresh/', {'refresh': payload}).then(res => {
    //         const newToken = {
    //             access: res.data.access,
    //             refresh: payload,
    //         }
    //         localStorage.setItem('token', JSON.stringify(newToken))
    //     })
    // }

    return {login, logout, check, auth, isAuth}
});