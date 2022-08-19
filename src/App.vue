<script >
import { computed, reactive, watch } from 'vue'
export default {
  inject: ['msg'],
  computed: {
      msgBbq() {
          return 'this value by children minxin'
      }
  },
  setup() {
    const original = reactive({ count: 0 })

    const click = () => {
      original.count ++
      console.log(this);
    }

    const onError = () => {
      const bbq = undefined;
      bbq.adadadas;
    }

    const onWaring = () => {
      // alert('hello world')
      console.warn('asdadasds')
    }

    // Trigger warnhandler 
    watch(() => original.value, 996);

    return { original, click, onError, onWaring }
  },
}

</script>

<template>
  <div>
    {{ original.count }}
    <br>
    {{ msg }}
    <br>
    {{ getValueByMixin }}
    <br>
    <button v-bbq:asdasd.996="'买买提'" @click="click" >click</button> 
    <button @click="onError" >Throw Error</button> 
    <button @click="onWaring" >Throw Warning</button> 
    <MyComponent />
    <bbq-a />
    <!-- 测试 compilerOptions.comments = false 是否有效 -->
    {{ gpVal }}
    <div>{{ msgBbq }}</div>
    
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
