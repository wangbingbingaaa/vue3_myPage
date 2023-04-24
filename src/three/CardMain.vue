<template>
    <div class="three_overlay">
        <div class="back-row">
            <span class="iconfont icon-fanhui" @click="goback()">返回主页</span>

        </div>
        <div class="cardRow">
            <CardPaper content="会跳舞得小人" @getValue="getValuePaper"></CardPaper>
            <CardBook content="会跳舞得小人" @getValue="getValueBook"></CardBook>
            <CardUp content="会跳舞得小人" @getValue="getValueUp"></CardUp>
            <CardLight content="会跳舞得小人" @getValue="getValue"></CardLight>
            <div>
                <div class="cards">
                    <p>会跳舞的小人</p>
                </div>
            </div>

        </div>
        <div class="cardRow" style="position: relative;">
            <CardTurn></CardTurn>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import CardLight from "../components/cardLight.vue"
import CardPaper from '../components/cardPaper.vue'
import CardBook from '../components/cardBook.vue'
import CardUp from '../components/cardUp.vue'
import CardTurn from '../components/cardTurn.vue'
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const router = useRouter();
const goback = () => {
    router.push({
        path: './'
    });

}

const getValue = (e) => {
    console.log(e)

}
const getValuePaper = (e) => {
    console.log(e)

}
const getValueBook = (e) => {
    console.log(e)

}
const getValueUp = (e) => {
    console.log(e)

}


onMounted(() => {

})

</script>

<style lang="scss" scoped>
.iconfont {
    cursor: pointer;
}

.cards {
    width: 190px;
    height: 254px;
    border-radius: 30px;
    background: #e0e0e0;
    box-shadow: 15px 15px 30px #bebebe,
        -15px -15px 30px #ffffff;
    text-align: center;
    line-height: 254px;
}

.three_overlay {
    width: 100vw;
    height: 100vh;
    background-color: #B9D3FF;

    .cardRow {
        padding: 50px 0 0 0;
        display: flex;
        flex-direction: row;
        gap: 24px;
        justify-content: space-around;


    }
}
</style>
