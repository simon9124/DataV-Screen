<template>
  <div id="panel">
    <Form :model="formData"
          label-position="top">
      <FormItem label="主题背景">
        <Input v-model="formData.background"
               @on-blur="onBlur"></Input>
      </FormItem>
      <FormItem label="大屏比例">
        <span class="inline-input-label">宽</span>
        <Input v-model="formData.width"
               @on-blur="onBlur"
               class="inline-input"></Input>
        <span class="inline-input-label">高</span>
        <Input v-model="formData.height"
               @on-blur="onBlur"
               class="inline-input"></Input>
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
      element: 'screen', // 元素类型
      formData: {} // 面板表单数据
    }
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