<template>
  <div>
    <div style="width:600px;height:600px;background:#9e9e9e;">
      <process-tree style="height:600px;overflow-y:auto;overflow-x:hidden"
                    v-loading="loading"
                    :treeData="treeData"
                    :runningData="runningData"
                    :processWidth="processWidth"
                    @selectTreeData="selectTreeData" />
    </div>
  </div>
</template>

<script>
import ProcessTree from '@/components/ProcessTree.vue'
// import treeToArray from '@/utils/treeComputed'
import treeToArray from '@/utils/eval'
import processToggle from '@/utils/processToggle'
import childHeight from '@/utils/childHeight'
import { request } from '@/utils'
import Bus from '@/utils/bus'

export default {
  name: 'test-process-tree',
  components: {
    ProcessTree
  },
  data: function() {
    return {
      loading: false,
      processWidth: '575px',
      treeData: [
        {
          nodeId: 'Task_1ipos0v--1-1',
          nodeName: '1级节点1',
          nodeStatus: '0',
          nodeType: 'userTask',
          nodeRunning: '0',
          count: 1,
          completeCount: 1,
          processShowList: [
            {
              nodeId: 'Task_0f0i2ze--2-0',
              nodeName: '2级节点0',
              nodeType: 'userTask',
              nodeRunning: '0',
              count: 1,
              completeCount: 1,
              processShowList: [
                {
                  nodeId: 'Task_0f0i2ze--2-0',
                  nodeName: '2级节点0',
                  nodeType: 'userTask',
                  nodeRunning: '0',
                  count: 1,
                  completeCount: 1
                }
              ]
            }
          ]
        },
        {
          nodeId: 'Task_0f0i2ze--1-2',
          nodeName: '1级节点2',
          nodeStatus: '1',
          nodeType: 'userTask',
          nodeRunning: '0',
          count: 4,
          completeCount: 2,
          processShowList: [
            {
              nodeId: 'Task_0f0i2ze--2-1',
              nodeName: '2级节点1',
              nodeType: 'userTask',
              nodeRunning: '1',
              count: 1,
              completeCount: 1,
              processShowList: [
                {
                  nodeId: 'Task_0f0i2ze--3-0',
                  nodeName: '3级节点0',
                  nodeType: 'userTask',
                  nodeRunning: '0',
                  count: 1,
                  completeCount: 1
                }
              ]
            },
            {
              nodeId: 'Task_0f0i2ze--2-2',
              nodeName: '2级节点2',
              nodeType: 'userTask',
              nodeRunning: '0',
              count: 2,
              completeCount: 1,
              processShowList: [
                {
                  nodeId: 'Task_0f0i2ze--3-1',
                  nodeName: '3级节点1',
                  nodeType: 'userTask',
                  nodeRunning: '0',
                  count: 1,
                  completeCount: 1
                },
                {
                  nodeId: 'Task_0f0i2ze--3-2',
                  nodeName: '3级节点2',
                  nodeType: 'userTask',
                  nodeRunning: '0',
                  count: 1,
                  completeCount: 0
                }
              ]
            },
            {
              nodeId: 'Task_0f0i2ze--2-3',
              nodeName: '2级节点3',
              nodeType: 'userTask',
              nodeRunning: '0',
              count: 1,
              completeCount: 0
              // processShowList: [
              //   {
              //     nodeId: 'Task_0f0i2ze--3-3',
              //     nodeName: '3级节点3',
              //     nodeType: 'userTask',
              //     nodeRunning: '0',
              //     count: 1,
              //     completeCount: 0
              //   }
              // ]
            }
          ]
        },
        {
          nodeId: 'Task_1ipos0v--1-3',
          nodeName: '1级节点3',
          nodeStatus: '2',
          nodeType: 'userTask',
          nodeRunning: '0',
          count: 1,
          completeCount: 0,
          processShowList: [
            {
              nodeId: 'Task_0f0i2ze--2-3',
              nodeName: '2级节点4',
              nodeType: 'userTask',
              nodeRunning: '0',
              count: 1,
              completeCount: 0
            }
          ]
        }
      ],
      runningData: {},
      processUrl: 'process/selectProcessForShowByProcessInstanceId/405066',
      // 计算初始展开时需要的marginBottim值
      processOrgin: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.treeData = treeToArray(this.treeData)
      // 去除掉带parent的
      for (var i = this.treeData.length - 1; i >= 0; i--) {
        if (this.treeData[i].nodeRunning === '1') {
          this.runningData = this.treeData[i]
        }
        if (this.treeData[i].parent !== undefined) {
          this.treeData.splice(i, 1)
        }
      }
      console.log(this.treeData)
    },
    // 接收点击的treeData
    selectTreeData(data) {
      console.log(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
