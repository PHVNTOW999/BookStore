import {ElLoading} from "element-plus";
import Notification from "@/constants/notification/index";

const asyncPattern = async (payload, notification) => {
    const loading = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    try {
        await payload
    } catch (e) {
        if(notification) Notification(e.data.detail || e.statusText, 'error')
    } finally {
        loading.close()
    }
}

export default asyncPattern