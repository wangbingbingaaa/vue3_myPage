<template>
    <div id="box12" class="box12">
        <svg v-if="width" :width="width / 2" :height="height / 2" :key="item" v-for="item in border"
            :class="`${item} dev-border`">
            <polyline :stroke="mergedColor[1]" class="line-inner" style=" fill: none" :points="`15 ,1  1 ,1  1,15`" />
            <polyline :stroke="mergedColor[0]" class="line-inner1" style=" fill: none" :points="`25 ,1 ${width * 0.5} 0`" />
            <polyline :stroke="mergedColor[0]" class="line-inner1" style=" fill: none"
                :points="`1 ,25 1 ${height * 0.5} `" />
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
        width.value = document.getElementById("box12")?.clientWidth
        height.value = document.getElementById("box12")?.clientHeight
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

.box12 {
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
        // width: 100%;
        // height: 100%;
        padding: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
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
