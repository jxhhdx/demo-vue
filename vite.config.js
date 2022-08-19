import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith('bbq');
          },
          // whitespace 设置为 preserve 会存在空格
          whitespace: 'preserve',
          // 自定义分割符, 如果进行如下设置，正常写法为 "{{ original.count }}" 要改写为 "start-bbq original.count end-bbq"
          // delimiters: ['start-bbq', 'end-bbq']
          // comments: false,
        },
      }
    })
  ],
})
