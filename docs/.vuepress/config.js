import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import theme from './theme'
export default defineUserConfig({
  base: '/learnDoc/',
  lang: 'zh-CN',
  title: 'Echo',
  description: 'My first VuePress Site',
  //========logo路径========//
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.png' }]
  ],
  //========站点语言配置========//
  // locales: {
  //   //默认语言可以使用 '/' 作为其路径。
  //   '/': {
  //     lang: 'zh-CN',
  //     title: 'VuePress',
  //     description: 'Vue 驱动的静态网站生成器',
  //   },
  //   '/en/': {
  //     lang: 'en-US',
  //     title: 'VuePress',
  //     description: 'Vue-powered Static Site Generator',
  //   },
  // },
  theme,
  bundler: viteBundler(),
})
