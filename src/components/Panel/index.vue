<template>
  <div id="panel">
    <Form :model="formData"
          label-position="top">

      <!-- 大屏设置 -->
      <FormItem label="主题背景"
                v-if="elementName==='大屏设置'">
        <Input v-model="formData.background"
               @on-blur="onBlur('大屏设置','background')"></Input>
      </FormItem>
      <FormItem label="大屏比例"
                v-if="elementName==='大屏设置'">
        <span class="inline-input-label">宽</span>
        <Input v-model="formData.width"
               @on-blur="onBlur('大屏设置','width')"
               class="inline-input"
               style="width:95px;margin-right:20px"></Input>
        <span class="inline-input-label">高</span>
        <Input v-model="formData.height"
               @on-blur="onBlur('大屏设置','height')"
               class="inline-input"
               style="width:95px"></Input>
      </FormItem>

      <!-- 轮播表 -->
      <FormItem label="表行"
                v-if="elementName==='轮播表'">
        <Button class="button-add"
                ghost
                type="primary"
                @click.stop="add('轮播表','data')">
          <Icon type="md-add"
                class="i-add" />
        </Button>

        <div class="indent-content">

          <Collapse simple
                    accordion
                    v-model="collapseActiveName">
            <Panel v-for="(row,i) in formData.data"
                   :key="i"
                   :name="'轮播表-data-'+i">
              第{{i+1}}行
              <Icon type="ios-trash-outline"
                    class="not-rotate"
                    @click.stop="del('轮播表','data',i)" />
              <div slot="content"
                   v-for="(col,_i) in row"
                   :key="_i">
                <Input :value="col"
                       @on-blur="onBlur('轮播表','data',i,_i)"></Input>
              </div>
            </Panel>
          </Collapse>

          <span class="inline-input-label">显示行数</span>
          <Input v-model="formData.rowNum"
                 @on-blur="onBlur('轮播表','rowNum')"
                 class="inline-input"
                 style="width:170px"></Input>

        </div>

      </FormItem>
      <FormItem label="表列"
                v-if="elementName==='轮播表'">
        <Button class="button-add"
                ghost
                type="primary"
                @click.stop="add('轮播表','header')">
          <Icon type="md-add"
                class="i-add" />
        </Button>

        <div class="indent-content">
          <Collapse simple
                    accordion
                    v-model="collapseActiveName">
            <Panel v-for="(item,i) in formData.header"
                   :key="i"
                   :name="'轮播表-header-'+i">
              第{{i+1}}列
              <Icon type="ios-trash-outline"
                    class="not-rotate"
                    @click.stop="del('轮播表','header',i)" />

              <Input slot="content"
                     :value="item"
                     @on-blur="onBlur('轮播表','header',i)"
                     class="inline-input"></Input>

              <span slot="content"
                    class="inline-input-label">宽度</span>
              <Input slot="content"
                     :value="formData.columnWidth[i]||'auto'"
                     :disabled="i>0&&formData.columnWidth[i-1]===undefined"
                     @on-blur="onBlur('轮播表','columnWidth',i)"
                     class="inline-input"
                     style="width:170px"></Input>

              <Select slot="content"
                      v-model="formData.align[i]"
                      style="width:80px"
                      @on-change="selectChange($event,'轮播表','align',i)">
                <Option value="left"
                        label="左对齐">左对齐</Option>
                <Option value="center"
                        label="中对齐">中对齐</Option>
                <Option value="right"
                        label="右对齐">右对齐</Option>
              </Select>

            </Panel>
          </Collapse>
        </div>

      </FormItem>
      <FormItem label="表头"
                v-if="elementName==='轮播表'">
        <Checkbox class="button-add"
                  v-model="formData.hasHeader"
                  @on-change="checkBoxChange($event,'轮播表','hasHeader')">
        </Checkbox>
        <div v-if="formData.hasHeader"
             class="indent-content">

          <span class="inline-input-label">表头背景</span>
          <Input v-model="formData.headerBGC"
                 @on-blur="onBlur('轮播表','headerBGC')"
                 class="inline-input"
                 style="width:170px"></Input>

          <span class="inline-input-label">表头高度</span>
          <Input v-model="formData.headerHeight"
                 @on-blur="onBlur('轮播表','headerHeight')"
                 class="inline-input"
                 style="width:170px"></Input>

        </div>
      </FormItem>
      <FormItem label="行号"
                v-if="elementName==='轮播表'">
        <Checkbox class="button-add"
                  v-model="formData.index"
                  @on-change="checkBoxChange($event,'轮播表','index')">
        </Checkbox>
        <div v-if="formData.index"
             class="indent-content">

          <span v-if="formData.hasHeader"
                class="inline-input-label">行号表头</span>
          <Input v-if="formData.hasHeader"
                 v-model="formData.indexHeader"
                 @on-blur="onBlur('轮播表','indexHeader')"
                 class="inline-input"
                 style="width:170px"></Input>

          <span class="inline-input-label">行号宽度</span>
          <Input v-model="formData.columnWidth[0]"
                 @on-blur="onBlur('轮播表','columnWidth',0)"
                 class="inline-input"
                 style="width:170px"></Input>

        </div>
      </FormItem>
      <FormItem label="轮播"
                v-if="elementName==='轮播表'">
        <div class="indent-content">

          <span class="inline-input-label">轮播间隔</span>
          <Input v-model="formData.waitTime"
                 @on-blur="onBlur('轮播表','waitTime')"
                 class="inline-input"
                 style="width:170px"></Input>

          <span class="inline-input-label">轮播方式</span>
          <Input v-model="formData.carousel"
                 @on-blur="onBlur('轮播表','carousel')"
                 class="inline-input"
                 style="width:170px"></Input>

          <span class="inline-input-label">悬浮暂停</span>
          <Checkbox v-model="formData.hoverPause"
                    @on-change="checkBoxChange($event,'轮播表','hoverPause')">
          </Checkbox>

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
      formData: {}, // 面板表单数据
      collapseActiveName: "-1" // 手风琴激活的面板的namea
    }
  },
  mounted () {
    // 接收兄弟组件事件：点击组件刷新右侧面板
    this.$bus.$on('click-component', obj => {
      console.log('panel', obj);
      document.getElementsByTagName('input').forEach(ele => { ele.blur() }) // 主动触发所有的inpu框失去焦点
      this.formData = obj.data.config
      this.elementName = obj.componentName
      this.collapseActiveName = "-1"
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
      if (componentName === "轮播表" && type === "columnWidth") {
        // ① 空值自动转换为'auto' ② 若前列'auto'，后列自动转换为'auto'
        if (event.target.value === "") {
          this.$set(event.target, 'value', 'auto')
          this.$set(this.formData[type], index, 'auto')
          this.formData[type].forEach((item, i) => {
            i > index && this.$set(this.formData[type], i, 'auto')
          })
        }
      }
      // console.log(this.formData);
      this.$bus.$emit('attribute-update', this.formData)
    },
    // 面板事件：追加
    add (componentName, type) {
      if (componentName === "轮播表") {
        if (type === 'data') { // 追加行数据
          this.$set(this.formData[type], this.formData[type].length, ['', '', ''])
        } else if (type === 'header') { // 追加列数据
          this.$set(this.formData[type], this.formData[type].length, '') // 表头加一列
          this.formData['data'].forEach(row => { // 每行末尾加一列
            this.$set(row, this.formData[type].length - 1, '')
          })
          this.$set(this.formData['align'], this.formData[type].length - 1, 'left') // 对齐加一列
          this.$set(this.formData['columnWidth'], this.formData[type].length - 1, 'auto') // 列宽加一列
        }
        this.collapseActiveName = `${componentName}-${type}-${this.formData[type].length - 1}`
      }
      this.$bus.$emit('attribute-update', this.formData)
    },
    // 面板事件：删除
    del (componentName, type, index) {
      // console.log(componentName, type, index);
      if (componentName === "轮播表") {
        if (type === 'data') { // 删除行数据
          this.$delete(this.formData[type], index)
        } else if (type === 'header') { // 删除列数据
          this.$delete(this.formData[type], index) // 表头删除列
          this.formData['data'].forEach(row => { // 每行删除列
            this.$delete(row, index)
          })
          this.$delete(this.formData['align'], index) // 对齐删除列
          this.$delete(this.formData['columnWidth'], index) // 列宽删除
        }
      }
      this.$bus.$emit('attribute-update', this.formData)
    },
    // 面板事件：checkbox
    checkBoxChange (bool, componentName, type) {
      // console.log(bool, type, componentName);
      if (componentName === "轮播表") {
        if (type === 'index') { // 行号
          if (bool) {
            this.formData['columnWidth'].unshift(50)
            this.formData['align'].unshift('center')
          } else {
            this.formData['columnWidth'].shift()
            this.formData['align'].shift()
          }
        }
        this.$set(this.formData, type, bool)
      }
      this.$bus.$emit('attribute-update', this.formData)
    },
    // 面板事件：select
    selectChange (value, componentName, type, index) {
      // console.log(value, componentName, type,index);
      if (componentName === "轮播表") {
        this.$set(this.formData[type], index, value)
      }
      this.$bus.$emit('attribute-update', this.formData)
    }
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>