import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.provide('msg', 'hello world')
app.mount('#app')

