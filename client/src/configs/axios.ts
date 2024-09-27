import axios from "axios";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";

const api = axios.create()

api.defaults.timeout = 60000;
api.defaults.withCredentials = true;
api.defaults.xsrfHeaderName = 'X-CSRFToken';
api.defaults.xsrfCookieName = 'csrftoken';

api.interceptors.request.use(config => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) config.headers.Authorization = `JWT ${token.access}`
    return config
})

api.interceptors.response.use(config => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) config.headers['Authorization'] = `JWT ${token.access}`
    return config

}, async error => {
    if (error.response.data.code == "token_not_valid") {
        const router = useRouter();
        const token = JSON.parse(localStorage.getItem('token'))
        const {logout} = useAuthStore()

        return await axios.post('/api/auth/token/refresh/', {refresh: token.refresh}, {
            headers: {
                'Authorization': `JWT ${token.access}`
            }
        }).then(res => {
            const newToken = {
                access: res.data.access,
                refresh: token.refresh,
            }
            localStorage.setItem('token', JSON.stringify(newToken))
            error.config.headers.Authorization = `JWT ${res.data.access}`

            return api.request(error.config)
        }).catch(() => {
            logout()
            router.push({name: 'auth'})
        })
    }
})

export default api