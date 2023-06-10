import { defineStore} from 'pinia';
import {reactive,computed} from 'vue';
export default defineStore("goods", () => {
    let goodsList = reactive([
        {id: 1, name: "香蕉", img: "goods/banana.jpeg", desc: "来自哥伦比亚的风味，剥开皮，里面是美味和健康！", price: 3.9},
        //{id: 2, name: "苹果", img: "goods/apple.jpeg", desc: "来自新西兰的风味，剥开皮，里面是美味和健康！", price: 5.9},
        {id: 3, name: "橘子", img: "goods/orange.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 4.9},
        {id: 4, name: "梨子", img: "goods/pear.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 3.9},
        {id: 5, name: "西瓜", img: "goods/watermelon.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 2.9},
        {id: 6, name: "葡萄", img: "goods/grape.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 6.9},
        {id: 7, name: "草莓", img: "goods/strawberry.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 7.9},
        //{id: 8, name: "樱桃", img: "goods/cherry.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 8.9},
        {id: 9, name: "菠萝", img: "goods/pineapple.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 9.9},
        {id: 10, name: "哈密瓜", img: "goods/hamigua.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 10.9},
        //{id: 11, name: "榴莲", img: "goods/liulian.jpeg", desc: "来自中国的风味，剥开皮，里面是美味和健康！", price: 11.9},
        {id: 12, name: "李子", img: "goods/plum.jpeg", desc: "一口咬开满是酸酸甜甜！", price: 12.9}
    ]);
    const getGoodList=computed(()=>{
        return goodsList;
    })


    const addGoods = (good: Good) => {
        console.log(goodsList[goodsList.length-1].id + 1);
        
        good.id = goodsList[goodsList.length-1].id + 1;
        goodsList.push(good);
    }
    const removeGoods = (id: number | string) => {
        const index = goodsList.findIndex(item => item.id === id);
        goodsList.splice(index, 1);
    }
    const updateGoods = (good: Good) => {
        const index = goodsList.findIndex(item => item.id === good.id);
        goodsList[index] = good;
    }
    const getGoods = (id: number | string) => {
        return goodsList.find(good => good.id == id);
    }
    return {
        goodsList,
        addGoods,
        removeGoods,
        updateGoods,
        getGoods,
        getGoodList
    }
});