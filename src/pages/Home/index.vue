<template>
  <div class="contain-warp">
    <Header></Header>
    <main>
      <router-view></router-view>
    </main>
  </div>
  <BmCesiumMap class="map" :url="configUrl" @onload="marsOnload"></BmCesiumMap>
  <BmCesiumMapTools
    name="BmCesiumMapTools"
    :positon="positon"
    :area-select="areaSelectUrl"
  >
  </BmCesiumMapTools>
</template>
<script setup lang="ts">
import { BmCesiumMap, BmCesiumMapTools } from 'bitmap3d';
import { useMapToolsStore } from '@/store';
import { ref, toRaw, provide } from 'vue';
import * as mars3d from 'mars3d';

const mapToolsStore = useMapToolsStore();
const positon = ref(toRaw(mapToolsStore.getToolsPositon));

//#region 定义变量
const configUrl = `${import.meta.env.BASE_URL}config/config.json`;
const areaSelectUrl = `${import.meta.env.BASE_URL}config/region.json`;
let mapInstance: mars3d.Map | undefined = undefined;
provide('getMapInstance', () => {
  return mapInstance;
});

//#endregion

//#region 事件
/**
 * 地图构造完成
 */
const marsOnload = (map: mars3d.Map) => {
  console.log('map构造完成', map);
  mapInstance = map;
};
//#endregion
</script>
<style lang="scss" scope>
.contain-warp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1001;
  main {
    height: calc(100% - 70px);
  }
}
.map {
  width: 100%;
  height: 100%;
}
</style>
