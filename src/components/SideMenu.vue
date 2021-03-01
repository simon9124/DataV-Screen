<template>
  <div>
    <Menu active-name="0"
          theme="dark"
          width="auto">
      <draggable v-model="menus"
                 chosenClass="chosen"
                 forceFallback="true"
                 group="menu"
                 :move="onMove"
                 @end="onEnd">
        <transition-group>
          <MenuItem v-for="(menu,i) in  menus"
                    :key="'menu_'+i"
                    :name="menu.name">
          <Icon :type="menu.type"></Icon>
          <span>{{menu.title}}</span>
          </MenuItem>
        </transition-group>
      </draggable>

    </Menu>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  name: 'SideMenu',
  data () {
    return {
      menus: [ // 一级菜单栏
        { name: '1', type: 'ios-navigate', title: 'table' },
        { name: '2', type: 'ios-search', title: 'pie' },
        { name: '3', type: 'ios-settings', title: 'text' },
      ]
    }
  },
  methods: {
    //开始拖拽事件
    onMove () {
      return false
    },
    //拖拽结束事件
    onEnd (e) {
      // console.log(e);
      // console.log(e.item.innerText);
      this.$bus.$emit('insert-component', e.item.innerText)
      // switch (e.item.innerText) {
      //   case 'table':
      //     this.$nextTick(() => {
      //       var TableComponent = Vue.extend(require('./table').default);
      //       var component = new TableComponent().$mount()
      //       // console.log(component);
      //       var dom = this.$refs.dragTemplate
      //       dom.appendChild(component.$el);
      //     })
      //     break;
      //   case 'pie':
      //     break;
      //   case 'block':
      //     break;
      //   case 'text':
      //     break;
      //   default:
      //     break;
      // }
    },
  },
}
</script>

<style scoped lang="scss">
</style>
