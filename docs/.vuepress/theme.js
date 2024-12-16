import { defaultTheme } from '@vuepress/theme-default'
import { navbar,sidebar } from "./configs/index.js"
export default defaultTheme({
    logo: 'https://postimage.me/images/2024/08/06/cartoon-.png',
    // colorMode: 'light', //浅色模式，默认auto，还有dark
    //多国语言切换
    // locales: {
    //     '/': {
    //         selectLanguageName: '简体中文',
    //         selectLanguageText: '选择语言',
    //     },
    //     '/en/': {
    //         selectLanguageName: 'English',
    //         selectLanguageText: 'Language',
    //     },
    // },
    navbar,
    sidebar,

    lastUpdated: true, //开启上次更新
    lastUpdatedText: '上次更新', //修改显示更新的标题

    // 默认Github格式：用户名/仓库名
    repo: 'https://github.com/H5-hub/learnDoc',

    //默认:Edit this page，修改显示文字
    editLinkText: '在 GitHub 上编辑此页',

    prev: '上一页', //修改上一页显示标题
    next: '下一页', //修改下一页显示标题
})