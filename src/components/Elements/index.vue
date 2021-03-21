<template>
  <div @mousedown="dragComponent"
       @click.stop="click"
       ref="component"
       class="component">

    <dv-scroll-board v-if="componentName==='轮播表'"
                     ref="element"></dv-scroll-board>
    <dv-scroll-ranking-board v-if="componentName==='排名轮播表'"
                             ref="element">排名轮播表</dv-scroll-ranking-board>

  </div>
</template>

<script>
// components
import dvScrollBoard from './dv-scroll-board' // 轮播表
import dvScrollRankingBoard from './dv-scroll-ranking-board' // 排名轮播表

export default {
  components: { dvScrollBoard, dvScrollRankingBoard },
  props: {
    // 插入的组件名
    componentName: {
      type: String
    }
  },
  data () {
    return {}
  },
  methods: {
    // 点击组件
    click () {
      // console.log(this.$refs.element);
      this.$bus.$emit('menu-close') // 传递事件给兄弟组件：关闭二级菜单
      this.$bus.$emit('click-component', { // 传递事件给兄弟组件：更新右侧面板
        componentName: this.componentName,
        data: this.$refs.element.$data,
        uid: this.$refs.element._uid
      })
    },
    // 自由拖拽
    dragComponent (e) {
      let odiv = this.$refs.component // 获取目标元素
      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => { // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        // 移动当前元素
        odiv.style.left = left + 'px';
        odiv.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component {
  position: absolute;
  box-sizing: content-box;
  cursor: move;
  &:hover {
    border: 1px solid #5cadff;
    border-style: dashed;
  }
}
</style>