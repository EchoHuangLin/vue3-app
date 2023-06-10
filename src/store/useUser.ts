import { defineStore } from 'pinia'
import { ref } from "vue"
export default defineStore("user", () => {
    //let role = ref("")
    // 数据持久化一定要用ref包裹
    let role = ref("")
    return {
        role
    }
},
    {
        persist:  {
            enabled: true , // 这个配置代表存储生效，而且是整个store都存储
          }, 
    }
)
