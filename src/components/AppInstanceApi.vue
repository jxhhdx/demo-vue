<script lang="ts" >
import { computed, reactive, watch, defineComponent } from 'vue'
export default defineComponent({
  inject: ['msg'],
  computed: {
      msgBbq() {
          return 'this value by children minxin'
      }
  },
  setup(props, context) {
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
    context.expose

    return { original, click, onError, onWaring }
  },
})

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
    <my-component />
    <bbq-a />
    <!-- 测试 compilerOptions.comments = false 是否有效 -->
    {{ gpVal }}
    <div>{{ msgBbq }}</div>
    
  </div>
</template>
