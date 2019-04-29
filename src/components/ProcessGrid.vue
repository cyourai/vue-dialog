<template>
  <div class="process-container"
       v-loading="processLoading">
    <div v-for="(process,i) in processList"
         :class="[process.isExpanded ?'process-expand':'process-unExpand','process-grid']"
         :style="{'marginBottom':process.isExpanded ? processToggle:'10px'}">
      <!-- 主流程循环 -->
      <div class="process-grid-child">
        <i v-if="process.childList.length!==0"
           :class="process.isExpanded ? 'el-icon-caret-right process-grid-icon icon-expand' : 'el-icon-caret-right process-grid-icon icon-unExpand'"
           @click="expand(i)"></i>
        <span v-else
              class="process-grid-icon"
              style="display:inline-block;width:16px;height:42px"></span>
        <span class="process-grid-name">
          {{process.name}}
        </span>
        <span v-if="process.childList.length!==0"
              class="process-grid-step">
          {{process.childList.length}}/{{process.childList.length}}
        </span>
      </div>

      <!-- 展开框 -->
      <!-- <transition name="el-zoom-in-top"> -->
      <div :class="process.isExpanded ? 'block-expand' : 'block-unExpand'">
        <ProcessPlus :childList="childList"
                     :selectChildUrl="selectChildUrl"
                     v-loading="blockLoading"
                     @sendHeight="sendHeight"></ProcessPlus>
      </div>
      <!-- </transition> -->

    </div>
  </div>
</template>

<script>
import { request, objectMerge } from '@/utils'
import ProcessPlus from './ProcessPlus.vue'

export default {
  name: 'TableGrid',
  components: { ProcessPlus },
  data() {
    return {
      processLoading: false,
      blockLoading: false,
      params: {},
      tableData: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        list: []
      },
      // 最外层父节点list
      processList: [],
      // 第一层子节点list
      childList: [],
      // 最外层父节点增减的高度值
      fatherHeight: 0,
      // 从子组件接收到的高度值
      // resolveHeight: 0,
      // 汇总后，需要展开的高度值
      needHeight: 0,
      // 父节点动态样式
      processToggle: ''
    }
  },
  props: {
    // 子数据加载连接,并根据是否含有此链接来判断是否含有展开子行内容
    selectUrl: {
      String,
      default: '',
      required: true
    },
    // 查询模型的所有的子流程及子子流程（不分页）
    selectChildUrl: {
      String,
      default: '',
      required: true
    },
    // 部署流程
    deployProcess: {
      String,
      default: '',
      required: true
    },
    // 启动流程
    startProcess: {
      String,
      default: '',
      required: true
    },
    headers: {
      type: Array,
      required: true,
      default: () => []
    },
    queryParam: {
      Object,
      default: ''
    }
  },
  watch: {
    queryParam(val) {
      this.queryParam = val
    }
  },
  created() {
    this.refreshTable()
  },
  methods: {
    // 初始化block
    refreshTable() {
      this.processLoading = true
      this.params = objectMerge({
        pageSize: this.tableData.pageSize,
        pageNum: this.tableData.pageNum
      })
      request({
        url: this.selectUrl,
        method: 'get',
        params: this.params
      })
        .then(result => {
          // 添加isExpanded属性
          this.processList = result.data.tableData.list.map(process => {
            this.$set(process, 'isExpanded', false)
            return process
          })
          console.log(this.processList)
        })
        .finally(() => {
          this.processLoading = false
        })
    },
    // 点击展开按钮
    expand(i) {
      // this.blockLoading = true
      this.processList[i].isExpanded = !this.processList[i].isExpanded
      request({
        url: this.selectChildUrl + this.processList[i].id,
        method: 'get'
      })
        .then(result => {
          this.childList = result.data.actReModelList.map(child => {
            this.$set(child, 'isExpanded', false)
            return child
          })

          // 根据展开与否，添加高度
          if (this.processList[i].isExpanded === true) {
            this.fatherHeight += this.childList.length * (42 + 10) + 12
            this.processToggle = this.fatherHeight + 'px'
          } else {
            this.fatherHeight = 0
            this.processToggle = '10px'
          }
          this.needHeight = this.fatherHeight
          // console.log(this.needHeight)
        })

        .finally(() => {
          this.blockLoading = false
        })
    },
    // 接收子组件传过来的高度值，用作父组件展开
    sendHeight(val) {
      this.needHeight = this.fatherHeight + val
      // console.log(this.needHeight)
      this.processToggle = this.needHeight + 'px'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../styles/process.scss';
</style>
