## 使用 Vite 构建新项目及其应用案例文档
Vite 是一个现代化的构建工具，旨在提供更快的开发体验，尤其是在现代 JavaScript 应用的构建过程中。Vite 的出现是为了应对传统构建工具（如 Webpack）的一些瓶颈，特别是在开发过程中构建速度慢和性能瓶颈的问题。Vite 借助浏览器原生支持的 ES 模块 (ESM) 来加速构建和热更新（HMR），从而提升了开发体验和效率。

1. Vite 的特点和优势
Vite 的核心特点：

- 极速启动：通过浏览器原生支持 ES 模块，Vite 跳过了传统的打包过程，采用“按需编译”的方式，大大加速了项目启动速度。
- 即时热更新 (HMR)：Vite 提供了极速的热模块替换 (HMR) 支持，无需刷新浏览器即可实时查看修改效果。
- 现代化构建：Vite 默认使用 ESBuild 作为构建工具，ESBuild 是一个非常快速的构建工具，比传统的 Webpack 更加高效。
- 预构建：Vite 自动优化依赖，将第三方库（如Vue、React）在开发时进行预构建，避免每次都从头构建这些依赖。
- 支持多种框架：Vite 支持 Vue、React、Svelte 等多种流行前端框架的开发，且对 TypeScript 支持良好。

2. 创建 Vite 项目
- 安装 Vite 并创建项目
::: tip 兼容性注意
Vite 需要 [Node.js](https://nodejs.org/en/) 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。
:::

使用 NPM:

```bash
$ npm create vite@latest
```
然后按照提示操作即可

可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:

```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+
npm create vite@latest my-vue-app -- --template vue
```
查看 [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) 以获取每个模板的更多细节：`vue`。

- 进入项目目录并安装依赖
执行以下命令进入创建的项目目录，并安装所有依赖：

使用 npm：
```bash
$ cd my-vue-app
$ npm install
```
- 启动开发服务器

```bash
$ npm run dev
```