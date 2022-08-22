
<script lang="ts">
import { ref, h, reactive, computed, readonly, watchEffect, watch } from 'vue';

export default {
  props: {
    title: {
      type: String,
      default: 'this is title'
    }
  },
  setup(props, context) {

    //  一. base use
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

    // 二. core api
    const attr1 = ref({ a1: 'a1' });
    const attr2 = reactive({ a2: 'a2' });
    const attr3 = computed(() => ({ a3: 'a3' }));
    const attr4 = readonly(attr1);
    const click = () => {
      // Ref<Object> Reactive<Object> ComputedRef<Object>
      console.log(attr1, attr2, attr3);
    };
    // watchEffect 和 watch 有什么区别
    // + 懒执行副作用；
    // + 更加明确是应该由哪个状态触发侦听器重新执行；
    // + 可以访问所侦听状态的前一个值和当前值。
    watchEffect(() => {
      console.log('watchEffect', attr1.value.a1);
    });
    watch(() => attr1.value.a1, () => {
      console.log('watch', attr1.value.a1);
    })
    // test flush?: 'pre' | 'post' | 'sync'
    watchEffect(() => {
      const bbq996 = document.querySelector('#bbq996') as HTMLElement;
      console.log('watchEffect-pre', bbq996);
    }, { flush: 'pre' });
    watchEffect(() => {
      const bbq996 = document.querySelector('#bbq996') as HTMLElement;
      console.log('watchEffect-sync', bbq996);
    }, { flush: 'sync' });
    watchEffect(() => {
      const bbq996 = document.querySelector('#bbq996') as HTMLElement;
      console.log('watchEffect-post', bbq996);
    }, { flush: 'post' });

    return () => h(
      'div', 
      null, 
      [
        h('div', { id: 'bbq996' }, 'bbq-before'),
        h('br'),
        count.value,
        h('br'),
        context.slots.bbq(),
        h('br'),
        context.slots.bbc('bbc'),
        h('br'),
        h('br'),
        h('button', { onClick: click }, 'click'),
        h('button', { onClick: () => { attr1.value.a1 += 'attr1'; } }, 'click-ref'),
        h('button', { onClick: () => { attr4.value.a1 += 'attr1'; } }, 'click-readonly'),
        h('br'),
        ['只读代理，修改原代理会影响此内容: ', attr4.value.a1]
      ]
    )
  }
};
</script>