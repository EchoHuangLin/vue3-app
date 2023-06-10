<script setup lang="ts">
import { PropType } from 'vue';
import useGoods from '@/store/useGoods';
import { useRouter } from 'vue-router';
import { showConfirmDialog } from 'vant';
//添加商品条目
let { removeGoods } = useGoods();
let router = useRouter()
const props = defineProps({
    obj: {
        type: Object as PropType<Good>,
        required: true
    }
})

//编辑商品
let editGood = (id: number) => {
    router.push({
        path: "/editGood",
        query: {
            id
        }
    })
    console.log("编辑商品");
}

let confirmDelete = function (obj: Good) {
    showConfirmDialog({
        title: `确定删除该${obj.name}吗？`,
    })
        .then(() => {
            removeGoods(obj.id)
        })
        .catch(() => {
            // on cancel
        });
}
</script>
<template>
    <div class="good">
        <div class="good_pic">
            <van-image :lazy-load="true" :src="obj.img" />
        </div>
        <div class="good_info">
            <div>
                产品：{{ obj.name }}
            </div>
            <div>介绍：{{ obj.desc }}</div>
            <div>价格：{{ obj.price }}</div>
            <div v-role="'admin'">id：{{ obj.id }}</div>
        </div>
        <div class="edit" v-role="'admin'">
            <van-icon @click="editGood(obj.id)" color="skyblue" name="edit" size="20" />
            &nbsp;
            <van-icon @click="confirmDelete(obj)" color="red" name="delete" size="20" />
        </div>
    </div>
</template>
<style scoped lang="scss">
.good {
    height: 200px;
    padding: 5px 0px;
    border: 1px solid #ebebeb;
    margin: 10px;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;

    &_pic {
        flex: 0 0 200px;
        height: 200px;

        img {
            width: 100%;
            min-height: 100%;
        }
    }

    position: relative;

    &_info {
        flex: 0 0 auto;
        padding: 10px 30px;
        height: 200px;
        width: calc(100% - 200px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        div {
            &:nth-child(1) {
                flex: 1 0 30px;
                width: 100%;
                font-size: 25px;
                font-weight: bold;
            }

            &:nth-child(2) {
                flex: 3;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &:nth-child(3) {
                flex: 1;
            }

            width: 100%;
            font-size: 16px;
        }
    }

    .edit {
        position: absolute;
        right: 0px;
        top: 0px;
        font-size: 30px;
        padding: 0 10px;
        margin: 10px;
        box-sizing: border-box;
        border-radius: 10px;
        border: 1px solid #ebebeb;
    }
}
</style>