<template>
    <div class="in-header">
        <div class="header-text">
            xxx-大屏系统
        </div>
        <div class="right-con" @click="jump()">跳转react</div>

    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const jump = () => {
    let path = 'https://wangbingbingaaa.github.io/myPage/'
    window.location.href = path

}

</script>

<style lang="scss" scoped>
.in-header {
    height: 100%;
    width: 100%;
    background-image: url('../assets/title2.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .header-text {
        color: #ffffff;
        font-size: 2rem;
        text-align: center;


    }

    .right-con {
        position: absolute;
        right: 16px;
        color: #ffffff;
        font-size: 1.2rem;
        top: 10px;
        cursor: pointer;
    }
}
</style>
