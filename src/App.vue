<script lang="ts" >
import AppInstanceApi from './components/AppInstanceApi.vue';
import GeneralApi from './components/GeneralApi.vue';
export default {
  components: {
    AppInstanceApi,
    GeneralApi
  },
}

</script>

<template>
  <div>
    <!-- <app-instance-api /> -->
    <general-api />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
