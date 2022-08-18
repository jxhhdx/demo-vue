import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

setTimeout(() => {
    console.log('unmount');
    app.unmount();
}, 5000)