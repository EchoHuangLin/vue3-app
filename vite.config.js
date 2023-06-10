import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from "path"
import postCssPxToRem from "postcss-pxtorem"

//这是在node环境下运行的，所以可以使用node的api
//console.log(process.env.NODE_ENV);

// https://vitejs.dev/config/

//如何配置生产环境 删除console.log
//1.在package.json中配置
// "build": "vue-tsc --noEmit && vite build",
//2.在vite.config.js中配置
// optimizeDeps: {
//   include: ['axios', 'mockjs', 'vant']
// },
//3.在tsconfig.json中配置
// "exclude": ["node_modules", "dist", "mock", "vite.config.ts", "vite.config.js", "vite-env.d.ts", "src/shims-vue.d.ts", "src/shims-tsx.d.ts", "src/shims.d.ts", "src/router/index.ts", "src/store/index.ts", "src/network/index.ts", "src/views/login/index.ts", "src/views/login/login.ts", "src/views/login/login.vue", "src/views/login/login.vue.d.ts", "src/views/login/login.vue.js", "src/views/login/login.vue.js.map", "src/views/login/login.vue.ts", "src/views/login/login.vue.ts.map", "src/views/login/login.vue.map", "src/views/login/login.vue.d.ts.map", "src/views/login/login.vue.js.map", "src/views/login/login.vue.ts.map", "src/views/login/login.vue.map", "src/views/login/login.vue.d.ts.map", "src/views/login/login.vue.js.map", "src/views/login/login.vue.ts.map", "src/views/login/login.vue.map", "src/views/login/login.vue.d.ts.map", "src/views/login/login.vue.js.map", "src/views/login/login.vue.ts.map", "src/views/login/login.vue.map"],

export default defineConfig(({command}) => {
  console.log(command);
  return {
    plugins: [vue(), Components({
      resolvers: [VantResolver()],
    }),],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], //导入时想要省略的扩展名列表
      alias: {
        "@": path.resolve(__dirname, "src"),
        "views": path.resolve(__dirname, "src/views"),
        "components": path.resolve(__dirname, "src/components"),
        "assets": path.resolve(__dirname, "src/assets"),
        "network": path.resolve(__dirname, "src/network"),
        "utils": path.resolve(__dirname, "src/utils"),
        "store": path.resolve(__dirname, "src/store"),
        "router": path.resolve(__dirname, "src/router"),
      },
    },
    server: {
      port: 5000,
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8088/',
          changeOrigin: true,
          //rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    define: {
      'process.env': {
        UPLOAD: process.env.herf,
        LOGIN_URL: process.env.herf,
        UPLOAD_IMGURL: process.env.herf + "/uploadfile",
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    },

    css: {
      postcss: {
        plugins: [
          postCssPxToRem({ // px转rem
            rootValue({ file }) { // 根元素字体大小 rootValue
              return file.indexOf('vant') !== -1 ? 37.5 : 75 // vant组件库字体大小为37.5,其他为75
            }, // 根元素字体大
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            selectorBlackList: ['van-'] // 不需要转换的选择器
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/style/common.scss";`,
        },
      },
    },
    build: {
      // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'，这是指 支持原生 ES 模块的浏览器。
      // target: 'es2015',
      // 指定生成静态资源的存放路径（相对于 build.outDir）。
      // outDir: 'dist',
      // 指定生成静态资源的存放路径（相对于 build.outDir）。
      // assetsDir: 'assets',
      /**
       * 构建后是否生成 source map 文件。如果为 true，
       * 将会创建一个独立的 source map 文件。如果为 'inline'，
       * source map 将作为一个 data URI 附加在输出文件中。'hidden' 的工作原理与 'true' 相似
       * ，只是 bundle 文件中相应的注释将不被保留。
       */
      sourcemap: command === 'dev',
      //sourcemap: true,
      terserOptions: {
        /**
         * command 用来判断环境
         */
        compress: {
          drop_console: command === 'dev',
          // 默认是true
          drop_debugger: command === 'dev'
        }
      }
    },
  }
})

