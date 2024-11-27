import { ElMessage } from 'element-plus'

// types of Index = 'success' || 'warning' || 'error' || null
const Notification = (msg, type) => {
    ElMessage({
        dangerouslyUseHTMLString: true,
        duration: 2000,
        showClose: true,
        message: msg || "Error",
        type: type,
    })
}

export default Notification