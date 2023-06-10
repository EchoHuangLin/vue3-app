import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/es/toast/style';
import { createPinia } from 'pinia'
import 'amfe-flexible';//移动端样式
import 'vant/es/dialog/style';
import 'nprogress/nprogress.css'
// console.log(import.meta.env.VITE_NAME);
import { Lazyload } from 'vant';
import directive from '@/directive';
import piniaPersist from 'pinia-plugin-persist'
const app=createApp(App as any)
let pinia = createPinia()
app.use(pinia.use(piniaPersist))
app.use(directive)
app.use(Lazyload, {
    lazyComponent: true,
  });
app.use(router).mount('#app')
