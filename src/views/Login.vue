<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import useUser from "@/store/useUser"
import lottie from 'lottie-web';
import animateData from 'assets/animation.json';
import { post } from '@/api/request';
import { showToast } from 'vant';

let user = useUser()
let form = reactive({
    username: '',
    password: ''
})
let rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'onBlur' },
        { min: 3, message: '用户名长度不能小于3', trigger: 'onBlur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'onBlur' },
        { min: 6, message: '密码长度不能小于6', trigger: 'onBlur' }
    ]
})

//密码可见属性切换
let switchPassType = ref(false)

const router = useRouter()

// 登录
const onSubmit = () => {
    post('/login', { ...form }).then((res: any) => {
        if (res?.code === 0) {
            localStorage.setItem('token', res.data.token)
            user.role = res.data.userData.role;
            router.push('/')
        }
    })
    //router.push('/')
}

let lottie_box = ref()

onMounted(() => {
    lottie.loadAnimation({
        container: lottie_box.value as HTMLElement, // 容器
        renderer: 'svg',        // 渲染方式:svg：支持交互、不会失帧、canvas、html：支持3D，支持交互
        loop: true,             // 循环播放，默认：true
        autoplay: true,         // 自动播放 ，默认true
        animationData: animateData                // json 路径
    })
})

let roleShow = ref("用户")
let isAdmin = ref(false);
watch(isAdmin, (newVal) => {
    if (newVal) {
        form.username = "admin";
        form.password = "123456";
        roleShow.value = "管理员"
    }
    if (!newVal) {
        form.username = "user";
        form.password = "123456";
        roleShow.value = "用户"
    }
}, { immediate: true })

//注册规则
let confirmRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'onBlur' },
        { min: 3, message: '用户名长度不能小于3', trigger: 'onBlur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'onBlur' },
        { min: 6, message: '密码长度不能小于6', trigger: 'onBlur' }
    ],
    comfirmPassword: [
        { required: true, message: '请输入用户名', trigger: 'onBlur' },
        { required: true, message: '请确认密码', trigger: 'onBlur' },
        {
            validator: (value: any) => {
                
                return value==registerForm.password
            }, message: "请确定密码一致",
            trigger: "onBlur"
        }
    ]
})

//注册功能
let registerForm = reactive({
    username: '',
    password: '',
    comfirmPassword: '',
})

//注册
const register = () => {
    post('/register', { ...registerForm }).then((res: any) => {
        if (res?.code === 0) {
            showToast({
                message: res?.data?.msg,
                type: 'success',
            })
        }
    })
}

//密码可见属性切换
let regPassType = ref(false)
let confirmPassType = ref(false)


let swiperDom = ref()
function goToRegister() {
    swiperDom.value.next()
}

function goToLogin() {
    swiperDom.value.prev()
}

</script>
<template>
    <!-- vant登录页面 -->
    <van-swipe ref="swiperDom" style="height: 100%;" :show-indicators="false" vertical>
        <van-swipe-item>
            <div class="content">
                <div class="showAni" ref="lottie_box"></div>
                <van-form @submit="onSubmit" :rules="rules" style="margin-top: 20px;margin-bottom: 200px;">
                    <van-cell-group inset>
                        <van-field name="switch" size="large" :label="roleShow">
                            <template #input>
                                <van-switch size="22" v-model="isAdmin" />
                            </template>
                        </van-field>
                        <van-field size="large" autocomplete="off" v-model="form.username" name="用户名" label="用户名"
                            placeholder="用户名" :rules="rules.username as any" />
                        <van-field size="large" v-model="form.password" @click-right-icon="switchPassType = !switchPassType"
                            :type="switchPassType ? 'text' : 'password'" name="密码" label="密码" placeholder="密码"
                            :right-icon="switchPassType ? 'closed-eye' : 'eye-o'" :rules="rules.password as any" />

                    </van-cell-group>
                    <div class="btnContaner">
                        <van-button class="btn" round block type="primary" native-type="submit">
                            登录
                        </van-button>
                    </div>
                </van-form>
                <div class="toRegister" @click="() => { goToRegister() }">
                    <div>没有账号？去注册</div>
                    <div class="icon"><van-icon size="25" name="arrow-down" /></div>
                </div>
            </div>
        </van-swipe-item>
        <van-swipe-item>
            <div class="content">
                <div class="toLogin" @click="() => { goToLogin() }">
                    <div class="icon"><van-icon size="25" name="arrow-up" /></div>
                    <div>没有账号？去注册</div>
                </div>
                <van-form @submit="onSubmit" :rules="confirmRules" style="margin-top: 20px;margin-bottom: 200px;">
                    <van-cell-group inset>
                        <van-field size="large" autocomplete="off" v-model="registerForm.username" name="用户名" label="用户名"
                            placeholder="用户名" :rules="confirmRules.username as any" />
                        <van-field size="large" v-model="registerForm.password"
                            @click-right-icon="regPassType = !regPassType" :type="regPassType ? 'text' : 'password'"
                            name="密码" label="密码" placeholder="密码" :right-icon="regPassType ? 'closed-eye' : 'eye-o'"
                            :rules="confirmRules.password as any" />
                        <van-field size="large" v-model="registerForm.comfirmPassword"
                            @click-right-icon="confirmPassType = !confirmPassType"
                            :type="confirmPassType ? 'text' : 'password'" name="确认密码" label="确认密码" placeholder="确认密码"
                            :right-icon="confirmPassType ? 'closed-eye' : 'eye-o'" :confirmRules="rules.comfirmPassword as any" />
                    </van-cell-group>
                    <div class="btnContaner">
                        <van-button class="btn" round block color="rgb(71 62 151)" @click="register">
                            注册
                        </van-button>
                    </div>
                </van-form>
            </div>
        </van-swipe-item>
    </van-swipe>
</template>
<style scoped lang="scss">
@import "assets/common.scss";



.content {
    .themeBtn {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    position: relative;

    .showAni {
        border-radius: 50%;
        border: 1px solid rgb(0, 232, 248);
        padding: 15px;
        width: 40vw;
        height: 40vw;
    }

    @keyframes register {
        0% {
            opacity: 0.5;
        }

        50% {
            opacity: 1;

        }

        100% {
            opacity: 0.5;
        }
    }

    .toRegister {
        position: absolute;
        bottom: 50px;
        font-size: 30px;
        animation: register 5s linear infinite;

        .icon {
            text-align: center;
        }
    }

    .toLogin {
        position: absolute;
        top: 50px;
        font-size: 30px;
        animation: register 5s linear infinite;

        .icon {
            text-align: center;
        }
    }

    .button-wrapper {
        margin-top: 20px;
        text-align: center;
    }

    .btnContaner {
        display: flex;
        justify-content: space-around;
        margin: 16px;

        .btn {
            margin: 30px;
        }
    }
}
</style>