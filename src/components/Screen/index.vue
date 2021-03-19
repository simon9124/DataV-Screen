<template>
  <div class="screen">
    <!-- 左侧大屏 -->
    <div id="dragTemplate"
         ref="dragTemplate"
         :style="{'position':'relative',
                  'background':styleProps.background,
                  'width':screenWidthReal+'px',
                  'height':screenHeightReal+'px'}">
      <!-- @mouseup.prevent="mouseup" -->
    </div>
    <!-- 右侧面板 -->
    <Panel :style-props="styleProps"
           @attribute-update="attributeUpdate"></Panel>
  </div>
</template>

<script>
import Vue from "vue";
import Panel from '@/components/Panel' // 右侧面板

export default {
  components: {
    Panel
  },
  data () {
    return {
      styleProps: { // 面板表单数据
        background: '#070f20', // 画布背景
        width: 16, // 画布宽度比
        height: 10 // 画布高度比

      },
      screenWidthReal: 0, // 画布宽度
      screenHeightReal: 0, // 画布高度
    };
  },
  mounted () {
    // 计算画布宽高
    this.computedScreenSize()
    // 屏幕缩放
    window.onresize = () => {
      return (() => {
        this.$nextTick(() => {
          this.computedScreenSize()
        });
      })();
    };
    // 插入元素
    this.$bus.$on('insert-component', componentName => {
      this.$nextTick(() => {
        /* 1.插入元素 */
        var TableComponent = Vue.extend(require('@/components/Elements').default);
        var component = new TableComponent({
          propsData: {
            componentName: componentName
          }
        }).$mount()
        // console.log(component);
        var dom = this.$refs.dragTemplate
        dom.appendChild(component.$el);
        /* 2.默认点击一次画布，确保menu再次点击能够打开 */
        this.$refs.dragTemplate.click()
        /* 3.自动点击插入的元素：① 触发右侧面板更新 ② 关闭二级菜单 */
        component.click()
      })
    })
  },
  methods: {
    mouseup () {
    },
    // 计算画布宽高
    computedScreenSize () {
      const screenWidthMax = document.documentElement.clientWidth - 80 - 15 - 380 // 画布最大宽度
      const screenHeightMax = document.documentElement.clientHeight - 48 - 15 * 2 // 画布最大高度
      // console.log(screenHeightMax);
      // console.log(screenWidthMax);
      if (screenWidthMax * (this.styleProps.height / this.styleProps.width) <= screenHeightMax) {
        this.screenWidthReal = screenWidthMax
        this.screenHeightReal = screenWidthMax * (this.styleProps.height / this.styleProps.width)
      } else {
        this.screenHeightReal = screenHeightMax
        this.screenWidthReal = screenHeightMax / (this.styleProps.height / this.styleProps.width)
      }
    },
    // 属性面板更新 - 子组件传来事件
    attributeUpdate (style) {
      // console.log(style);
      this.styleProps = style
      this.computedScreenSize()
    }
  },
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
