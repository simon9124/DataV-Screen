<template>
  <div id="panel">
    <Form :model="formData"
          label-position="top">

      <!-- 大屏设置 -->
      <FormItem v-if="elementName==='大屏设置'"
                label="主题背景">
        <Input v-model="formData.background"
               @on-blur="onBlur('大屏设置','background')"></Input>
      </FormItem>
      <FormItem v-if="elementName==='大屏设置'"
                label="大屏比例">
        <span class="inline-input-label">宽</span>
        <Input v-model="formData.width"
               @on-blur="onBlur('大屏设置','width')"
               class="inline-input"></Input>
        <span class="inline-input-label">高</span>
        <Input v-model="formData.height"
               @on-blur="onBlur('大屏设置','height')"
               class="inline-input"></Input>
      </FormItem>

      <!-- 轮播表 -->
      <FormItem v-if="elementName==='轮播表'"
                label="表头数据">
        <div v-for="(item,i) in formData.header"
             :key="i">
          <Input :value="item"
                 @on-blur="onBlur('轮播表','header',i)"></Input>
        </div>
      </FormItem>
      <FormItem v-if="elementName==='轮播表'"
                label="表数据">
        <div v-for="(item,i) in formData.data"
             :key="i">
          <span v-for="(_item,_i) in item"
                :key="_i">
            <Input :value="_item"
                   @on-blur="onBlur('轮播表','data',i,_i)"></Input>
          </span>
        </div>
      </FormItem>

      <!-- 排名轮播表 -->

    </Form>
  </div>
</template>

<script>
export default {
  props: {
    // 面板表单数据 - 初始大屏
    screenProps: {
      type: Object,
      default: () => { }
    },
  },
  data () {
    return {
      elementName: '大屏设置', // 元素类型
      formData: {} // 面板表单数据
    }
  },
  mounted () {
    // 接收兄弟组件事件：点击组件刷新右侧面板
    this.$bus.$on('click-component', obj => {
      console.log('panel', obj);
      document.getElementsByTagName('input').forEach(ele => { ele.blur() }) // 主动触发所有的inpu框失去焦点
      this.formData = obj.data.config
      this.elementName = obj.componentName
    })
  },
  created () {
    // 初始大屏数据，渲染右侧面板
    this.formData = JSON.parse(JSON.stringify(this.screenProps))
  },
  methods: {
    // input框失去焦点，向父组件Sreen和兄弟组件发送事件：属性面板数据更新
    onBlur (componentName, type, index, _index) {
      // console.log(componentName, type, index, _index);
      if (_index !== undefined) {
        this.$set(this.formData[type][index], _index, event.target.value)
      } else if (index !== undefined) {
        this.$set(this.formData[type], index, event.target.value)
      }
      this.$bus.$emit('attribute-update', this.formData)
    }
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>