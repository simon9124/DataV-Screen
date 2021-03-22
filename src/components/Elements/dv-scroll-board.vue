<template>
  <dv-scroll-board :config="config"
                   style="height:220px;width:400px" />
</template>

<script>
export default {
  data () {
    return {
      config: {
        header: ['列1', '列2', '列3'], // 表头
        data: [ // 数据
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3']
        ],
        uid: this._uid // 组件id
      },
    }
  },
  mounted () {
    // 接收兄弟组件事件：属性面板数据更新
    this.$bus.$on('attribute-update', config => {
      if (this._uid === config.uid) {
        // console.log(config);
        this.config = {
          header: config.header,
          data: config.data,
          uid: this._uid
        }
      }
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>