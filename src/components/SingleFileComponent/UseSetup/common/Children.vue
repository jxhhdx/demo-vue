<template>
  CHILDREN-
  {{ bbq }}-
  {{ bbc }}-
  <span 
    @click="onClick" 
    style="cursor: pointer;"
    :ref="onRef"
  >
    click
  </span>
</template>
<script setup>
import { ref } from 'vue';
const bbq = ref('hello wolrd');
const props = defineProps({ bbc: String });
const emit = defineEmits(['bbq996']);
const onClick = () => {
  emit('bbq996');
}
const onRef = (el) => {
  console.log('onRef', el);
}
const gebiClick = () => {
  console.log('好好得东西，我很开心');
}
defineExpose({ gebiClick })
</script>