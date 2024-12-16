## H5移动端图片上传组件
在使用 Vant 4 的 Uploader 组件通过 FormData 进行多选文件上传时，控制文件上传的大小，记录每次上传返回的数据，并且在界面上展示上传进度和结果。
部分手机在拍照上传时会出现图片被旋转 90 度的问题，这个问题可以通过 compressorjs 或其他开源库进行处理。
compressorjs 是一个用于浏览器端的 JavaScript 开源的图片处理库，，它可以帮助开发者轻松地压缩图片文件。这个库的主要目的是在上传图片之前对其进行压缩，以减少文件大小并提高上传速度，同时尽量保持图像质量，并提供图片旋转的功能。
* 代码如下：
``` vue
<template>
  <van-uploader
    v-model:file-list="fileList"
    :after-read="handleAfterRead"
    multiple
    accept="image/*"
    max-count="3"
    :max-size="mediaOverSize * 1024 * 1024"
    @oversize="onOversize"
  >
    <template #default>
      <div class="my-upload">
        <img src="@images/ic_upload.png" alt="" />
        <div>点击上传</div>
      </div>
    </template>
  </van-uploader>
</template>

<script setup>
  import { ref } from 'vue';
  import { Uploader, Toast } from 'vant';
  import axios from 'axios';

  const fileList = ref([]);
  // 限制文件上传大小
  const mediaOverSize = 3;

  // 当文件被读取后调用此函数
  const handleAfterRead = async file => {
    // 如果是一次多张上传
    if (Array.isArray(file)) {
      file.forEach(item => {
      	item.file = await compressImage(item.file);
        queryUploadFile(item);
      });
    } else {
      // 单文件上传
      file.file = await compressImage(file.file);
      queryUploadFile(file);
    }
  };

  // 压缩图片并将图片修正
  const compressImage = async file => {
    if (!file) {
      return;
    }
    return new Promise((reslove, reject) => {
      // compressorjs 默认开启 checkOrientation 选项
      // 会将图片修正为正确方向
      new Compressor(file, {
        quality: 0.6, // 设置压缩质量，范围从 0 到 1，默认0.8
        maxWidth: 1000,
        maxHeight: 1000,
        convertSize: 1000000,
        checkOrientation: true, // 启用 EXIF 方向修正
        success(result) {
          const compressedImage = new File([result], result.name, { type: result.type });
          reslove(compressedImage);
        },
        error(err) {
          reject(err.message);
        },
      });
    });
  };

  // 图片上传
  const queryUploadFile = async file => {
    file.status = 'uploading'; // 显示上传状态

    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('file', file.file);

    // 发起上传请求
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 更新文件列表中的文件状态和返回数据
      updateFileStatus(file, 'success', response.data);
      Toast.success('文件上传成功');
    } catch (error) {
      updateFileStatus(file, 'fail', error.response?.data || error);
      Toast.fail('文件上传失败');
      console.error('文件上传失败:', error);
    }
  };

  // 更新文件状态和返回数据
  const updateFileStatus = (file, status, data) => {
    file.status = status;
    file.data = data;
  };

  // 获取文件上传的状态
  const getFileStatus = file => {
    return file.status || 'pending';
  };

  // 获取文件上传的返回数据
  const getUploadData = file => {
    return file.data || {};
  };

  const onOversize = () => {
    Toast.fail(`文件大小不能超过${mediaOverSize}MB`);
  };
</script>

<style scoped>
  /* 样式可以根据需要进行调整 */
</style>
```
### 解释
1. 引入组件：引入了 Uploader、Toast 组件。

2. 模板部分：
  * 使用 van-uploader 组件来实现文件上传。
  * v-model:file-list="fileList"：绑定文件列表。
  * multiple：允许选择多个文件。
  * accept="image/*"：限制只能上传图片。
  * max-count="3"：限制最多上传 3 个文件。
  * after-read：当文件被读取后调用的方法。
  * max-size：限制上传图片的大小。

3. 脚本部分：
* fileList：一个响应式的数组，用于存储上传的文件信息。
* handleAfterRead：当文件被读取后调用的方法。在这个方法中，我们创建了一个 FormData 对象，并将文件追加到 FormData 中，然后使用 Axios 发起 POST 请求上传文件并设置请求头。根据服务器返回的结果更新文件的状态，并使用 Toast 组件显示上传结果。
* compressImage: 压缩图片并将图片修正。
* queryUploadFile: 将压缩之后的图片上传到服务器。
* updateFileStatus：更新文件的状态和返回的数据。
* getFileStatus：获取文件的当前状态。
* getUploadData：获取文件上传的返回数据。
