<script setup>
import { reactive } from 'vue'
const original = reactive({ count: 0 })

const click = () => {
  original.count ++
}

</script>

<template>
  <div>
    {{ original.count }}
    <button @click="click" >click</button>  
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
