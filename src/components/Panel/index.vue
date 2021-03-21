<template>
  <div id="panel">
    <Form :model="formData"
          label-position="top">

      <!-- 大屏设置 -->
      <FormItem v-if="elementName==='大屏设置'"
                label="主题背景">
        <Input v-model="formData.background"
               @on-blur="onBlur"></Input>
      </FormItem>
      <FormItem v-if="elementName==='大屏设置'"
                label="大屏比例">
        <span class="inline-input-label">宽</span>
        <Input v-model="formData.width"
               @on-blur="onBlur"
               class="inline-input"></Input>
        <span class="inline-input-label">高</span>
        <Input v-model="formData.height"
               @on-blur="onBlur"
               class="inline-input"></Input>
      </FormItem>

      <!-- 轮播表 -->
      <FormItem v-if="elementName==='轮播表'"
                label="数据">
        <Input v-model="formData.componentName"
               @on-blur="onBlur"></Input>
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
    // 接收兄弟组件数据，更新右侧面板
    this.$bus.$on('click-component', obj => {
      console.log('panel', obj);
      this.formData = obj.data.config
      this.elementName = obj.componentName
    })
  },
  created () {
    // 初始大屏数据，渲染右侧面板
    this.formData = JSON.parse(JSON.stringify(this.screenProps))
  },
  methods: {
    // input框失去焦点，向父组件Sreen和兄弟组件发送事件：更新面板表单数据
    onBlur () {
      this.$bus.$emit('attribute-update', this.formData)
    }
  },
}
</script>

<style scoped lang="scss">
</style>