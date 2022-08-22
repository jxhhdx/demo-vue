
<script lang="ts">
import { ref, h } from 'vue';

export default {
  props: {
    title: {
      type: String,
      default: 'this is title'
    }
  },
  setup(props, context) {
    const count = ref(0);
    console.log(props.title);
    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log('attrs', context.attrs);
    // 插槽（非响应式的对象，等价于 $slots）
    console.log('slots', context.slots);
    // 触发事件（函数，等价于 $emit）
    console.log('emit', context.emit);
    // 暴露公共属性（函数）
    console.log('expose', context.expose);
    return () => h(
      'div', 
      null, 
      [
        h('br'),
        count.value,
        h('br'),
        context.slots.bbq(),
        h('br'),
        context.slots.bbc('bbc'),
      ]
    )
  }
};
</script>