import { createApp, h } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use({
    install(bpp) {
        bpp.provide('msg', 'hello world')
        bpp.component('MyComponent', {
            template: `<div>两只🐯在💃</div>`,
            render() {
                return h('div', { class: 'bbq' }, '两只🐯在💃，小🐰乖乖拔萝卜')
            }
        })
        bpp.directive('bbq', {
            mounted(el, binding, vnode, prevVnode) {
                console.log(binding.instance, vnode, prevVnode);
            }
        })
        bpp.mixin({
            computed: {
                getValueByMixin() {
                    return `this value by mixin: VueVersion-${app.version}`
                }
            }
        })
    }
})
app.mount('#app')

