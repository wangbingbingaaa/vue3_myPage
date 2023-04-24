<template>
    <div class="system-contain">
        <div :class="foldStatus ? 'left-nav' : 'fold-nav'">
            <div class="logo-row">
                <div class="png">
                </div>
            </div>
            <div class="nav-div">
                <el-menu default-active="2" class="el-menu-vertical" @select="menuSelect" @close="handleClose">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <House />
                            </el-icon>
                            <span>Home</span>
                        </template>

                        <el-menu-item index="1-1">item one</el-menu-item>
                        <el-menu-item index="1-2">item two</el-menu-item>
                        <el-menu-item index="1-3">item three</el-menu-item>
                        <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="2">
                        <el-icon>
                            <Goods />
                        </el-icon>
                        <span>Product</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>Order</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <PieChart />
                        </el-icon>
                        <span>Chart</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <el-icon>
                            <DataLine />
                        </el-icon>
                        <span>Statistic</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>Setting</span>
                    </el-menu-item>
                    <el-menu-item index="comment">
                        <el-icon>
                            <Notebook />
                        </el-icon>
                        <span>Markdown</span>
                    </el-menu-item>
                </el-menu>
            </div>

        </div>
        <div class="main-contain">
            <div class="top-title">
                <div class="fold-btn">
                    <span class="iconfont icon-view-list" @click="foldClick"></span>
                </div>
                <div class="left-input">
                    <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input"
                        :prefix-icon="Search" />
                </div>
                <div class="right-some">
                    <div class="bell">
                        <span class="iconfont  icon-notification"></span>
                        <div class="num">6</div>
                    </div>
                    <div class="userName">
                        wangxb
                    </div>
                    <div class="user-down">
                        <span class="iconfont icon-xiangxia"></span>
                    </div>
                    <div class="user-img">
                    </div>

                </div>

            </div>
            <div class="main-page">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { Search } from '@element-plus/icons-vue'
import { Expand, Fold } from '@element-plus/icons-vue';
import {
    Document,
    Menu as IconMenu,
    House,
    HomeFilled,
    PieChart,
    Setting, Goods,
    DataLine, Notebook,
} from '@element-plus/icons-vue'
const router = useRouter();
const input1 = ref('')
let foldStatus = ref(true)

const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const menuSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    router.push({
        path: `/sys/${key}`
    });

}
const foldClick = () => {
    foldStatus.value = !foldStatus.value
    console.log(foldStatus.value, 'foldStatus.value')

}

</script>

<style lang="scss" scoped>
.el-menu-item.is-active {
    background-color: #ebf3f9;
    border-left: 4px solid #058ff8;
}

@keyframes fold {
    0% {
        width: 0px;
    }

    100% {
        width: 220px;
    }
}

@keyframes fold1 {
    0% {
        width: 220px;
    }

    100% {
        width: 0px;
    }
}

.system-contain {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    .fold-nav {
        animation: fold1 0.3s ease-in;
        width: 0px;

        .logo-row {
            width: 220px;

            .png {
                background-image: url(../../assets/sys/读书.png);
                height: 60px;
                width: 60px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                text-align: center;
                margin: 20px auto;
            }

        }
    }

    .left-nav {
        animation: fold 0.3s ease-out;
        height: 100%;
        width: 220px;

        .logo-row {
            width: 220px;

            .png {
                background-image: url(../../assets/sys/读书.png);
                height: 60px;
                width: 60px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                text-align: center;
                margin: 20px auto;
            }

        }

        .nav-div {
            height: calc(100% - 100px);
            width: 100%;

            .el-menu-vertical {
                height: 100%;
                width: 100%;
            }
        }
    }



    .main-contain {
        flex: 1;
        background-color: #F4F9FD;
        position: relative;

        .top-title {
            width: 100%;
            height: 60px;
            box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
            line-height: 60px;
            display: flex;
            flex-direction: row;

            .fold-btn {
                padding: 0 10px;

                .iconfont {
                    font-size: 26px;
                    cursor: pointer;
                }
            }

            .right-some {
                height: 60px;
                position: absolute;
                right: 0px;
                text-align: end;
                display: flex;
                flex-direction: row;
                padding: 0 30px;
            }

            .bell {
                position: relative;

                .iconfont {
                    font-size: 26px;
                }
            }

            .userName {
                padding-left: 30px;
            }

            .user-down {
                cursor: pointer;
            }

            .user-img {
                width: 40px;
                height: 40px;
                border-radius: 30px;
                border: 1px solid #ccc;
                margin: auto 0px;
                margin-left: 10px;
                background-image: url(../../assets/sys/user.jpg);
                background-size: cover;
                background-position: center;
            }

            .num {
                min-width: 26px;
                height: 20px;
                line-height: 20px;
                color: #F4F9FD;
                background-color: #4377f9;
                text-align: center;
                position: absolute;
                top: 6px;
                left: 10px;
                border-radius: 20px;
                font-size: 12px;
            }

            .left-input {
                width: 300px;
            }

        }

        .main-page {
            height: calc(100% - 70px)
        }
    }

}
</style>
