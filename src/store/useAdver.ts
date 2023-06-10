import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';

export default defineStore("advertise", () => {
    const adverList = reactive<Adver[]>([
        {title: "西餐",img: "advers/xican.jpg",desc: "这是一道美味的西餐！"},
        {title: "蛋糕",img: "advers/cake.jpg",desc: "这是一道美味的蛋糕！"},
        {title: "牛排",img: "advers/niupai.jpg",desc: "这是一道美味的牛排！"},
        {title: "烧鸭",img: "advers/shaoya.jpg",desc: "这是一道美味的烧鸭！"},
        {title: "寿司",img: "advers/shousi.jpg",desc: "这是一道美味的寿司！"},
        {title: "泰国菜",img: "advers/taican.jpg",desc: "这是一道美味的泰国菜！"},
        {title: "糖水",img: "advers/tangshui.jpg",desc: "这是一道美味的糖水！"},
    ]);// state

    const getAdverList=computed(() => {  //getter
        return adverList;
    });

    const addAdver = function(obj:Adver){ //action
        adverList.push(obj);
    }
    return {
        adverList,
        getAdverList,
        addAdver
    }
})