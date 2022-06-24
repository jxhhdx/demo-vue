<script>
import { reactive, readonly, watchEffect } from 'vue';
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // works for reactivity tracking
  console.log(copy.count, 'copy.count')
})

// mutating original will trigger watchers relying on the copy
// original.count++

// mutating the copy will fail and result in a warning
// copy.count++ // warning!
</script>

<template>
  hello world
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
