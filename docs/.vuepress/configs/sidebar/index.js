export const sidebar =
// [
//     //多组侧边栏
//     {
//         text: '指南',
//         prefix: '/guide/', //前缀路径
//         link: './guide',//前缀路径是否添加链接
//         collapsible: true, //折叠开关
//         children: [
//             '/guide/',
//             '/guide/getting-started',
//             '/guide/configuration',
//             '/guide/page',
//             {
//                 //包含远程链接
//                 text: 'github',
//                 link: 'https://github.com',
//             },
//         ],
//     },
//     {
//         //单独远程链接
//         text: 'github',
//         link: 'https://github.com',
//     },
// ]
{
    '/zh/guide/': [],
    '/zh/advance/': [
        { text: 'MarkDown', link: 'markdown/' },
        { text: '大屏适配', link: 'Screen/index.md' },
        { text: 'H5移动端图片上传', link: 'UpLoad/index.md' },
        { text: '电子签名', link: 'Signature/index.md' },
    ]
}

