<!--递归组件
  * 需注意，props接收传值的同时，再给自身绑定1次
-->

<template>
  <div v-loading="blockLoading">

    <!-- 子流程循环 -->
    <div v-for="(child,i) in childList"
         :class="[child.isExpanded ?'process-expand':'process-unExpand','process-grid']"
         :style="{'marginBottom':child.isExpanded ? processToggle:'10px'}">
      <div class="process-grid-child">
        <i v-if="child.childList.length!==0 && child.childList.length!==null"
           :class="[child.isExpanded ?'icon-expand':'icon-unExpand',
                  'el-icon-caret-right process-grid-icon']"
           @click="expand(i)"></i>
        <!-- process-grid-icon-child -->
        <span v-else
              class="process-grid-icon"
              style="display:inline-block;width:16px;height:42px"></span>
        <span class="process-grid-name">
          {{child.name}}
        </span>
        <span v-if="child.childList.length!==0 && child.childList.length!==null"
              class="process-grid-step">
          {{child.childList.length}}/{{child.childList.length}}
        </span>
      </div>
      <!-- 展开框 -->
      <div v-if="child.childList && child.childList.length!==0"
           :class="child.isExpanded ? 'block-expand' : 'block-unExpand'">
        <ProcessPlus :childList="blockList"
                     :selectChildUrl="selectChildUrl"
                     :height="heightPlus"
                     @sendHeight="sendHeight"></ProcessPlus>
      </div>
    </div>

  </div>
</template>

<script>
import { request, objectMerge } from '@/utils'
import ProcessPlus from './ProcessPlus.vue'

export default {
  name: 'ProcessPlus',
  components: { ProcessPlus },
  data() {
    return {
      // loading
      blockLoading: false,
      // 子节点
      blockList: [],
      // 点击展开时，展开层的高度
      heightPlus: 0,
      // 父节点动态样式
      processToggle: '20px'
    }
  },
  props: {
    // 接收父组件传来的值
    childList: {
      type: Array,
      default: () => [],
      required: true
    },
    // 点击收起时，展开层的层高度
    height: {
      type: Number,
      default: 0
      // required: true
    },
    // 接口：查询模型的所有的子流程及子子流程（不分页）
    selectChildUrl: {
      type: String,
      default: '',
      required: true
    }
  },
  create() {},
  methods: {
    // 点击展开按钮
    expand(i) {
      // this.blockLoading = true
      this.childList[i].isExpanded = !this.childList[i].isExpanded

      request({
        url: this.selectChildUrl + this.childList[i].id,
        method: 'get'
      })
        .then(result => {
          this.blockList = result.data.actReModelList
          // 每获取上层传来的height -> 给heightPlus重新赋值
          this.heightPlus = this.height
          if (this.childList[i].isExpanded === true) {
            // 如果子流程展开 -> 添加相应高度 -> 此时展开的高度值为this.heightPlus
            this.heightPlus += this.blockList.length * (42 + 10)
            this.processToggle = this.blockList.length * (42 + 10) + 12 + 'px'
            this.$emit('sendHeight', this.heightPlus)
          } else {
            // 如果子流程收起 -> 减去相应高度 -> 此时展开的高度值为this.height
            this.heightPlus -= this.blockList.length * (42 + 10)
            this.processToggle = '10px'
            this.$emit('sendHeight', this.height)
          }
        })
        .finally(() => {
          // this.blockLoading = false
        })
    },
    // 高度传值
    sendHeight(val) {
      this.$emit('sendHeight', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../styles/process.scss';
</style>
