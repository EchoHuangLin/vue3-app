<script setup lang="ts">
import headerCom from '@/components/headerCom.vue';
import { ref, reactive } from 'vue'
let obj = reactive({
    title: "friends",
    left: "friends-left",
    right: "friends-right"
}) 
</script>
<template>
    friends
    <header-com :obj="obj">
        <template #default="{title}" >
            <div class="handsone">
                <button>{{title}}</button>
            </div>
        </template>
    </header-com>
</template>
<style scoped lang="scss"></style>