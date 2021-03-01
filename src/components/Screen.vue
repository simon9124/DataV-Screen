<template>
  <div id="dragTemplate"
       ref="dragTemplate">
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
        case 'table':
          this.$nextTick(() => {
            var TableComponent = Vue.extend(require('./table').default);
            var component = new TableComponent().$mount()
            // console.log(component);
            var dom = this.$refs.dragTemplate
            dom.appendChild(component.$el);
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
  },
};
</script>

<style scoped lang="scss">
/*被拖拽对象的样式*/
.item {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
/* 生成的内容 */
.content {
  cursor: pointer;
}
</style>
