<template>
  <div class="index">
    <span>当前数值{{ countComputed }}</span>
    <br />
    <span>双倍数值{{ doubleCount }}</span>
    <br />
    <el-button @click="countStore.countAdd"> +1 </el-button>
    <el-button type="primary" @click="countStore.countAdd"> -1 </el-button>
    <div class="...">
      <div class="flow-root ...">
        <div class="my-4 ...">1</div>
      </div>
      <div class="flow-root ...">
        <div class="my-4 ...">2</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="store">
import { computed } from 'vue';
import { useCountStore } from '@/store';
import { storeToRefs } from 'pinia';
const countStore = useCountStore();
// 通过计算属性
const countComputed = computed(() => countStore.count);
// 通过 storeToRefs api 结构
const { doubleCount } = storeToRefs(countStore);
</script>
<style scoped></style>
