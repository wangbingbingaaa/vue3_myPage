<template>
    <div class="three_overlay">
        <div id="xiangsu">
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
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

let AnimationMixer: any
let Tclock = new THREE.Clock();

onMounted(() => {
    var scene = new THREE.Scene();
    let geometry = new THREE.SphereGeometry(500, 100, 100);
    let material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./obj/pImg6.png'), //导入图片
        color: 0xcccccc,
        side: THREE.BackSide,
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    const loader = new FBXLoader();
    const texture1 = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./obj/Stormland.png')//颜色贴图
    });
    const texture2 = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./obj/stormland_logo.png')//颜色贴图
    });
    const texture = [
        { name: 'gardener,hologram_2,hologram', path: texture1 },
        { name: 'Plane', path: texture2 }
    ]
    loader.load('./obj/xsr.fbx', fbx => {  // 调用OBJ的loader函数,加载成功会有个回调函数，参数obj就是模型加载成功后的网格Mesh实例对象
        console.log(fbx)
        fbx.traverse((child) => {
            texture.map(item => {
                if (item.name.indexOf(child.name) != -1) {
                    child.material = item.path
                }
            })
        });

        if (fbx.animations.length > 0) {
            AnimationMixer = new THREE.AnimationMixer(fbx);
            AnimationMixer.clipAction(fbx.animations[0]).play();
        }
        // 将模型添加到场景中
        scene.add(fbx);
        ModelAutoCenter(fbx)
        setTimeout(() => {
            controls.autoRotate = true;
        }, 1000);
    });


    /**
     * 光源设置
     */
    const Lights = [
        { name: 'AmbientLight', obj: new THREE.AmbientLight(0xFFFFFF, 1) },
        // { name: 'DirectionalLight_top', obj: new THREE.DirectionalLight(0xFFFFFF, 3), position: [0, 15, 0] },
        { name: 'DirectionalLight_bottom', obj: new THREE.DirectionalLight(0x1B1B1B, 3), position: [0, -200, 0] },
        { name: 'DirectionalLight_right1', obj: new THREE.DirectionalLight(0xFFFFFF, 1.5), position: [0, -5, 20] },
        { name: 'DirectionalLight_right2', obj: new THREE.DirectionalLight(0xFFFFFF, 1.5), position: [0, -5, -20] },
    ];
    Lights.map(item => {
        item.obj.name = item.name;
        item.position && item.obj.position.set(...item.position);
        scene.add(item.obj);
    })

    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.set(0, 0, 50);
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true, precision: 'highp' })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x777777);
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.getElementById('xiangsu').appendChild(renderer.domElement); //body元素中插入canvas对象

    // 渲染函数
    function render() {
        renderer.render(scene, camera); //执行渲染操作
        // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
        requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();
    //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
    var controls = new OrbitControls(camera, renderer.domElement);
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //是否可以缩放
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1;

    //设置相机距离原点的最远距离-可以控制缩放程度
    controls.minDistance = 0;
    //设置相机距离原点的最远距离
    controls.maxDistance = 3000;//800
    //是否开启右键拖拽
    controls.enablePan = false;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.dampingFactor = 0.5;


    function animation() {
        //更新控制器
        renderer.render(scene, camera);
        // this.TestStats.update();
        controls.update();
        AnimationMixer && AnimationMixer.update(Tclock.getDelta());
        requestAnimationFrame(() => animation());
    }
    animation()
})

const ModelAutoCenter = function (group) {
    /**
     * 包围盒全自动计算：模型整体居中
     */
    var box3 = new THREE.Box3()
    // 计算层级模型group的包围盒
    // 模型group是加载一个三维模型返回的对象，包含多个网格模型
    box3.expandByObject(group)
    // 计算一个层级模型对应包围盒的几何体中心在世界坐标中的位置
    var center = new THREE.Vector3()
    box3.getCenter(center)
    // console.log('查看几何体中心坐标', center);

    // 重新设置模型的位置，使之居中。
    group.position.x = group.position.x - center.x
    group.position.y = group.position.y - center.y
    group.position.z = group.position.z - center.z
}

</script>

<style lang="scss" scoped>
.three_overlay {
    width: 100vw;
    height: 100vh;
    background-color: #B9D3FF;
}
</style>
