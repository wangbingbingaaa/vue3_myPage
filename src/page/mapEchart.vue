<template>
    <div class="chart-wrapper" ref="scatterMap" style="height: 100%;width: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import * as echarts from 'echarts'
import axios from 'axios'


let dataJson = ref<any>()
const scatterMap = ref<HTMLElement>();
let myChart;
onMounted(() => {
    axios.get("/china.json", {}).then(function (response) {
        dataJson.value = response.data
        initEcharts(dataJson.value)
        // let dataVal = createData(dataJson.value)
    })

})
window.addEventListener('resize', scatterMap.resize);
function createData(data: any[]) {
    return data.features.map((item: { properties: { name: any } }) => {
        return {
            name: item.properties.name,
            value: Math.floor(Math.random() * 361)
        }
    })
}




//渲染echarts图
const initEcharts = (data: any[]) => {
    myChart = echarts.init(scatterMap.value as HTMLElement);
    echarts.registerMap("china", data); //注册
    myChart.setOption({
        title: {							// 标题
            top: '5%',
            text: 'Echarts_Map',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#ccc'
            }
        },

        visualMap: {
            show: true,
            min: 0,
            max: 60,
            left: "0%",
            bottom: "0%",
            calculable: true,
            inRange: {
                color: ["#F2D658", "#D16446"],
            },
            textStyle: {
                color: "#EAB21F",
            },
        },
        geo: {
            map: 'china',
            type: 'map',
            geoIndex: 0,
            layoutCenter: ['50%', '70%'],
            layoutSize: '150%',
            zoom: 0.85,
            roam: false,
            label: {
                show: false,
                color: '#fff'
            },
            itemStyle: {
                normal: {
                    areaColor: '#08AADB',
                }
            },

            emphasis: { // 鼠标移入动态的时候显示的默认样式
                itemStyle: {
                    areaColor: '#24CFF4',
                    // borderColor: '#404a59',
                    borderWidth: 1
                },
                label: { // 文字
                    show: true,
                    color: '#084B5D',
                    fontSize: 18,
                    fontWeight: 600
                },
            },
        },
        series: [{
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [
                {
                    name: '海门',
                    value: [121.15, 31.89, 9]
                },
                {
                    name: '鄂尔多斯',
                    value: [109.781327, 39.608266, 12]
                },
                {
                    name: '招远',
                    value: [120.38, 37.35, 18]
                },
                {
                    name: '招远',
                    value: [110.38, 23.35, 8]
                },
                {
                    name: '招远',
                    value: [110.38, 33.35, 18]
                },
                {
                    name: '招远',
                    value: [102.38, 33.35, 7]
                },
                {
                    name: '招远',
                    value: [127.38, 46.35, 40]
                },

            ],
            symbolSize: function (val) {
                return val[2];
            },
        }]


        // series: [{
        //     type: 'map',
        //     map: 'china',
        //     layoutCenter: ["50%", "50%"],
        //     layoutSize: "100%",
        //     nameProperty: 'name',
        //     itemStyle: { // 地图样式
        //         shadowColor: 'RGBA(7, 59, 115, .1)',
        //         shadowOffsetX: -2,
        //         shadowOffsetY: 2,
        //         shadowBlur: 10,
        //     },

        //     data: createData(data)
        // }]


    });

}





</script>

<style lang="scss" scoped></style>
