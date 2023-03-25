<template>
    <div class="chart-temperature" ref="temperature" style="height: 100%;width: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
const temperature = ref<HTMLElement>();
let myChart;
onMounted(() => {
    myChart = echarts.init(temperature.value as HTMLElement);
    myChart.setOption(option);
    setInterval(function () {
        const random = +(Math.random() * 60).toFixed(2);
        myChart.setOption<echarts.EChartsOption>({
            series: [
                {
                    data: [
                        {
                            value: random
                        }
                    ]
                },
                {
                    data: [
                        {
                            value: random
                        }
                    ]
                }
            ]
        });

    }, 4000);
    window.addEventListener('resize', myChart.resize);

})

option = {
    series: [
        {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
                color: '#FFAB91'
            },
            progress: {
                show: true,
                width: 20
            },

            pointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width: 10
                }
            },
            axisTick: {
                distance: -25,
                splitNumber: 5,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            splitLine: {
                distance: -32,
                length: 14,
                lineStyle: {
                    width: 1,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: -20,
                color: '#999',
                fontSize: 20
            },
            anchor: {
                show: false
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, '-25%'],
                fontSize: 30,
                fontWeight: 'bolder',
                formatter: '{value} °C',
                color: 'inherit'
            },
            data: [
                {
                    value: 20
                }
            ]
        },

        {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
                color: '#FD7347'
            },
            progress: {
                show: true,
                width: 8
            },

            pointer: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            detail: {
                show: false
            },
            data: [
                {
                    value: 20
                }
            ]
        }
    ]
};



</script>

<style lang="scss" scoped></style>
