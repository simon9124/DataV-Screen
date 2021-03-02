<template>
  <div>

    <!-- 一级菜单 -->
    <Menu :active-name="activeName"
          theme="dark"
          width="auto"
          @on-select="menuSelect">
      <!-- <draggable v-model="menus"
                 chosenClass="chosen"
                 forceFallback="true"
                 group="menu"
                 :move="onMove"
                 @end="onEnd">
        <transition-group> -->
      <MenuItem v-for="(menu,i) in  menus"
                :key="'menu_'+i"
                :name="menu.name">
      <Icon :type="menu.type"></Icon>
      <span>{{menu.title}}</span>
      </MenuItem>
      <!-- </transition-group>
      </draggable> -->
    </Menu>

    <!-- 二级菜单 -->
    <div v-if="menuSecondVisible"
         :style="{top:menuSecondTop}"
         class="menu-second">
      <Row :gutter="10">
        <Col v-for="(item, i) in menuSecondList"
             :key="i"
             span="8">
        <div class='block'>
        </div>
        <p>{{item.title}}</p>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import menus from './data'

export default {
  // components: { draggable },
  name: 'SideMenu',
  data () {
    return {
      /* 一级菜单 */
      menus: menus, // 菜单内容
      activeName: '-1', // 默认选中的菜单
      /* 二级菜单 */
      menuSecondList: [], // 菜单内容
      menuSecondVisible: false, // 是否显示
      menuSecondTop: '', // 距离顶部的动态高度
    }
  },
  methods: {
    // 选中一级菜单
    menuSelect (name) {
      this.menuSecondList = this.menus[name].list
      this.menuSecondTop = name * 70 + 25 + 'px'
      this.menuSecondVisible = true
    },
    // 关闭二级菜单
    menuClose () {
      this.menuSecondVisible = false
    },
    // 开始拖拽事件
    onMove () {
      return false
    },
    // 拖拽结束事件
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

<style rel="stylesheet/scss" lang="scss" scoped>
.layout {
  // 左侧side-bar
  .ivu-layout-sider {
    background: #202020;
    // 一级菜单
    .ivu-menu {
      background: #202020;
      position: relative;
      &-item {
        padding: 10px;
        height: 70px;
        text-align: center;
        i {
          margin: 0;
          font-size: 30px;
        }
        span {
          display: block;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
    // 二级菜单
    .menu-second {
      width: 260px;
      height: 300px;
      background: #2e2e2e;
      position: absolute;
      left: 80px;
      color: #fff;
      padding: 15px 20px;
      text-align: center;
      .block {
        height: 50px;
        background: #bdbdbd;
      }
      p {
        font-size: 12px;
        color: #bdbdbd;
      }
    }
  }
}
</style>
