<template>
    <div class="in-header">
        <div class="header-text">
            xxx-大屏系统
        </div>
        <div class="left-con">
            <div class="item_btn" @click="jumpPage('/3d')">
                3D展示
            </div>
            <div class="item_btn" @click="jumpPage('/ui')">
                UI展示
            </div>
            <div class="item_btn" @click="jumpPage('/sys')">
                管理系统
            </div>
        </div>
        <div class="right-con" @click="jump()">跳转react项目</div>

    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const router = useRouter();
const jump = () => {
    let path = 'https://wangbingbingaaa.github.io/myPage/'
    window.location.href = path

}
const jumpPage = (val: any) => {
    router.push({
        path: val
    });
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

    .left-con {
        position: absolute;
        left: 16px;
        color: #ffffff;
        font-size: 1.2rem;
        top: 8px;
        cursor: pointer;
        display: flex;

        .item_btn {
            margin: 0 16px 0 0;

        }

        .item_btn:hover {
            color: #0ddfea;
        }

    }

    .right-con {
        position: absolute;
        right: 16px;
        color: #ffffff;
        font-size: 1.2rem;
        top: 8px;
        cursor: pointer;
    }

    .right-con:hover {
        color: #0ddfea;
    }
}
</style>
