<!--vueTree组件
 * 此组件首次渲染即获取全部数据
 * 数据格式为数组嵌套对象
 * 采用组件递归，组件name要确保与调用的递归组件一样
 * 用.stop阻止子级元素事件冒泡
 * 递归调用的组件，需向外层组件传值
-->

<template id="item-template">
  <div class="process-tree">
    <div class="process-container">
      <div class="process-grid"
           v-for="(childData,i) in treeData"
           v-if="!treeData.processShowList"
           @click.stop="selectChild(i)">
        <!-- :style="{'marginBottom':childData.processShowList ? childData.childHeight+'px' :'12px'}" -->
        <div class="process-grid-child"
             :style="{'width':processWidth,
                    'background':childData._nodeStatus==='0' ? 'rgba(51, 204, 102, 1)':
                                 childData._nodeStatus==='1' ? 'rgba(102, 204, 255, 1)':
                                 childData._nodeStatus==='3' ? 'rgba(255, 255, 255, 1)':
                                                              'rgba(226, 225, 225, 1)',
                    'border': childData.nodeRunning==='1'?
                             '4px solid rgba(255, 148, 0, 1)':'1px solid #ccc !important'}"
             ref="processChild">
          <el-row>

            <!-- col1：左侧部分 -->
            <el-col :span="21">
              <!-- 子集前的空白 -->
              <span v-for="space in childData._level"
                    class="process-grid-child-space process-grid-icon"
                    :key="space"></span>
              <!-- 如果有子集：有箭头 -->
              <i v-if="childData.processShowList"
                 :class="[childData.isExpanded ?'icon-expand':'icon-unExpand',
                  'el-icon-caret-right process-grid-icon']"
                 @click.stop="expand(i)"></i>
              <!-- 如果没有子集：没有箭头 -->
              <span v-else
                    class="process-grid-icon"
                    style="display:inline-block;width:16px;height:42px"></span>
              <!-- 显示的内容 -->
              <span class="process-grid-name"
                    :style="{'color':childData._nodeStatus==='0'
                              || childData._nodeStatus==='1'?'#fff':'#999'}">
                {{childData.nodeName}}
              </span>
              <!-- 查看流程 -->
              <span @click="showModel(childData.nodeId)"
                    class="process-grid-view"
                    :style="{'color':childData._nodeStatus==='0'
                              || childData._nodeStatus==='1'?'#fff':'#999 !important','borderColor':childData._nodeStatus==='0'
                              || childData._nodeStatus==='1'?'#fff':'#999'}">
                <i class="el-icon-caret-right"></i>
              </span>
              <!-- 完成百分比 -->
              <span class="process-grid-step"
                    :style="{'color':childData._nodeStatus==='0'
                              || childData._nodeStatus==='1'?'#fff':'#999'}">
                {{childData.completeCount}}/{{childData.count}}
              </span>
            </el-col>

            <!-- col2：后面的空格 -->
            <el-col :span="3">
              <span></span>
            </el-col>

          </el-row>
        </div>
        <!-- 引用当前组件，传入下级数据 -->
        <el-collapse-transition>
          <div v-if="childData.show"
               class="process-grid-child-transition">
            <process-tree :treeData="childData.processShowList"
                          :processWidth="processWidth"
                          :fatherHeight="fatherHeight"
                          @selectTreeData="selectTreeData"
                          @sendHeight="sendHeight">
            </process-tree>
          </div>
        </el-collapse-transition>
      </div>
    </div>

  </div>
</template>

<script>
import Bus from '@/utils/bus'
import { request } from '@/utils'

export default {
  name: 'process-tree',
  template: '#item-template',
  props: {
    treeData: {
      type: [Object, Array]
    },
    processWidth: {
      type: String
    }
  },
  data: function () {
    return {
      // 子集是否展开
      isExpand: true,
      // 被选中的（要传递的）nodeId
      nodeId: '',
      // marginBottom动态样式
      processToggle: '',
      // 最外层父节点增减的高度值
      fatherHeight: 0,
      // 汇总后，需要展开的高度值
      needHeight: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() { },
    // 切换展开状态
    expand(i) {
      // console.log(i)
      // this.processToggle = parseInt(this.processToggle)
      this.treeData[i].isExpanded = !this.treeData[i].isExpanded
      this.isExpand = this.treeData[i].show = !this.treeData[i].show
      // 根据展开与否，添加高度
      if (this.treeData[i].isExpanded === true) {
        this.fatherHeight +=
          this.treeData[i].processShowList.length * (42 + 10) + 12
        this.processToggle = this.fatherHeight + 'px'
        this.$emit('sendHeight', this.fatherHeight)
      } else {
        this.fatherHeight = 0
        this.processToggle = '10px'
        this.$emit('sendHeight', this.fatherHeight)
      }
      this.needHeight = this.fatherHeight

      // 首次加载，全部展开

      // 点击收起：①获取之前的marginBottom ②

      // console.log(this.needHeight)
      // console.log(document.getElementsByClassName('process-grid-child')[i])
      // const processGrid = document.getElementsByClassName('process-grid-child')[
      //   i
      // ]
      // processGrid.style.cssText = 'margin-bottom: 100px !important'
      // console.log(this.$refs.processChild[i])
      // this.$refs.processChild[i].style.cssText =
      //   'margin-bottom: ' + this.needHeight + '!important'
    },
    // 选中子流程
    selectChild(i) {
      this.$emit('selectTreeData', this.treeData[i])
    },
    // 查看流程
    showProcess(i) {
      this.$emit('showProcessData', this.treeData[i])
    },
    selectTreeData(data) {
      this.$emit('selectTreeData', data)
    },
    // 接收子组件传过来的高度值，用作父组件展开
    sendHeight(val) {
      // this.needHeight = this.fatherHeight + val
      // console.log(this.needHeight)
      // this.processToggle = this.needHeight + 'px'
    },
    // 显示全/近景
    showModel(taskId) {
      this.loading = true
      request({
        url: `process/model/front/permit/taskIdToModelId/${taskId}`,
        method: 'get'
      }).then(result => {
        this.loading = true
        // window.location.href = `#/process/modelId/${result.data.modelId}`
        const url = `#/process/modelId/${result.data.modelId}`
        window.open(url)
        // window.location.reload()
      }).catch(error => {
        console.error(error)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../styles/process.scss';
.process-tree {
  .process-container {
    padding: 10px 0 0 0;
    background: none;
    margin-bottom: -10px;
  }
  .process-grid {
    background: none;
    &-child {
      background: #33cc66;
      margin-left: 10px;
    }
  }
}
</style>
