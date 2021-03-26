<template>
  <dv-scroll-board :config="config"
                   style="height:220px;width:400px" />
</template>

<script>
export default {
  data () {
    return {
      config: {
        uid: this._uid, // 组件id
        data: [ // 表数据
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3']
        ],
        rowNum: 5, // 表行数
        align: ['left', 'left', 'left'], // 列对齐方式
        columnWidth: [], // 列宽
        hasHeader: true, // 是否包含表头
        header: ['列1', '列2', '列3'], // 表头
        headerBGC: '#00BAFF', // 表头背景色
        headerHeight: 35, // 表头高度
        index: false, // 显示行号
        indexHeader: '#', // 行号表头
        waitTime: 2000, // 轮播时间间隔(ms)
        carousel: 'single', // 轮播方式
        hoverPause: true, // 悬浮暂停轮播
      },
    }
  },
  mounted () {
    // 接收兄弟组件事件：属性面板数据更新
    this.$bus.$on('attribute-update', config => {
      if (this._uid === config.uid) {
        // console.log(config);
        this.config = {
          uid: this._uid,
          data: config.data,
          rowNum: config.rowNum,
          align: config.align,
          columnWidth: config.columnWidth.filter(item => item !== 'auto').map(item => parseInt(item)),
          hasHeader: config.hasHeader,
          header: config.hasHeader ? config.header : [],
          headerBGC: config.headerBGC,
          headerHeight: config.headerHeight,
          index: config.index,
          indexHeader: config.indexHeader,
          waitTime: config.waitTime,
          carousel: config.carousel,
          hoverPause: config.hoverPause,
        }
      }
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>