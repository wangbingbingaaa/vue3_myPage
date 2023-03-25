<template>
    <div class="one">
        <div class="two">

        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

</script>

<style lang="scss" scoped>
.one {
    width: 192px;
    height: 158px;
    background-color: bisque;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    .two {
        width: 192px;
        height: 108px;
        background-color: aquamarine
    }
}
</style>
