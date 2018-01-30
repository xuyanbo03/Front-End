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
    - 默认1rem=16px
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
  