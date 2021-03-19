<template>
  <div>

    <!-- 一级菜单 -->
    <Menu :active-name="activeName"
          theme="dark"
          width="auto"
          accordion
          @on-select="menuSelect">

      <MenuItem v-for="(menu,i) in  menus"
                :key="'menu_'+i"
                :name="menu.name"
                ref="menuItem">
      <Icon :type="menu.type"></Icon>
      <span>{{menu.title}}</span>
      </MenuItem>

    </Menu>

    <!-- 二级菜单 -->
    <div v-if="menuSecondVisible"
         :style="{top:menuSecondTop}"
         class="menu-second menu2">
      <Row :gutter="16"
           class="menu2">
        <Col v-for="(item, i) in menuSecondList"
             :key="i"
             span="8"
             class="menu2">
        <draggable v-model="menus"
                   chosenClass="chosen"
                   forceFallback="true"
                   group="menu"
                   :move="onMove"
                   @end="onEnd(item)">
          <transition-group>
            <div class='block'
                 :key="item.title">
            </div>
          </transition-group>
        </draggable>
        <p class="menu2">{{item.title}}</p>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import menus from './data'

export default {
  components: { draggable },
  name: 'SideMenu',
  data () {
    return {
      /* 一级菜单 */
      menus: menus, // 菜单内容
      activeName: '-1',
      /* 二级菜单 */
      menuSecondList: [], // 菜单内容列表
      menuSecondVisible: false, // 是否显示
      menuSecondTop: '', // 距离顶部的动态高度
    }
  },
  mounted () {
    // 接收兄弟组件事件：关闭二级菜单
    this.$bus.$on('menu-close', () => {
      this.$nextTick(() => {
        this.menuClose()
      })
    })
  },
  methods: {
    // 选中一级菜单
    menuSelect (name) {
      this.menuSecondList = this.menus[name].list
      this.menuSecondTop = name * 70 + 35 + 'px'
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
    onEnd (item) {
      this.$bus.$emit('insert-component', item.title)
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './index.scss';
</style>
