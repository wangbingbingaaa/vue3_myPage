<template>
    <div class="three_overlay">
        <div id="three_glb">
            three
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import * as THREE from 'three'
// 导入轨道控制器
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'


onMounted(() => {

    var scene = new THREE.Scene();
    const loader = new GLTFLoader();
    loader.load('./obj/hgg.glb', glb => {  // 调用OBJ的loader函数,加载成功会有个回调函数，参数obj就是模型加载成功后的网格Mesh实例对象
        // 设置模型缩放
        glb.scene.scale.set(10, 10, 10);
        // 设置模型位置
        glb.scene.position.set(0, 0, 0);
        // 将模型添加到场景中
        scene.add(glb.scene);
    });
    // Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
    var axesHelper = new THREE.AxesHelper(250);
    scene.add(axesHelper);

    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(0, 100, 200); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    document.getElementById('three_glb').appendChild(renderer.domElement); //body元素中插入canvas对象

    // 渲染函数
    function render() {
        renderer.render(scene, camera); //执行渲染操作
        // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
        requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();
    //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
    var controls = new OrbitControls(camera, renderer.domElement);
})

</script>

<style lang="scss" scoped>
.three_overlay {
    width: 100vw;
    height: 100vh;
    background-color: #B9D3FF;
}
</style>
