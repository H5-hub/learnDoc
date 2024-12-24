  ## 自定义进度条组件 
  ProgressBar 是一个简单的进度条组件，用于显示某个过程的进度
  * 组件代码
  ```vue
  <template>
    <div class="progress-bar" :style="{ width: percentage + '%' }">
      <div class="progress-bar__inner" :style="{ background: color }">
        <span class="progress-bar__label">{{ percentage }}%</span>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'ProgressBar',
    props: {
      percentage: {
        type: Number,
        required: true,
        validator: value => value >= 0 && value <= 100
      },
      color: {
        type: String,
        default: '#4caf50'
      }
    }
  }
  </script>

  <style scoped>
  .progress-bar {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .progress-bar__inner {
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    font-weight: bold;
    transition: width 0.3s ease;
  }

  .progress-bar__label {
    width: 100%;
  }
  </style>
  ```
  ### 使用示例
  ```vue
  <template>
    <div>
      <ProgressBar :percentage="progress" color="#ff0000" />
      <button @click="increaseProgress">Increase Progress</button>
    </div>
  </template>

  <script>
  import ProgressBar from './ProgressBar.vue';

  export default {
    components: {
      ProgressBar
    },
    data() {
      return {
        progress: 0
      };
    },
    methods: {
      increaseProgress() {
        if (this.progress < 100) {
          this.progress += 10;
        }
      }
    }
  }
  </script>
  ```
  ### 使用说明
  * 引入 ProgressBar 组件到你的 Vue 组件中。
  * 使用 percentage prop 来设置进度条的百分比值。
  * 可选项，使用 color prop 来设置进度条的颜色。

