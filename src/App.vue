<script lang="ts" >
import AppInstanceApi from './components/AppInstanceApi.vue';
import GeneralApi from './components/GeneralApi.vue';
import CompositionApi from './components/CompositionApi/index.vue';
import OptionApi from './components/OptionApi/index.vue';
import BuiltIns from './components/BuiltIns/index.vue';
import SingleFileComponent from './components/SingleFileComponent/index.vue';
import AdvancedApi from './components/AdvancedApi/index.vue';

export default {
  components: {
    AppInstanceApi,
    GeneralApi,
    CompositionApi,
    OptionApi,
    BuiltIns,
    SingleFileComponent,
    AdvancedApi,
},
}

</script>

<template>
  <div>
    <!-- <app-instance-api /> -->
    <!-- <general-api /> -->
    <!-- <composition-api>
      <div>hello</div>
      <template v-slot:bbq="item">
        {{ item ? 'bbq-slot-true' : 'bbq-slot-false' }}
      </template>
      <template #bbc="item">
        {{ item ? 'bbc-slot-true' : 'bbc-slot-false' }}
      </template>
    </composition-api> -->
    <!-- <option-api id="穿透" /> -->
    <!-- <built-ins /> -->
    <!-- <single-file-component /> -->
    <advanced-api />
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
