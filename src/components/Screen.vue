<template>
  <div id="dragTemplate"
       ref="dragTemplate"
       style="position:relative"
       @mouseup.prevent="mouseup">
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
          // this.$nextTick(() => {
          //   var TableComponent = Vue.extend(require('./table').default);
          //   var component = new TableComponent().$mount()
          //   // console.log(component);
          //   var dom = this.$refs.dragTemplate
          //   dom.appendChild(component.$el);
          // })
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
#dragTemplate {
  height: 100%;
}
</style>
