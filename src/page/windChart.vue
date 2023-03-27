<template>
    <div class="chart-wind" ref="windMap" style="height: 100%;width: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import windData from '../json/wind.json'
import * as echarts from 'echarts'
import Showers from '../assets/showers.png'
import Sunny from '../assets/sunny.png'
import Cloudy from '../assets/cloudy.png'

const windMap = ref<HTMLElement>();
let myChart: echarts.ECharts;
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
onMounted(() => {
    myChart = echarts.init(windMap.value as HTMLElement);
    myChart.setOption(option);
})

const weatherIcons: Record<string, string> = {
    Showers: Showers,
    Sunny: Sunny,
    Cloudy: Cloudy
};

const directionMap: Record<string, number> = {};
// prettier-ignore
['W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE', 'N', 'NNW', 'NW', 'WNW'].forEach(function (name, index) {
    directionMap[name] = Math.PI / 8 * index;
});



const data = windData.data.map(function (entry: any) {
    return [entry.time, entry.windSpeed, entry.R, entry.waveHeight];
});
const weatherData = windData.forecast.map(function (entry: any) {
    return [
        entry.localDate,
        0,
        weatherIcons[entry.skyIcon],
        entry.minTemp,
        entry.maxTemp
    ];
});
const dims = {
    time: 0,
    windSpeed: 1,
    R: 2,
    waveHeight: 3,
    weatherIcon: 2,
    minTemp: 3,
    maxTemp: 4
};
const arrowSize = 18;
const weatherIconSize = 45;
const renderArrow: echarts.CustomSeriesOption['renderItem'] = function (
    param,
    api
) {
    const point = api.coord([
        api.value(dims.time),
        api.value(dims.windSpeed)
    ]);
    return {
        type: 'path',
        shape: {
            pathData: 'M31 16l-15-15v9h-26v12h26v9z',
            x: -arrowSize / 2,
            y: -arrowSize / 2,
            width: arrowSize,
            height: arrowSize
        },
        rotation: directionMap[api.value(dims.R)],
        position: point,
        style: api.style({
            stroke: '#ddd',
            lineWidth: 1
        })
    };
};
const renderWeather = function (
    param: echarts.CustomSeriesRenderItemParams,
    api: echarts.CustomSeriesRenderItemAPI
) {
    const point = api.coord([
        (api.value(dims.time) as number) + (3600 * 24 * 1000) / 2,
        0
    ]);
    return {
        type: 'group',
        children: [
            {
                type: 'image',
                style: {
                    image: api.value(dims.weatherIcon),
                    x: -weatherIconSize / 2,
                    y: -weatherIconSize / 2 - 16,
                    width: weatherIconSize,
                    height: weatherIconSize
                },
                position: [point[0], 90]
            },
            {
                type: 'text',
                style: {
                    text:
                        api.value(dims.minTemp) + ' - ' + api.value(dims.maxTemp) + '°',
                    textFont: api.font({ fontSize: 14 }),
                    textAlign: 'center',
                    textVerticalAlign: 'bottom',
                    fill: '#ddd',

                },
                position: [point[0], 50]
            },

        ]
    } as echarts.CustomSeriesRenderItemReturn;
};
option = {
    title: {
        text: '天气预报',
        left: 'center',
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
            return [
                echarts.format.formatTime(
                    'yyyy-MM-dd',
                    params[0].value[dims.time]
                ) +
                ' ' +
                echarts.format.formatTime('hh:mm', params[0].value[dims.time]),
                '风速：' + params[0].value[dims.windSpeed],
                '风向：' + params[0].value[dims.R],
                '浪高：' + params[0].value[dims.waveHeight]
            ].join('<br>');
        }
    },
    grid: {
        top: 100,
        bottom: 25
    },
    xAxis: {
        type: 'time',
        maxInterval: 3600 * 1000 * 24,
        splitLine: {
            lineStyle: {
                color: '#ddd'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
    },
    yAxis: [
        {
            name: '风速（节）',
            nameLocation: 'middle',
            nameGap: 35,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#ddd'
                }
            }
        },
        {
            name: '浪高（米）',
            nameLocation: 'middle',
            nameGap: 35,
            max: 6,
            axisLine: {
                lineStyle: {
                    color: '#015DD5'
                }
            },
            splitLine: { show: false }
        },
        {
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false }
        }
    ],
    visualMap: {
        type: 'piecewise',
        // show: false,
        orient: 'vertical',
        left: 'left',
        top: 28,

        textStyle: {
            color: '#dddddd'
        },
        pieces: [
            {
                gte: 17,
                color: '#18BF12',
                label: '大风（>=17节）'
            },
            {
                gte: 11,
                lt: 17,
                color: '#f4e9a3',
                label: '中风（11  ~ 17 节）'
            },
            {
                lt: 11,
                color: '#D33C3E',
                label: '微风（小于 11 节）'
            }
        ],
        seriesIndex: 1,
        dimension: 1
    },

    series: [
        {
            type: 'line',
            yAxisIndex: 1,
            showSymbol: false,
            emphasis: {
                scale: false
            },
            symbolSize: 0,
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(88,160,253,1)'
                        },
                        {
                            offset: 0.5,
                            color: 'rgba(88,160,253,0.7)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(88,160,253,0)'
                        }
                    ]
                }
            },
            lineStyle: {
                color: 'rgba(88,160,253,1)'
            },
            itemStyle: {
                color: 'rgba(88,160,253,1)'
            },
            encode: {
                x: dims.time,
                y: dims.waveHeight
            },
            data: data,
            z: 2
        },
        {
            type: 'custom',
            renderItem: renderArrow,
            encode: {
                x: dims.time,
                y: dims.windSpeed
            },
            data: data,
            z: 10
        },
        {
            type: 'line',
            symbol: 'none',
            encode: {
                x: dims.time,
                y: dims.windSpeed
            },
            lineStyle: {
                color: '#aaa',
                type: 'dotted'
            },
            data: data,
            z: 1
        },
        {
            type: 'custom',
            renderItem: renderWeather,
            data: weatherData,
            tooltip: {
                trigger: 'item',
                formatter: function (param: any) {
                    return (
                        param.value[dims.time] +
                        ': ' +
                        param.value[dims.minTemp] +
                        ' - ' +
                        param.value[dims.maxTemp] +
                        '°'
                    );
                }
            },
            yAxisIndex: 2,
            z: 11
        }
    ]
};

</script>

<style lang="scss" scoped></style>
