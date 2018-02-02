# HTML
- meta设置
- IE兼容性
- HTML5语义化标签
- 中间用div.container
- 使用section包装块，没有标题的用div
- html outline生成html大纲

# CSS
- CSS resets vs normalize.css
- px,em,rem
  - px对应像素点
  - em相对长度单位
    - em相对参照物为父元素的font-size
    - em具有继承的特点
    - 默认em=16px
    - 容易混乱
  - rem相对长度单位
    - rem的相对参照物为根元素html，相对参照固定不变
    - 浏览器默认1rem=16px
    - 相对html 1rem=10px
- 工具样式
  - 浮动导致高度塌陷：清除浮动
    - 原理：只要触发了BFC（块级作用域上下文）就可以清除浮动
    1.闭合浮动，添加div，加个clear:both（违背表现与样式分离）
    2.container设置overflow:auto
    3.父元素同时浮动，设置float:left（影响布局）
    4.使用CSS的伪元素：:after，使用display:table;clear: both;content: " ";即可
    5..clearfix:before也设置content: " ";display: table;,防止margin属性的叠加
- 页面样式
  - ul,li之间的空白间隙解决技巧
    1.li都写在同一行
    2.ul的font-size设置为0，li的font-size设置正常（有副作用）
    3.不闭合li标签
    4.设置负边距
  - css spirit雪碧图

# CSS选择器
- 基本选择器
  - *
  - E
  - .class
  - #id
  - E F
  - E > F
  - E + F
  - E ~ F
- 属性选择器
  - E[attr]
  - E[attr="value"]
  - E[attr^="value"]
  - E[attr$="value"]
  - E[attr*="value"]
  - E[attr~="value"]
  - E[attr|="value"]
- 伪类和伪元素
  - :link,:visited,:hover,:active,:focus
  - :enabled,:disabled,:checked
  - :first-child,:last-child,:nth-child(),:nth-last-child(),:only-child
  - :first-of-type,:last-of-type,:nth-of-type(),:nth-last-of-type(),:only-of-type
  - :empty
  - :not()
  - :first-line,:first-letter,:before,:after

# 移动端适配
- 媒体查询@media
- 使用媒体查询注意相对于浏览器默认宽度：1rem=16px
- 推荐使用em,不使用rem
- 表单进行响应式布局
  - 隐藏表格中不重要的列
  - 行列转置等方法
  - 把表格的项做成表单的形式展示
- 打印样式

# 轮播图实现
- 原理
  - js修改图片的left值
  - css动画
  - 淡入淡出：js修改透明度或者css过渡动画
- 一个好的广告滚动组件支持
  - 支持不同的图片数量
  - 支持响应式布局
  - 具有良好的兼容性
- 怎么挑选第三方组件
  - 使用人数
  - 是否开源
  - 文档是否齐全
  - 活跃性
  - 小巧够用（轻量级）
- 响应式图片：加载与用户设备相匹配的小图片，即快速，又不会影响用户的体验
- 实现
  - js或服务端（兼容性好，但是强耦合）
  - srcset属性（浏览器自己选择）
  - srcset配合sizes（可设置媒体查询）
    <img class="image" src="img/1.jpg" srcset="img/400.jpg 400w,img/800.jpg 800w" sizes="100vw">
  - picture (更多自主权)
    <picture>
      <source media="(max-width:36em)" srcset="img/s.jpg 768w" />
      <source srcset="img/s.jpg 1800w" />
      <img class="image" src="img/s.jpg">
    </picture>
  - svg(可缩放矢量图片)

# 兼容
> Modernizr：检测用户浏览器HTML5和CSS3特性的JavaScript库
- html5:ployfill解决浏览器支持
- CSS3:normalize.css重置浏览器默认样式

# Gulp打包
