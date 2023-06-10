<script setup>
import { useSlots } from 'vue'
    let slot = useSlots();
    let isDefault=!!slot.default
   let props = defineProps({
        obj:{
            title: {
                type:String,
                default:""
            },
            left:{
                type:String,
                default:""
            },
            right:{
                type:String,
                default:""
            }
        }
    })

</script>
<template>
    <div class="headerCom">
        <div class="left">{{ obj.left }}</div>
        <slot v-if="isDefault" name="default" :title="obj.title" />
        <div v-else class="title">{{ obj.title }}</div>
        <div class="right">{{ obj.title }}</div>
    </div>
</template>
<style scoped lang="scss">
.headerCom{
    width: 100%;
    height: 44px;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 44px;
}
</style>