<template>
    <div class="three_overlay">
        <div id="three_glb">
        </div>
    </div>
</template>

<script setup lang="ts">
import BG from '../assets/bg.jpeg'
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
let AnimationMixer;
let Tclock = new THREE.Clock();

onMounted(() => {

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x282923);
    scene.background = new THREE.TextureLoader().load(BG)

    const loader = new GLTFLoader();

    const stacy_txt = new THREE.TextureLoader().load('./obj/stacy.jpg');

    loader.load('./obj/stacy_lightweight.glb', glb => {  // 调用OBJ的loader函数,加载成功会有个回调函数，参数obj就是模型加载成功后的网格Mesh实例对象
        stacy_txt.flipY = false;
        const material = new THREE.MeshPhongMaterial({
            map: stacy_txt,
            color: 0xffffff,
            skinning: true
        });

        glb.scene.traverse(function (child) {
            if (child.isMesh) {
                child.material = material
            }
        });

        let fileAnimations = glb.animations;

        AnimationMixer = new THREE.AnimationMixer(glb.scene);
        console.log(fileAnimations, 'fileAnimations')

        addAniControl(fileAnimations)


        // 设置模型缩放
        glb.scene.scale.set(10, 10, 10);
        // 设置模型位置
        glb.scene.position.set(0, 0, 0);
        // 将模型添加到场景中
        scene.add(glb.scene);
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
    camera.position.set(0, 20, 50);
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)


    /**
     * 创建渲染器对象
     */

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true, precision: 'highp' })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;

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
    console.log(controls)
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    controls.target.set(0.9247346909432187, 7.2946490568369535, 9.208833428337742)
    //是否可以缩放
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1;

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

const addAniControl = (Anis) => {

    const clipActions = Anis.map(item => {
        let clip = AnimationMixer.clipAction(item);
        clip.name = item.name;
        return clip;
    });

    const playAni = function (ani) {
        if (ani.name == 'idle') {
            ani.play();
            return;
        } else {
            ani.setLoop(THREE.LoopOnce);
            ani.reset();
            ani.play();
            defaultAni.crossFadeTo(ani, 0.25, true);
            setTimeout(function () {
                defaultAni.enabled = true;
                ani.crossFadeTo(defaultAni, 0.25, true);
            }, (ani._clip.duration - 0.5) * 1000);
        }
    }
    //默认播放
    const defaultAni = clipActions[8];
    playAni(defaultAni)

    //动作列表
    if (!document.querySelector('#anisPanelStyle')) {
        var anisPanelStyle = document.createElement('style');
        anisPanelStyle.type = "text/css";
        anisPanelStyle.id = 'anisPanelStyle';
        anisPanelStyle.innerText += '#anisPanel{position:fixed;display:flex;flex-wrap:wrap;justify-content:center; width:100%;bottom:15%;left:50%;transform:translate(-50%,0); color:#515151;cursor:pointer;}\
                               #anisPanel li{line-height:30px;text-align:center;border:1px solid #fff; font-size:14px;margin:10px;width:50px;height:50px;line-height:50px;overflow:hidden; border-radius:50px;background:rgba(250,218,193,0.8);}#anisPanel li.on,#anisPanel li:hover{color:#fff;background:rgba(73,73,73,0.8);}';

        document.head.insertBefore(anisPanelStyle, document.head.lastChild);
    }

    var anisPanel = document.createElement('ul');
    anisPanel.id = 'anisPanel';

    clipActions.forEach(item => {
        if (item.name != 'idle') {
            let LI = document.createElement('li');
            LI.innerText = item.name;
            LI.onclick = function () {
                const LIS = anisPanel.children;
                for (let j = 0; j < LIS.length; j++) {
                    LIS[j].className = '';
                }
                // let className = className == 'on' ? '' : 'on';
                playAni(item)

            }
            anisPanel.appendChild(LI);
        }
    })
    let ThreeApp = document.getElementById('three_glb')
    ThreeApp.appendChild(anisPanel)



}

</script>

<style lang="scss" scoped>
.three_overlay {
    width: 100vw;
    height: 100vh;
    background-color: #B9D3FF;
}
</style>
