import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  base: '/learnDoc/',
  lang: 'zh-CN',
  title: 'Echo',
  description: 'My first VuePress Site',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.png' }]
  ],
  theme: defaultTheme({
    logo: 'https://postimage.me/images/2024/08/06/cartoon-.png',

    navbar: [
      { text: '首页', link: '/', },
      { text: '文档', link: '/guide/', }
    ],
  }),

  bundler: viteBundler(),
})
