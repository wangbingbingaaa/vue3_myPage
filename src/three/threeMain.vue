<template>
    <div class="main_overlay">

        <div class="container">
            <router-view></router-view>
        </div>
        <div class="left_btns">
            <div class="btn_item">
                <BtnTree text="主页" @btnClick="goHome"></BtnTree>
            </div>
            <div class="btn_item">
                <BtnTree text="UI界面" @btnClick="goUI"></BtnTree>
            </div>
            <div class="btn_item">
                <BtnTree text="会跳舞的人" @btnClick="childGo('')"></BtnTree>
            </div>
            <div class="btn_item">
                <BtnTree text="乐高机器人" @btnClick="childGo('xsr')"></BtnTree>
            </div>
            <div class="btn_item">
                <BtnTree text="童话小屋" @btnClick="childGo('thxw')"></BtnTree>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BtnTree from '../components/btnTree.vue'
import BtnColor from '../components/btnColor.vue'
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const router = useRouter();
const childGo = (name) => {
    router.push({
        path: `/3d/${name}`
    });

}
const goHome = () => {
    router.push({
        path: "/"
    });

}
const goUI = () => {
    router.push({
        path: "/ui"
    });

}

</script>

<style lang="scss" scoped>
.main_overlay {
    width: 100vw;
    height: 100vh;
    background-color: #B9D3FF;

    .container {
        height: 100%;
        width: 100%;
    }
}

.left_btns {

    position: absolute;
    left: 0px;
    top: 50px;

    .btn_item {
        margin-bottom: 20px;
    }
}
</style>
