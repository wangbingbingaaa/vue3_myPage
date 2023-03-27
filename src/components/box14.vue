<template>
    <div id="box14" class="box14">
        <svg v-if="width" :width="width / 2" :height="height / 2" :key="item" v-for="item in border"
            :class="`${item} dev-border`">
            <circle id="myCircle" cx="3" cy="3" r="2" :fill="mergedColor[1]"></circle>
            <polyline :stroke="mergedColor[0]" class="line-inner1" style=" fill: none" :points="`10 ,1 ${width / 2} 0`" />

            <polyline :stroke="mergedColor[0]" class="line-inner1" style=" fill: none" :points="`1 ,10 1 ${height / 3} `" />
            <polyline :stroke="mergedColor[1]" class="line-inner" style=" fill: none"
                :points="`5 ,${height / 3 - 15}  5 ${height / 2} `" />
        </svg>
        <div class="slot-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom'];
const backgroundColor = '#0fffc0';
const mergedColor = ['#0FBCD8', '#7CDEED'];
let width = ref<any>()
let height = ref<any>()
onMounted(() => {
    setTimeout(() => {
        width.value = document.getElementById("box14")?.clientWidth
        height.value = document.getElementById("box14")?.clientHeight
    }, 500)
})


</script>

<style lang="scss" scoped>
.line-inner {
    stroke-width: 0.25rem;
}

.line-inner1 {
    stroke-width: 0.15rem;
}

.box14 {
    position: relative;
    width: 100%;
    height: 100%;
    // border-radius: 6px;

    .dev-border {
        width: 100%;
        height: 100%;


    }

    .slot-content {
        position: relative;
        padding: .625rem;
        width: calc(100% - 1.25rem);
        height: calc(100% - 1.25rem);
    }

    .dev-border {
        position: absolute;
        display: block;
    }

    .right-top {
        right: 0px;
        transform: rotateY(180deg);
    }

    .left-bottom {
        bottom: 0px;
        transform: rotateX(180deg);
    }

    .right-bottom {
        right: 0px;
        bottom: 0px;
        transform: rotateX(180deg) rotateY(180deg);
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
