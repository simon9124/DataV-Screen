<template>
  <div id="app"
       class="layout"
       @click="menuClose">
    <Layout>
      <Header style="height:48px;background:#2e2e2e"></Header>
      <Layout>
        <Sider hide-trigger>
          <side-menu ref="sideMenu"></side-menu>
        </Sider>
        <Content style="background:#fff;height:calc(100vh)">
          <screen ref="screen"></screen>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu'
import Screen from './components/Screen/index.vue'

export default {
  name: 'App',
  components: {
    SideMenu,
    Screen
  },
  methods: {
    // 点击界面任意部位，调用子组件事件关闭二级菜单 - 阻止冒泡
    menuClose (e) {
      // console.log(e);
      // console.log(e.target.className);
      if (
        e.target.className.indexOf('menu2') === -1 &&
        this.$refs.sideMenu.$data.menuSecondVisible === true
      ) { // 如果点击的不是二级菜单或其内部内容，且二级菜单已打开 -> 关闭二级菜单
        this.$refs.sideMenu.menuClose()
      } else if (
        (
          e.target.className.indexOf('ivu-layout-header') > -1 ||
          e.target.className.indexOf('ivu-layout-sider-children') > -1 ||
          e.target.className.indexOf('screen') > -1 ||
          e.target.id === "dragTemplate"
        )
        && this.$refs.sideMenu.$data.menuSecondVisible === false
      ) {  // 如果点击的是头部、左侧菜单、大屏或画布，且二级菜单未打开 -> 切换右侧面板为“大屏设置”
        this.$bus.$emit('click-component', {
          componentName: "大屏设置",
          data: this.$refs.screen.$data,
          uid: this.$refs.screen._uid
        })
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.layout {
  .ivu-layout-has-sider {
    .ivu-layout-content {
      height: calc(100vh - 48px) !important;
    }
  }
  .ivu-layout-sider {
    background: #202020;
    width: 80px !important;
    min-width: auto !important;
    max-width: auto !important;
    flex: none !important;
  }
}
</style>
