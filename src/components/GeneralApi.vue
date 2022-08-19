<template >
  {{ version }}
  <my-page />
</template>

<script lang="ts">
import { version, defineAsyncComponent, h, onMounted, defineCustomElement } from "vue";

export default {
  components: {
    MyPage: defineAsyncComponent({
      loader: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let bbq = Math.random() * 10;
            bbq = Math.floor(bbq);
            if (bbq % 2 === 0) {
              resolve(h('div', null, 'loader') as any)
            }
            reject();
          }, 1000)
        });
      },
      loadingComponent: h('div', null, 'loading'),
      errorComponent: h('div', null, 'error')
    }),
  },
  setup() {
    onMounted(() => {
      console.log('====================================');
      console.log('hello');
      console.log('====================================');
      const MyVueElement = defineCustomElement({
        setup() {
          return () => {
            return h('div', { class: 'bbq' }, 'this is custom element')
          }
        },
        styles: ['.bbq { background: pink; }']
      });
      customElements.define('my-vue-element', MyVueElement)
      document.body.appendChild(
        new MyVueElement({})
      )
    })
    return {
      version,
    };
  },
};
</script>