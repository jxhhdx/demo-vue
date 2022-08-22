<template>
  <div>OptionApi</div>
</template>

<script lang="ts">
export default {
  name: 'OptionApiBBQ',
  inheritAttrs: false,
  data() {
    return { bbq: '' }
  },
  mounted() {
    console.log('OptionApiBBQ this', this);
    console.log('$data', this.$data);
    console.log('$el', this.$el);
    console.log('$options', this.$options);
    console.log('$parent', this.$parent.$el);
    console.log('$root', this.$root.$el);
    console.log('$slots', this.$slots);
    console.log('$refs', this.$refs);
    console.log('$attrs', this.$attrs);
    // console.log('$data', this.$data);
    // $data
    // $props
    // $el
    // $options
    // $parent
    // $root
    // $slots
    // $refs
    // $attrs
    // $watch()
    // $emit()
    // $forceUpdate()
    // $nextTick()

  }
}
</script>