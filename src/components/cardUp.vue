<template>
    <article class="card">
        <div class="temporary_text">
        </div>
        <div class="card_content">
            <span class="card_title">
                <p @click="cardClick()">{{ content }}</p>
            </span>
            <span class="card_subtitle">可以写内容</span>


        </div>
    </article>
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
    position: relative;
    width: 250px;
    height: 250px;
    color: #2e2d31;
    background: #131313;
    overflow: hidden;
    border-radius: 20px;
}

.temporary_text {
    font-weight: bold;
    font-size: 24px;
    color: #f8f8f8;
    background: url('../assets/plat.jpg');
    // animation: rotation 3s linear infinite;
    background-size: contain;
    height: 100%;
    width: 100%;
    background-position: center;
    box-shadow: 20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;
}

@-webkit-keyframes rotation {

    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
    }

}


.card_title {
    font-weight: bold;
}

.card_content {
    position: absolute;
    left: 0;
    bottom: 0;
    /* edit the width to fit card */
    width: 100%;
    padding: 20px;
    background: #f2f2f2;
    border-top-left-radius: 20px;
    /* edit here to change the height of the content box */
    transform: translateY(150px);
    transition: transform .25s;
}

.card_content::before {
    content: '';
    position: absolute;
    top: -47px;
    right: -45px;
    width: 100px;
    height: 100px;
    transform: rotate(-175deg);
    border-radius: 50%;
    box-shadow: inset 48px 48px #f2f2f2;
}

.card_title {
    color: #131313;
    line-height: 15px;
}

.card_subtitle {
    display: block;
    font-size: 12px;
    margin-bottom: 10px;
}

.card_description {
    font-size: 14px;
    opacity: 0;
    transition: opacity .5s;
}

.card:hover .card_content {
    transform: translateY(0);
}

.card:hover .card_description {
    opacity: 1;
    transition-delay: .25s;
}
</style>
