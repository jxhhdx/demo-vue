<template>
  <syntax-specifition />
  <use-setup />
  <use-css-features />
</template>

<script lang="ts">
import SyntaxSpecifition from './SyntaxSpecifition/index.vue';
import UseSetup from './UseSetup/index.vue';
import UseCssFeatures from './UseCssFeatures/index.vue';

export default {
  components: { SyntaxSpecifition, UseSetup, UseCssFeatures }
}
</script>