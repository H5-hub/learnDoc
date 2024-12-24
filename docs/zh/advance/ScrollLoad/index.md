## 滚动加载组件
是一个用于实现滚动加载功能的 Vue 组件，可以在数据较多时通过滚动触发加载更多数据的操作。该组件支持自定义滚动容器大小、加载提示内容和加载数据的方式，适用于需要分页加载的场景
* 组件代码：
```vue
<template>
  <div
    class="scroll-container"
    @scroll="onScroll"
    ref="scrollContainer"
    :style="{ height: containerHeight }"
  >
    <slot></slot>
    <!-- 插槽，用于传递内容 -->
    <div v-if="loading" class="loading">
      <slot name="loading">加载中...</slot>
      <!-- 默认插槽，可以定制加载提示 -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 每次加载的数据条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 容器的高度
    containerHeight: {
      type: String,
      default: "400px",
    },
    // 是否有更多数据
    hasMore: {
      type: Boolean,
      default: true,
    },
    // 用于加载数据的函数
    loadData: {
      type: Function,
      required: true,
    },
    // 控制是否显示加载提示
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: 1, // 当前页数
      internalHasMore: this.hasMore, // 内部控制是否有更多数据
    };
  },
  watch: {
    hasMore(newValue) {
      this.internalHasMore = newValue;
    },
  },
  methods: {
    // 滚动事件处理函数
    onScroll() {
      const container = this.$refs.scrollContainer;

      // 判断是否滚动到底部
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 50
      ) {
        if (!this.loading && this.internalHasMore) {
          this.loadMoreData();
        }
      }
    },

    // 加载更多数据
    loadMoreData() {
      this.$emit("load-more"); // 通知父组件加载数据
    },
  },
};
</script>

<style scoped>
.scroll-container {
  overflow-y: auto;
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
}

.loading {
  text-align: center;
  padding: 10px;
  color: #888;
}
</style>
```
### 使用示例：
```vue
<template>
  <div>
    <InfiniteScroll 
      :loadData="loadData" 
      :hasMore="hasMore" 
      :loading="loading" 
      @load-more="loadMore"
      containerHeight="500px"
      pageSize="10"
    >
      <div v-for="item in items" :key="item.id" class="item">
        {{ item.name }}
      </div>
    </InfiniteScroll>
  </div>
</template>

<script>
import InfiniteScroll from './components/InfiniteScroll.vue';

export default {
  components: {
    InfiniteScroll
  },
  data() {
    return {
      items: [], // 存储加载的条目
      loading: false, // 控制加载状态
      hasMore: true, // 是否有更多数据
      page: 1, // 当前页数
      pageSize: 10, // 每页的大小
    };
  },
  methods: {
    // 加载数据函数
    loadData() {
      this.loading = true;
      
      // 模拟 API 请求
      setTimeout(() => {
        const newItems = Array.from({ length: this.pageSize }, (_, index) => ({
          id: (this.page - 1) * this.pageSize + index + 1,
          name: `Item ${(this.page - 1) * this.pageSize + index + 1}`
        }));
        
        // 加载更多数据
        this.items.push(...newItems);
        
        // 模拟判断是否还有更多数据
        if (newItems.length < this.pageSize) {
          this.hasMore = false;
        }

        this.loading = false;
        this.page += 1;
      }, 1000); // 模拟请求延迟
    },

    // 当触发加载更多时，执行
    loadMore() {
      this.loadData();
    }
  },
  mounted() {
    // 初次加载
    this.loadData();
  }
};
</script>

```
* loadData 方法：模拟了加载数据的过程，使用 setTimeout 模拟了一个异步请求。实际开发中，应该替换为真实的 API 请求。
* loadMore 方法：通过 @load-more 事件触发，调用父组件的 loadData 方法，加载更多数据。
* hasMore 和 loading：父组件控制是否有更多数据加载，和加载状态。
