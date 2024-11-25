import axios from "axios";
import {useAuthStore} from "@/stores/auth";

const api = axios.create()

api.defaults.timeout = 60000;
api.defaults.withCredentials = true;
api.defaults.xsrfHeaderName = 'X-CSRFToken';
api.defaults.xsrfCookieName = 'csrftoken';

api.interceptors.request.use(config => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (token) config.headers.Authorization = `JWT ${token.access}`

    if(token && config.url == "/api/auth/token/verify/") config.data = {token: token.access}
    // if(token && config.url == "/api/auth/token/refresh/") config.data = {refresh: token.refresh}

    return config
})

api.interceptors.response.use(config => {
    return config
}, async error => {
    const {clearAuth, tokenRefresh, TOKEN} = useAuthStore()
    const token = JSON.parse(localStorage.getItem('token'))
    // if the error is related to validation of token or auth
    if (error.response.status == 401) {
        // try refresh token
        return await tokenRefresh(token).then(async res => {
            const newToken = {
                access: res.data.access,
                refresh: token.refresh,
            }

            localStorage.setItem('token', JSON.stringify(newToken))
            error.config.headers.authorization = `JWT ${res.data.access}`

            return api.request(error.config)
        }).catch(() => {
            console.log('error')
            // if refresh token is broke, delete user and token
            clearAuth()
            return Promise.reject(error.response)
        })
    }
    // any
    else {
        return Promise.reject(error.response.data)
    }
})

export default api