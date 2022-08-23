import { createSSRApp, h, ref } from 'vue'
import App from './App.vue'
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp(App)

app.use({
    install(bpp) {
        bpp.provide('msg', 'hello world')
        bpp.component('MyComponent', {
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
app.use({
    install(bbq) {
        bbq.config.errorHandler = (err, instance, info) => {
            // err: 抛出错误; instance: 出现错误的实例; info: 错误信息;
            console.log('this is errorHandler', err, instance, info);
        }
        
        bbq.config.warnHandler = (msg, instance, trace) => {
            // `trace` is the component hierarchy trace
            console.log('this is warnHandler',msg, instance, trace);
        }

        // 开启特殊的性能优化标记
        bbq.config.performance = true

        // 配合 vite.config.js 配置 compilerOptions, 可以使 bbq-a 失效
        bbq.component('bbq-a', {
            render() {
                return h('div', { class: 'bbq' }, '两只🐯在💃，小🐰乖乖拔萝卜; is-custom-bbq')
            }
        })

        bbq.config.globalProperties.gpVal = "this value by globalProperties"

        bbq.config.optionMergeStrategies.computed = (parent, child) => {
            return {
                msgBbq() {
                    return parent.msgBbq() + child.msgBbq()
                }
            }
        }

        bbq.mixin({
            computed: {
                msgBbq() {
                    return 'this value bug minxin'
                }
            },
        })

    }
})
app.mount('#app');
(async () => {
    const html = await renderToString(app)
    console.log(html)
})()
