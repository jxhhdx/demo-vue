<script >
import { reactive } from 'vue'
export default {
  inject: ['msg'],
  setup() {
    const original = reactive({ count: 0 })

    const click = () => {
      original.count ++
    }
    return { original, click }
  }
}

</script>

<template>
  <div>
    {{ original.count }}
    {{ msg }}
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
