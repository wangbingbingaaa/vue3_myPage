<template>
    <div class="notfound">
        <div class="title">
            敬请期待....

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

</script>

<style lang="scss" scoped>
.title {
    font-size: 20px;
    padding: 10px;
}

.notfound {
    height: 100%;
    width: 100%;
    background-image: url(../assets/sys/没数据.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
</style>
