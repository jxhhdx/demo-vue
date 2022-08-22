<template>
  <div style="border: 1px solid; margin-top: 10px;">
    {{ JSON.stringify(sref, null, 2) }}
    -{{ udref }}-
    <br>
    <button @click="() => click('click')">click</button>
    <button @click="() => click('trigger')">trigger</button>
    <button @click="() => click('d')">Debounce</button>
  </div>
</template>

<script lang="ts">
import { shallowRef, triggerRef, customRef } from 'vue';

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
    const udref = useDebouncedRef(0);
    const click = (param) => {
      if (param === 'click') {
        sref.value.bbq += '-bbq'
      } else if (param === 'trigger') {
        triggerRef(sref);
      } else if (param === 'd') {
        udref.value ++;
      }
    }
    return { sref, click, udref };
  }
}
</script>