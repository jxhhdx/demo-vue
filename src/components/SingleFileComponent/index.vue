<template>
  <syntax-specifition />
  <use-setup />
</template>

<script lang="ts">
import SyntaxSpecifition from './SyntaxSpecifition/index.vue';
import UseSetup from './UseSetup/index.vue';

export default {
  components: { SyntaxSpecifition, UseSetup }
}
</script>