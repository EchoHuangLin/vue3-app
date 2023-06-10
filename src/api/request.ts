//对axios进行二次封装,将刚才下载好的axios导入进来
import axios from "axios";
import qs from "qs";
import { showToast } from "vant";
import constants from "@/utils/constant"
let { CODE_ERROR } = constants
let env = process.env.NODE_ENV
//2. 利用axios对象的方法create,去创建一个axios实例
//requests就是axios,只不过稍微配置一下

const api = axios.create({
    //基础路径
    baseURL: env=="development"?'/api':"http://192.168.108.149:8088/api", // 所有请求的公共地址部分
    timeout: 3000 // 请求超时时间,这里的意思是当请求时间超过5秒还未取得结果时,提示用户请求超时
})


// 请求拦截处理 请求拦截 在请求拦截中可以补充请求相关的配置
// interceptors axios的拦截器对象
api.interceptors.request.use(config => {
    // config 请求的所有信息
    // 在这里可以对config进行统一的配置
    // 设置token
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }
    // 判断是否为post请求
    if (config.method === 'post') {
        // 设置请求头
        config.headers['Content-Type'] = 'application/json'
        // 判断参数中是否有文件
        if (config.data instanceof FormData) {
            // 如果有文件
            // 设置请求头
            config.headers['Content-Type'] = 'multipart/form-data'
        } 
        // 判断参数是否form表单提交
        if(config.headers['Content-Type']=== 'application/x-www-form-urlencoded'){
            // 如果是form表单提交
            // 将参数进行序列化
            config.data = qs.stringify(config.data)
        }
        

    }

    // 例如：设置请求头
    // 设置请求的公共地址
    

    // 例如：设置请求的超时时间
    // 例如：设置请求的响应类型

    // 响应成功的返回
    return config // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
}, err => {
    // 请求发生错误时的相关处理 抛出错误
    //  //响应失败的返回
    Promise.reject(err)
})


//响应拦截处理  响应拦截器：包含两个函数（一个是成功返回的函数，一个是失败的返回的函数）
api.interceptors.response.use(res => {

    let data = res.data    
    // 例如：判断token是否失效
    if (data.code === CODE_ERROR) {
        // 如果token失效
        // 跳转到登录页
        showToast(data.msg);
        return false
    }
    return res.data
}, err => {
    // 服务器响应发生错误时的处理
    Promise.reject(err)
})



//最后一步 暴露出去实例导出
export default api;

export const get = (url:string, data:any) => {
    return api.get(url, data)
}   //get请求
export const post = (url:string, data:any) => {
    return api.post(url, data)
}  //post请求
