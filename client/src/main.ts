import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
const app = createApp(App)
import axios from "axios";

// noinspection TypeScriptValidateTypes
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

axios.defaults.headers.common['Authorization'] = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MTc1OTU2LCJpYXQiOjE3MjU1ODM5NTYsImp0aSI6IjFiN2E3MmEwMjllNzQ1M2E5ZDNkZDQ5M2EwZGI3YzU4IiwidXNlcl91dWlkIjoiY2JlNGI5YmUtZjZjYS00YWJlLTgyY2EtMDhlOWI3ZTFhNjI0In0.myf6KYIOk4MAu_dbxYolD1RSnpTi543ujSjSt1VJY0k'

app.mount('#app')
