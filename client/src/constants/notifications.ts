import { ElMessage } from 'element-plus'

// types of Notification = 'success' || warning || error || null
const Notification = (msg, type) => {
    ElMessage({
        duration: 1500,
        showClose: true,
        message: msg || "Error",
        type: type,
    })
}

export default Notification