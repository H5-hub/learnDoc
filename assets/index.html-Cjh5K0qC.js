import{_ as n,c as s,o as a,b as e}from"./app-C1q2MWlI.js";const i={},l=e(`<h2 id="电子签名组件" tabindex="-1"><a class="header-anchor" href="#电子签名组件"><span>电子签名组件</span></a></h2><p>Signature Pad 是一个用于在网页上绘制签名。</p><ol><li>使用npm安装Signature Pad 在项目中使用npm安装Signature Pad库。</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"> npm install signature_pad <span class="token operator">--</span>save</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>引入Signature Pad 在Vue中可以使用import关键字将Signature Pad引入进来。</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"> <span class="token keyword">import</span> SignaturePad <span class="token keyword">from</span> <span class="token string">&#39;signature_pad&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="3"><li>使用Signature Pad创建一个绘制区域 在Vue的模板中创建一个canvas元素，用于用户在上面签名。</li></ol><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>canvas<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>height<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>canvas</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Vue的script中，使用mounted方法获取canvas元素的引用，并将其传递给Signature Pad。</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line">import SignaturePad from &#39;signature_pad&#39;;</span>
<span class="line"></span>
<span class="line">export default {</span>
<span class="line">  name: &#39;Signature&#39;,</span>
<span class="line">  data() {</span>
<span class="line">    return {</span>
<span class="line">      width: 500,</span>
<span class="line">      height: 300</span>
<span class="line">    };</span>
<span class="line">  },</span>
<span class="line">  mounted() {</span>
<span class="line">    const canvas = this.$refs.canvas;</span>
<span class="line">    this.signaturePad = new SignaturePad(canvas);</span>
<span class="line">  }</span>
<span class="line">};</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>实现签名功能 Signature Pad提供了一系列方法，用于处理签名相关操作，如清空绘制区域，撤销上一步操作，导出签名图像等。</li></ol><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line">export default {</span>
<span class="line">  name: &#39;Signature&#39;,</span>
<span class="line">  ...</span>
<span class="line">  methods: {</span>
<span class="line">    // 清空绘制区域</span>
<span class="line">    clear() {</span>
<span class="line">      this.signaturePad.clear();</span>
<span class="line">    },</span>
<span class="line">    // 撤销上一步操作</span>
<span class="line">    undo() {</span>
<span class="line">      const data = this.signaturePad.toData();</span>
<span class="line">      if (data) {</span>
<span class="line">        data.pop();</span>
<span class="line">        this.signaturePad.fromData(data);</span>
<span class="line">      }</span>
<span class="line">    },</span>
<span class="line">    // 判断绘图区域是否为空</span>
<span class="line">    isEmpty() {</span>
<span class="line">      return this.signaturePad.isEmpty();</span>
<span class="line">    },</span>
<span class="line">    // 获取签名图像的base64编码</span>
<span class="line">    getDataUrl() {</span>
<span class="line">      return this.signaturePad.toDataURL();</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">};</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>导出签名图像 将签名图像保存到本地，将签名图像保存到本地文件中，可以使用HTML5中的标签的download属性实现下载功能。</li></ol><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line">export default {</span>
<span class="line">  name: &#39;Signature&#39;,</span>
<span class="line">  ...</span>
<span class="line">  methods: {</span>
<span class="line">    ...</span>
<span class="line">    // 下载签名图像</span>
<span class="line">    download() {</span>
<span class="line">      const link = document.createElement(&#39;a&#39;);</span>
<span class="line">      link.href = this.getDataUrl();</span>
<span class="line">      link.download = &#39;signature.png&#39;;</span>
<span class="line">      document.body.appendChild(link);</span>
<span class="line">      link.click();</span>
<span class="line">      document.body.removeChild(link);</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">};</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6.将签名图像上传到服务器 使用Axios库可以将签名图像上传到服务器。</p><ul><li>使用npm安装axios</li></ul><p><code>npm install axios --save</code></p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line"></span>
<span class="line">import axios from &#39;axios&#39;;</span>
<span class="line"></span>
<span class="line">export default {</span>
<span class="line">  name: &#39;Signature&#39;,</span>
<span class="line">  ...</span>
<span class="line">  methods: {</span>
<span class="line">    ...</span>
<span class="line">    // 将签名图像上传到服务器</span>
<span class="line">    upload() {</span>
<span class="line">      const dataUrl = this.getDataUrl();</span>
<span class="line">      const blob = this.dataURItoBlob(dataUrl);</span>
<span class="line">      const formData = new FormData();</span>
<span class="line">      formData.append(&#39;file&#39;, blob, &#39;signature.png&#39;);</span>
<span class="line"></span>
<span class="line">      axios.post(&#39;/api/upload&#39;, formData, {</span>
<span class="line">        headers: {</span>
<span class="line">          &#39;Content-Type&#39;: &#39;multipart/form-data&#39;</span>
<span class="line">        }</span>
<span class="line">      }).then(res =&gt;; {</span>
<span class="line">        console.log(res.data);</span>
<span class="line">      }).catch(err =&gt;; {</span>
<span class="line">        console.log(err);</span>
<span class="line">      });</span>
<span class="line">    },</span>
<span class="line">    ...</span>
<span class="line">  }</span>
<span class="line">};</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),p=[l];function t(d,c){return a(),s("div",null,p)}const u=n(i,[["render",t],["__file","index.html.vue"]]),v=JSON.parse('{"path":"/zh/advance/Signature/","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"电子签名组件","slug":"电子签名组件","link":"#电子签名组件","children":[]}],"git":{"contributors":[{"name":"zp","email":"1429033948@qq.com","commits":2}]},"filePathRelative":"zh/advance/Signature/index.md"}');export{u as comp,v as data};
