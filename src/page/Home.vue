<template>
    <div class="home_con">
        <div class="top-con">
            <Header></Header>
        </div>
        <div class="center-con">
            <div class="cen-left fleclom">
                <div class="up-chart">
                    <Box12>
                        <BarScatter></BarScatter>
                    </Box12>

                </div>
                <div class="down-pie">
                    <Box12>
                        <Temperature></Temperature>
                    </Box12>
                </div>

            </div>
            <div class="cen-center">
                <MapEchart></MapEchart>
            </div>
            <div class="cen-right fleclom">
                <div class="up-chart">
                    <Box12>
                        <CalendarPie></CalendarPie>
                    </Box12>

                </div>
                <div class="down-pie">
                    <Box12>
                        <BarLine></BarLine>
                    </Box12>
                </div>
            </div>
        </div>
        <div class="foot-con">
            <Box14>
                <!-- <Relitu></Relitu> -->
                <WindChart></WindChart>
            </Box14>

        </div>

    </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Box12 from "../components/box12.vue";
import Box14 from "../components/box14.vue";
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import MapEchart from "./mapEchart.vue";
import BarScatter from "./barScatter.vue";
import CalendarPie from './calendarPie.vue'
import Temperature from './temperature.vue'
import BarLine from './barLine.vue'
import Relitu from "./relitu.vue";
import WindChart from "./windChart.vue";
</script>

<style lang="scss" scoped>
.fleclom {
    display: flex;
    flex-direction: column;
}

.up-chart {
    width: calc(100% - 1.25rem);
    height: calc(50% - 1.25rem);
    margin: 0 .625rem 1.25rem .625rem;
    box-shadow: inset .25rem .25rem 1.875rem #7ccef4;

}

.down-pie {
    width: calc(100% - 1.25rem);
    margin: 0 .625rem;
    box-shadow: inset .25rem .25rem 1.875rem #7ccef4;
    flex: 1;

}

.home_con {
    background-image: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    // overflow: hidden;
    display: flex;
    flex-direction: column;

    .top-con {
        width: 100vw;
        height: 8%;
        min-height: 70px;
    }

    .center-con {
        width: 100vw;
        flex: 1;
        display: flex;
        flex-direction: row;


        .cen-left {
            height: 100%;
            width: 30%;
        }

        .cen-center {
            flex: 1;
        }

        .cen-right {
            height: 100%;
            width: 30%;

        }
    }

    .foot-con {
        width: calc(100% - 20px);
        height: calc(30% - 20px);
        margin: 10px;
    }



}
</style>
