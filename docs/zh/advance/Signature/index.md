## 电子签名组件
Signature Pad 是一个用于在网页上绘制签名。
1. 使用npm安装Signature Pad 在项目中使用npm安装Signature Pad库。
``` js
 npm install signature_pad --save
```
2. 引入Signature Pad 在Vue中可以使用import关键字将Signature Pad引入进来。
``` js
 import SignaturePad from 'signature_pad';
```
3. 使用Signature Pad创建一个绘制区域 在Vue的模板中创建一个canvas元素，用于用户在上面签名。
``` vue
<template>
 <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
 </div>
</template>
```
在Vue的script中，使用mounted方法获取canvas元素的引用，并将其传递给Signature Pad。
``` vue
import SignaturePad from 'signature_pad';

export default {
  name: 'Signature',
  data() {
    return {
      width: 500,
      height: 300
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    this.signaturePad = new SignaturePad(canvas);
  }
};
```
4. 实现签名功能 Signature Pad提供了一系列方法，用于处理签名相关操作，如清空绘制区域，撤销上一步操作，导出签名图像等。
``` vue
export default {
  name: 'Signature',
  ...
  methods: {
    // 清空绘制区域
    clear() {
      this.signaturePad.clear();
    },
    // 撤销上一步操作
    undo() {
      const data = this.signaturePad.toData();
      if (data) {
        data.pop();
        this.signaturePad.fromData(data);
      }
    },
    // 判断绘图区域是否为空
    isEmpty() {
      return this.signaturePad.isEmpty();
    },
    // 获取签名图像的base64编码
    getDataUrl() {
      return this.signaturePad.toDataURL();
    }
  }
};
```
5. 导出签名图像 将签名图像保存到本地，将签名图像保存到本地文件中，可以使用HTML5中的标签的download属性实现下载功能。
```vue
export default {
  name: 'Signature',
  ...
  methods: {
    ...
    // 下载签名图像
    download() {
      const link = document.createElement('a');
      link.href = this.getDataUrl();
      link.download = 'signature.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
```
6.将签名图像上传到服务器 使用Axios库可以将签名图像上传到服务器。
- 使用npm安装axios

`npm install axios --save`
```vue

import axios from 'axios';

export default {
  name: 'Signature',
  ...
  methods: {
    ...
    // 将签名图像上传到服务器
    upload() {
      const dataUrl = this.getDataUrl();
      const blob = this.dataURItoBlob(dataUrl);
      const formData = new FormData();
      formData.append('file', blob, 'signature.png');

      axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res =>; {
        console.log(res.data);
      }).catch(err =>; {
        console.log(err);
      });
    },
    ...
  }
};
```