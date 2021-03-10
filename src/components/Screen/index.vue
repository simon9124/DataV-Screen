<template>
  <div class="screen">
    <div id="dragTemplate"
         ref="dragTemplate"
         style="position:relative"
         @mouseup.prevent="mouseup">
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data () {
    return {

    };
  },
  mounted () {
    this.$bus.$on('insert-component', component => {
      switch (component) {
        case '轮播表':
          this.$nextTick(() => {
            var TableComponent = Vue.extend(require('@/components/Elements/table').default);
            var component = new TableComponent().$mount()
            // console.log(component);
            var dom = this.$refs.dragTemplate
            dom.appendChild(component.$el);
            this.$refs.dragTemplate.click() // 点击界面，触发App.vue的menuClose事件
          })
          break;
        case 'pie':
          break;
        case 'block':
          break;
        case 'text':
          break;
        default:
          break;
      }
    })
  },
  methods: {
    mouseup () {
      // console.log('1');
    }
  },
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
