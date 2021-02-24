<template>
  <div id="app"
       class="layout">
    <Layout>
      <Sider hide-trigger>
        <side-menu></side-menu>
      </Sider>
      <Layout>
        <Content style="background:#fff;height:calc(100vh)">
          <screen></screen>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue'
import Screen from './components/Screen.vue'

export default {
  name: 'App',
  components: {
    SideMenu,
    Screen
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
</style>
