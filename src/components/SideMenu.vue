<template>
  <div>
    <Menu active-name="1-2"
          theme="dark"
          width="auto">

      <MenuItem name="1-1">
      <Icon type="ios-navigate"></Icon>
      <span>Option 1</span>
      </MenuItem>

      <MenuItem name="1-2">
      <Icon type="ios-search"></Icon>
      <span>Option 2</span>
      </MenuItem>

      <MenuItem name="1-3">
      <Icon type="ios-settings"></Icon>
      <span>Option 3</span>
      </MenuItem>

    </Menu>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
</style>
