<template>
  UseSetup<br />
  <BbqChildren ref="bbqRef" bbc="this parant value" @bbq996="onBbq996" /><br />
  <div @click="onUseChildren">hello</div>
</template>
<!-- <script setup lang="ts">
import { ref } from 'vue';
import BbqChildren from './common/Children.vue';
const bbqRef = ref(null);
const vMyDirective = {
  beforeMount: (el: HTMLElement) => {
    // 在元素上做些操作
    el.style.color = 'red';
  }
}
const onBbq996 = () => {
  console.log('onBbq996');
}
const onUseChildren = () => {
  // 触发成功
  bbqRef.value.gebiClick();
}
</script> -->
<script lang="ts">
import { ref } from 'vue';
import BbqChildren from './common/Children.vue';
export default {
  components: { BbqChildren },
  // directives: {
  //   vMyDirective : {
  //     beforeMount: (el: HTMLElement) => {
  //       // 在元素上做些操作
  //       el.style.color = 'red';
  //     }
  //   }
  // },
  data() {
    return {
      bbqRef: null,
    }
  },
  methods: {
    onUseChildren() {
      // this.$ref.bbqRef.gebiClick();
      console.log('====================================');
      console.log(this.$refs.bbqRef.gebiClick());
      console.log('====================================');
    }
  },
  setup() {
    // const bbqRef = ref(null);
    const onBbq996 = () => {
      console.log('onBbq996');
    }
    // const onUseChildren = () => {
    //   // 触发成功
    //   bbqRef.value.gebiClick();
    // }
    return { onBbq996 };
  }
}
</script>