<template>
    <div class="chart-barScatter" ref="barScatter" style="height: 100%;width: 100%;"></div>
</template>

<script setup lang="ts">
import { EChartsOption } from "echarts";
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import * as echarts from 'echarts'

import { femaleData, maleDeta } from './echartData.js'

const barScatter = ref<HTMLElement>();
let myChart: { setOption: (arg0: EChartsOption, arg1: boolean) => void; };

onMounted(() => {

    myChart = echarts.init(barScatter.value as HTMLElement);
    let currentOption = scatterOption;
    myChart.setOption(currentOption, true);
    setInterval(function () {
        currentOption = currentOption === scatterOption ? barOption : scatterOption;
        myChart.setOption(currentOption, true);
    }, 4000);
    window.addEventListener('resize', myChart.resize);

})


function calculateAverage(data: number[][], dim: number) {
    let total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data[i][dim];
    }
    return (total /= data.length);
}

const scatterOption: echarts.EChartsOption = {
    xAxis: {
        scale: true,
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    yAxis: {
        scale: true,
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    series: [
        {
            type: 'scatter',
            id: 'female',
            dataGroupId: 'female',
            universalTransition: {
                enabled: true,
                delay: function (idx: any, count: any) {
                    return Math.random() * 400;
                }
            },
            data: femaleData
        },
        {
            type: 'scatter',
            id: 'male',
            dataGroupId: 'male',
            universalTransition: {
                enabled: true,
                delay: function (idx: any, count: any) {
                    return Math.random() * 400;
                }
            },
            data: maleDeta
        }
    ]
};

const barOption: echarts.EChartsOption = {
    xAxis: {
        type: 'category',
        data: ['Female', 'Male'],
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    series: [
        {
            type: 'bar',
            id: 'total',
            data: [
                {
                    value: calculateAverage(maleDeta, 0),
                    groupId: 'male'
                },
                {
                    value: calculateAverage(femaleData, 0),
                    groupId: 'female'
                }
            ],
            universalTransition: {
                enabled: true,
                seriesKey: ['female', 'male'],
                delay: function (idx, count) {
                    return Math.random() * 400;
                }
            }
        }
    ]
};




</script>

<style lang="scss" scoped></style>
