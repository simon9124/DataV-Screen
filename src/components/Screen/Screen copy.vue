<template>
  <div>
    <Row :gutter="20">
      <Col :span="8">
      <draggable v-model="myArray"
                 chosenClass="chosen"
                 forceFallback="true"
                 group="people"
                 :move="onMove"
                 @end="onEnd">
        <transition-group>
          <div class="item"
               v-for="element in myArray"
               :key="element.id">{{element.name}}</div>
        </transition-group>
      </draggable>
      </Col>

      <Col :span="16">
      <div style="border:1px solid #000;height:300px"
           id="dragTemplate"
           ref="dragTemplate"></div>
      </Col>
    </Row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Vue from "vue/dist/vue.esm.js";

export default {
  components: {
    draggable,
  },
  data () {
    return {
      //定义要被拖拽对象的数组
      myArray: [
        { people: 'cn', id: 1, name: 'table' },
        { people: 'cn', id: 2, name: 'pie' },
        { people: 'cn', id: 3, name: 'block' },
        { people: 'us', id: 4, name: 'text' }
      ]
    };
  },
  methods: {
    //开始拖拽事件
    onMove () {
      return false
    },
    //拖拽结束事件
    onEnd (e) {
      // console.log(e);
      console.log(e.item.innerText);
      switch (e.item.innerText) {
        case 'table':
          console.log(this.$refs.dragTemplate);
          var Profile = Vue.extend({
            template: "<div id='dragTemplate'>" + 'text' + "</div>"
          });
          new Profile().$mount("#dragTemplate");
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
    },
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
</style>
