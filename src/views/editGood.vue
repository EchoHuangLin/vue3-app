<script setup lang="ts">
import { useRoute } from 'vue-router';
import useGoods from '@/store/useGoods';
import { reactive } from 'vue';

import { showImagePreview } from 'vant'
let route = useRoute();
let goods = useGoods();
//获取数据

let id : any = route.query.id  ?? "";
let obj: Good | {} = reactive({});;
if (id) {
    obj = reactive({ ...goods.getGoods(id) as Good });
}


//图片上传

const afterRead = (file : any) => {
    console.log(file);
    
    // 此时可以自行将文件上传至服务器
    (obj as Good).img = file.content
};

const submitEvent = function () {
    if (id) {
        goods.updateGoods(obj as Good);
    } else {
        goods.addGoods(obj as Good);
    }
    history.back();
}

const descValidator = (val: string) => {
    return val.trim().length > 10;
}
</script>
<template>
    <div class="imgContaine">
        <van-image width="100%" :src="(obj as Good).img" @click="showImagePreview([(obj as Good).img]);" />
        <van-uploader class="edit" :after-read=" afterRead ">
            <van-icon color="red" name="edit" size="30" />
        </van-uploader>
    </div>
    <van-form @submit=" submitEvent ">
        <van-cell-group inset>
            <van-field v-model=" (obj as Good).name " name="产品名称" label="产品名称" placeholder="产品名称"
                :rules=" [{ required: true, message: '请填写产品名称' }] " />
            <van-field v-model=" (obj as Good).desc " name="产品介绍" label="产品介绍" placeholder="产品介绍"
                :rules=" [{ required: true, message: '请填写产品介绍' }, { validator: descValidator, message: '介绍内容必须超过十个字符' }] " />
            <van-field v-model=" (obj as Good).price " name="price" type="number" label="价格" placeholder="校验函数返回错误提示" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<style scoped lang="scss">
.imgContaine {
    width: 100%;
    padding: 10%;
    box-sizing: border-box;
    position: relative;

    .edit {
        position: absolute;
        right: 10%;
        bottom: 10%;
    }
}
</style>