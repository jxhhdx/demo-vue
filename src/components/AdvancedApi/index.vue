<script lang="ts">
import { h, mergeProps, cloneVNode, isVNode, withDirectives, withModifiers } from 'vue';

export default {
  setup() {
    const one = {
      class: 'foo',
      onClick: () => {
        console.log('this is one');
      }
    };
    const two = {
      class: { bar: true },
      onClick: withModifiers(() => {
        console.log('stop', 'prevent');
      }, ['stop', 'prevent'])
    };
    const merged = mergeProps(one, two);
    const original = h('div', null, ['original1']);
    const cloned = cloneVNode(original, { id: 'bbq foo' });
    // 自定义指令
    const pin = {
      mounted() { 
        console.log('mounted====================================');
      },
      updated() { 
        console.log('updated====================================');
      }
    }

    // <div v-pin:top.animate="200"></div>
    const vnode = withDirectives(h('div'), [[pin]])
    return () => {
      return h(
        'div', 
        merged, 
        [
          'hello wolrd advanced api', 
          original, 
          cloned, 
          'isValueResult: ' + isVNode(original),
          vnode
        ]
      );
    }
  }
}
</script>