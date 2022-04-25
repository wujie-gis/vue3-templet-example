<template>
  <div class="warp">
    <router-link to="/dashboard/duty" exact-active-class="active" class="item"
      >值班值守</router-link
    >
    <router-link to="/dashboard/main" exact-active-class="active" class="item"
      >电子沙盘</router-link
    >
    <router-link
      to="/dashboard/command"
      exact-active-class="active"
      class="item"
      >指挥调度</router-link
    >
    <router-link
      to="/dashboard/monitor"
      exact-active-class="active"
      class="item"
      >监测预警</router-link
    >
  </div>
</template>
<script lang="ts" setup>
//#region 定义变量

//#endregion
</script>
<script lang="ts">
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
.warp {
  height: 70px;
  width: 100%;
  background-size: 100% 100%;
  display: flex;
  pointer-events: all;
  color: aliceblue;
  a {
    color: aliceblue;
    margin: 0 20px;
  }
}
</style>
