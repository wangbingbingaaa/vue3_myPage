<template>
    <div class="chart-calendarPie" ref="calendarPie" style="height: 100%;width: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import * as echarts from 'echarts'

const calendarPie = ref<HTMLElement>();
let myChart;
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
var option1: EChartsOption;

onMounted(() => {

    myChart = echarts.init(calendarPie.value as HTMLElement);
    let currentOption = option;
    myChart.setOption(currentOption, true);
    setInterval(function () {
        currentOption = currentOption === option ? option1 : option;
        myChart.setOption(currentOption, true);
    }, 4000);


    window.addEventListener('resize', myChart.resize);

})

option = {

    toolbox: {
        show: true,
    },
    series: [
        {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [20, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
            ]
        }
    ]
};

option1 = {

    radar: {
        // shape: 'circle',
        indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
        ]
    },
    series: [
        {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
                {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: 'Allocated Budget'
                },
                {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: 'Actual Spending'
                }
            ]
        }
    ]
};


</script>

<style lang="scss" scoped></style>
