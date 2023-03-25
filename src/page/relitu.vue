<template>
    <div class="chart-relitu" ref="relitu" style="height: 100%;width: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import * as echarts from 'echarts'
const relitu = ref<HTMLElement>();
let myChart;
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;

onMounted(() => {

    myChart = echarts.init(relitu.value as HTMLElement);
    myChart.setOption(option, true);

    window.addEventListener('resize', myChart.resize);

})


function getVirtualData(year: string) {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];
    for (let time = date; time < end; time += dayTime) {
        data.push([
            echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
            Math.floor(Math.random() * 10000)
        ]);
    }
    return data;
}

option = {

    tooltip: {},
    visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 25
    },
    calendar: {
        top: 70,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2016',
        itemStyle: {
            borderWidth: 0.5
        },
        yearLabel: { show: false }
    },
    series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtualData('2016')
    }
};


</script>

<style lang="scss" scoped></style>
