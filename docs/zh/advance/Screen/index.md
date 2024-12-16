## 可视化大屏适配组件（cs3 scal方案）

1. 组件代码
<details>
<summary>折叠代码块</summary>

``` vue
<template>
  <div
    class="ScreenAdapter"
    :style="style"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: '',
  //参数注入
  props: {
    width: {
      type: String,
      default: '1920' 
    },
    height: {
      type: String,
      default: '1080' 
    }
  },
  data() {
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        transform: 'scale(1) translate(-50%, -50%)'
      }
    }
  },
  mounted() {
    this.setScale()
    window.onresize = this.Debounce(this.setScale, 1000)
  },
  methods: {
    Debounce: (fn, t) => {
      const delay = t || 500
      let timer
      return function() {
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        const context = this
        timer = setTimeout(() => {
          timer = null
          fn.apply(context, args)
        }, delay)
      }
    },
    // 获取放大缩小比例
    getScale() {
      const w = window.innerWidth / this.width
      const h = window.innerHeight / this.height
      return w < h ? w : h
    },
    // 设置比例
    setScale() {
      this.style.transform = 'scale(' + this.getScale() + ') translate(-50%, -50%)'
      console.log('任你千变万化,我都不会影响性能')
    }
  }
}
</script>
<style lang="scss" scoped>
.ScreenAdapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  background: red;
}
</style>

```
</details>


2. 使用 将此组件作为外壳，包在我们搭建的页面上
`<ScreenAdapter> <div>大屏展示页面</div> </ScreenAdapter>`

3. 定义网页规范
* 根据美工给出的设计（主要获取美工给出的分辨率，如1920*1080）。
* Div布局多采用flex+百分比布局（当然也可以根据美工给出的设计，默认写px。）。
* 各类空间设计，根据美工给出的px进行定义即可