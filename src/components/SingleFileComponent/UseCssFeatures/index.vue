<template>
  <div class="example">hi</div>
  <!-- <p :class="$style.red">This should be red</p> -->
  <p :class="bbq996.red">This should be red</p>
</template>

<script setup>

</script>

<!-- <style scoped> -->
<!-- <style module> -->
<style module="bbq996">
.example {
  color: red;
}
.red {
  color: red;
}
</style>