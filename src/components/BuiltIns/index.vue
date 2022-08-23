<template>
  <div>
    <h1>BuiltIns</h1>
    <div class="block-main">
      <div class="block1">
        use v-text<br> 
        <div v-text="bbq"></div>
      </div>
      <div class="block1">
        use v-html<br> 
        <div v-html="bbq"></div>
      </div>
      <div class="block1">
        use v-pre<br> 
        <span v-pre>{{ this will not be compiled }}</span>
      </div>
      <div class="block1">
        use v-once<br> 
        <span v-once @click="click">{{ bbc }}</span>
      </div>
      <div class="block1">
        use v-memo<br> 
        <span v-memo="[bbc]" @click="click">{{ bbc }}</span>
      </div>  
    </div>
    <hr>
    <div class="block-main">
      <button @click="onSwitch">switch</button>
      <Transition>
        <div v-if="ok">toggled content</div>
      </Transition>
    </div>
    <!-- <Transition/>
    <TransitionGroup/>
    <KeepAlive/>
    <Teleport/>
    <Suspense/> -->

  </div>
</template>

<script lang="ts">
export default {
  data() {
    return { bbq: '<div>bbq</div>', bbc: 0, ok: false };
  },
  methods: {
    click(){
      this.bbc  ++;
    },
    onSwitch() {
      this.ok = !this.ok
    }
  }
}
</script>
<style>
.block-main {
  display: flex;
}
.block1 {
  /* border: 1px solid; */
}
</style>