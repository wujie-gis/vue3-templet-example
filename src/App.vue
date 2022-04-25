<template>
  <n-config-provider
    :theme="null"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-screen"
  >
    <router-view></router-view>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui';
import themeOverrides from '@/styles/theme';
</script>

<style></style>
