<template>
    <div class="card">
        <div class="card-info">
            <p @click="cardClick()">{{ content }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

interface Props {
    content?: string,
}
defineProps<Props>()
const emit = defineEmits(["getValue"])

const cardClick = () => {
    emit("getValue", true)

}

</script>

<style lang="scss" scoped>
.card {
    width: 200px;
    height: 270px;
    background: linear-gradient(45deg, #00cc0a 25%, #00cc0a 25%, #444 25%, #444 50%, #00cc0a 50%, #00cc0a 75%, #444 75%, #444 100%);
    animation: animate_6810 15s linear infinite;
    transition: .3s;
    background-size: 60px 60px;
    position: relative;
    overflow: visible;
    border-radius: 20px;
}

.card-info {
    cursor: pointer;
    position: absolute;
    width: 96%;
    height: 96%;
    left: 2%;
    top: 2%;
    background-color: rgb(24, 22, 22);
    border-radius: 20px;
    transition: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-info:hover {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.822);
    backdrop-filter: blur(12px);
    left: 20px;
    top: 20px;
}

.card-info p {
    color: white;
    font-weight: bold;
    font-size: 30px;
}

@keyframes animate_6810 {
    0% {
        background-position: 0px;
    }

    100% {
        background-position: 1000px;
    }
}
</style>
