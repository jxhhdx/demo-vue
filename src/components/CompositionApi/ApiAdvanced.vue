<template>
  <div style="border: 1px solid; margin-top: 10px;">
    {{ JSON.stringify(sref, null, 2) }}
    -{{ udref }}-
    <br>
    <div class="block">
      <div>{{ JSON.stringify(sReactive, null, 2) }}</div>
      <div>{{ JSON.stringify(controlGroupSReactive, null, 2) }}</div>
    </div>
    <h6>readonly</h6>
    <div class="block">
      <!-- <h1>readonly</h1> -->
      <div>{{ JSON.stringify(sReadonly, null, 2) }}</div>
      <div>{{ JSON.stringify(controlGroupSReadonly, null, 2) }}</div>
    </div>
    <button @click="() => click('click')">click</button>
    <button @click="() => click('trigger')">trigger</button>
    <button @click="() => click('d')">Debounce</button>
    <button @click="() => click('shallowReactive')">shallowReactive</button>
    <button @click="() => click('controlGroupReactive')">controlGroupReactive</button>
    <button @click="() => click('shallowReadonly')">shallowReadonly</button>
    <button @click="() => click('controlGroupReadonly')">controlGroupReadonly</button>
    <button @click="() => click('toRaw')">toRaw</button>
    <button @click="() => click('markRaw')">markRaw</button>
    <button @click="() => click('counter')">counter</button>
    <button @click="() => click('getCurrentScope')">getCurrentScope</button>
  </div>
</template>

<script lang="ts">
import { 
  ref,
  shallowRef,
  triggerRef,
  customRef,
  shallowReactive,
  reactive,
  shallowReadonly,
  readonly,
  toRaw,
  markRaw,
  isReactive,
  effectScope,
  computed,
  watch,
  watchEffect,
  getCurrentScope,
  onScopeDispose,
} from 'vue';

function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
export default {
  setup() {
    const sref = shallowRef({ bbq: 'bbq' });
    // customRef
    const udref = useDebouncedRef(0);
    const sReactive = reactive({ bbq: { bbq996: 0 } });
    const controlGroupSReactive = shallowReactive({ bbq: { bbq996: 0 } });
    const sReadonly = readonly({ bbq: { bbq996: 0 } });
    const controlGroupSReadonly = shallowReadonly({ bbq: { bbq996: 0 } });
    const raw1 = reactive({ bbq: 'bbq' });
    const raw2 = shallowReactive({ bbq: 'bbq' });
    const raw3 = readonly({ bbq: 'bbq' });
    const raw4 = shallowReadonly({ bbq: 'bbq' });
    const scope = effectScope();
    const counter = ref(1)

    scope.run(() => {
      const doubled = computed(() => counter.value * 2)
      watchEffect(() => console.log('Count: ', doubled.value))
    })
    const gcs = getCurrentScope();
    onScopeDispose(() => {
      console.log('hello world')
    });
    const click = (param) => {
      if (param === 'click') {
        sref.value.bbq += '-bbq'
      } else if (param === 'trigger') {
        triggerRef(sref);
      } else if (param === 'd') {
        udref.value ++;
      } else if (param === 'shallowReactive') {
        sReactive.bbq.bbq996 ++;
      } else if (param === 'controlGroupReactive') {
        controlGroupSReactive.bbq.bbq996 ++;
      } else if (param === 'shallowReadonly') {
        sReadonly.bbq.bbq996 ++;
      } else if (param === 'controlGroupshallowReadonly') {
        controlGroupSReadonly.bbq.bbq996 ++;
      } else if (param === 'toRaw') {
        console.log(raw1, raw2, raw3, raw4);
        console.log(toRaw(raw1), toRaw(raw2), toRaw(raw3), toRaw(raw4));
      } else if (param === 'markRaw') {
        const foo = markRaw({})
        console.log(isReactive(reactive(foo))) // false
        // 也适用于嵌套在其他响应性对象
        const bar = reactive({ foo })
        console.log(isReactive(bar.foo)) // false
      } else if (param === 'counter') {
        counter.value ++;
      } else if (param === 'getCurrentScope') {
        console.log(gcs);
      }
    }
    return { sref, click, udref, sReactive, controlGroupSReactive, sReadonly, controlGroupSReadonly };
  }
}
</script>

<style>
.block {
  display: flex;
  width: 1000px;
  justify-content: space-between;
  margin: 0 auto;
}
</style>