<template>
    <div class="comment">
        <div class="oper-row">
            <el-button type="primary" @click="newMark">发布</el-button>
        </div>
        <div class="comment-main">
            <div class="com-item" v-for="(item, index) in commentList" :key="index">
                <div class="com-title">{{ item.title }} </div>
                <div class="com-detail">
                    <div class="img">
                        <img :src="`src/assets/sys/${item.img}`" alt="tip" width="140" height="100">
                    </div>
                    <div class="detail">{{ item.detail }}</div>

                </div>
                <div class="com-oper"></div>

            </div>

        </div>
        <el-dialog v-model="dialogTableVisible" title="新建文章">
            <v-md-editor v-model="text" left-toolbar="undo redo clear h bold italic code save" height="400px"
                @save="markSave"></v-md-editor>

        </el-dialog>


    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { commentList } from './data.js'
const dialogTableVisible = ref(false)
const text = ref('')
const markSave = (e) => {
    console.log(e)
    console.log(text.value)

}

const newMark = () => {
    dialogTableVisible.value = true

}

</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 8px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(120, 121, 122, 0.4);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(120, 121, 122, 0.4);
}

.oper-row {
    text-align: end;
}

.comment {
    padding: 15px 30px;
    height: calc(100% - 30px);
    width: calc(100% - 60px);
    overflow: auto;

    .oper-row {
        height: 40px;
        line-height: 40px;
    }

    .comment-main {
        height: calc(100%);
        width: 100%;

        .com-item {
            border-bottom: 1px solid #ddd;
            min-height: 140px;
            padding: 10px 0;
            width: 100%;

            .com-title {
                height: 40px;
                font-size: 16px;
                line-height: 40px;
                text-align: left;
                font-weight: bold;

            }

            .com-detail {
                width: 100%;
                display: flex;
                flex-direction: row;

                .img {
                    height: 100px;
                    width: 140px;
                    background-color: #289961;
                    margin-right: 16px;
                }

                .detail {
                    flex: 1;
                    text-align: left;
                    font-size: 14px;
                }

            }

        }
    }
}
</style>
