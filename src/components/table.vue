<template>
  <!-- @click="click" -->
  <div @mousedown="dragComponent"
       ref="component"
       class="component">

    <!-- table -->
    <Table :columns="columns"
           :data="data">
    </Table>

    <!-- modal - 数据 -->
    <Modal v-model="modalShow"
           title="Table props"
           draggable
           @on-ok="ok"
           @on-cancel="modalShow=false">
      <div v-for="(item,i) in dataCopy"
           :key="i">
        <Input style="width:100px;display:inline-block"
               v-model="item.name"></Input>
        <Input style="width:100px;display:inline-block"
               v-model="item.age"></Input>
        <Input style="width:100px;display:inline-block"
               v-model="item.address"></Input>
        <Input style="width:100px;display:inline-block"
               v-model="item.date"></Input>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /* 表格 */
      columns: [ // 表头列项 - 使用
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data: [ // 表格数据 - 使用
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],
      columnsCopy: [], // 表头列项 - 副本
      dataCopy: [], // 表格数据 - 副本
      /* 弹框 */
      modalShow: false // 是否显示
    }
  },
  methods: {
    // 点击打开弹框
    click () {
      // console.log(this.$data)
      this.modalShow = true;
      this.columnsCopy = JSON.parse(JSON.stringify(this.columns))
      this.dataCopy = JSON.parse(JSON.stringify(this.data))
    },
    // 弹框确认
    ok () {
      this.data = JSON.parse(JSON.stringify(this.dataCopy))
    },
    // 自由拖拽
    dragComponent (e) {
      let odiv = this.$refs.component // 获取目标元素
      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => { // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        // 移动当前元素
        odiv.style.left = left + 'px';
        odiv.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component {
  // position: relative;
  position: absolute;
  width: 600px;
  box-sizing: content-box;
  cursor: move;
  &:hover {
    border: 1px solid #5cadff;
    border-style: dashed;
  }
}
</style>