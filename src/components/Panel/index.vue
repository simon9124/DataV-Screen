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
        <Input v-model="formData.background"
               @on-blur="onBlur"></Input>
      </FormItem>

    </Form>
  </div>
</template>

<script>
export default {
  props: {
    // 面板表单数据 - 原始
    styleProps: {
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
    this.$bus.$on('click-component', obj => {
      console.log('panel', obj);
      this.elementName = obj.componentName
    })
  },
  created () {
    this.formData = JSON.parse(JSON.stringify(this.styleProps))
  },
  methods: {
    // input框失去焦点
    onBlur () {
      this.$emit('attribute-update', this.formData)
    }
  },
}
</script>

<style scoped lang="scss">
</style>