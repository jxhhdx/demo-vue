
<script lang="ts">
import { 
  ref,
  h,
  reactive,
  computed,
  readonly,
  watchEffect,
  watch,

  isRef,
  unref,
  toRef,
  toRefs,
  isProxy,
  isReactive,
  isReadonly,

  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
  onServerPrefetch,
} from 'vue';
import ApiChildren from './ApiChildren.vue';
import ApiAdvanced from './ApiAdvanced.vue';

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

    // 三、tool
    (() => {
      // isRef()
      console.log(
        'isRef:', 
        `
          ref: ${isRef(attr1)};
          reactive: ${isRef(attr2)};
          computed: ${isRef(attr3)};
          readonly: ${isRef(attr4)};
        `,
      );
      // unref()
      console.log(
        'unref:', 
        'ref',
        unref(attr1),
        attr1,
        'reactive',
        unref(attr2),
        attr2,
        'computed',
        unref(attr3),
        attr3,
        'readonly',
        unref(attr4),
        attr4,
      );
      // toRef()
      console.log(
        'toRef:', 
        'ref',
        toRef(attr1.value, 'a1'),
        'reactive',
        toRef(attr2, 'a2'),
        'computed',
        toRef(attr3.value, 'a3'),
        'readonly',
        toRef(attr4.value, 'a1'),
      );
      // toRefs()
      console.log(
        'toRefs:', 
        'ref',
        toRefs(attr1.value),
        'reactive',
        toRefs(attr2),
        'computed',
        toRefs(attr3.value),
        'readonly',
        toRefs(attr4.value),
      );
      // isProxy()
      console.log(
        'isProxy:', 
        'ref',
        isProxy(attr1.value),
        'reactive',
        isProxy(attr2),
        'computed',
        isProxy(attr3),
        'readonly',
        isProxy(attr4),
      );
      // isReactive()
      console.log(
        'isReactive:', 
        'ref',
        isReactive(attr1),
        'reactive',
        isReactive(attr2),
        'computed',
        isReactive(attr3),
        'readonly',
        isReactive(attr4),
      );
      // isReadonly()
      console.log(
        'isReadonly:', 
        'ref',
        isReadonly(attr1),
        'reactive',
        isReadonly(attr2),
        'computed',
        isReadonly(attr3),
        'readonly',
        isReadonly(attr4),
      );
    })();
    onMounted(() => { console.log('onMounted') });
    onUpdated(() => { console.log('onUpdated') });
    onUnmounted(() => { console.log('onUnmounted') });
    onBeforeMount(() => { console.log('onBeforeMount') });
    onBeforeUpdate(() => { console.log('onBeforeUpdate') });
    onBeforeUnmount(() => { console.log('onBeforeUnmount') });
    onErrorCaptured((...param) => { console.log('onErrorCaptured', param); return false; });
    onRenderTracked(() => {});
    onRenderTriggered(() => {});
    // KeepAline 缓存树被加入dom时调用
    onActivated(() => {});
    // KeepAline 缓存树被移除时调用
    onDeactivated(() => {});
    // 在服务器渲染之前调用
    onServerPrefetch(() => {});

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
        ['只读代理，修改原代理会影响此内容: ', attr4.value.a1],
        h('br'),
        h(ApiChildren, 'hello'),
        h('br'),
        h(ApiAdvanced, 'hello')
      ]
    )
  }
};
</script>