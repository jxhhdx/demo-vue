<script lang="ts" >
import AppInstanceApi from './components/AppInstanceApi.vue';
import GeneralApi from './components/GeneralApi.vue';
import CompositionApi from './components/CompositionApi/index.vue';

export default {
  components: {
    AppInstanceApi,
    GeneralApi,
    CompositionApi,
  },
}

</script>

<template>
  <div>
    <!-- <app-instance-api /> -->
    <!-- <general-api /> -->
    <composition-api>
      <div>hello</div>
      <template v-slot:bbq="item">
        {{ item ? 'bbq-slot-true' : 'bbq-slot-false' }}
      </template>
      <template #bbc="item">
        {{ item ? 'bbc-slot-true' : 'bbc-slot-false' }}
      </template>
    </composition-api>
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
