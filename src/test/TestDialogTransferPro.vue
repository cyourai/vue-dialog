<template>
  <div v-loading="loading">
    <div>是否多选(默认多选):
      <el-switch v-model="isMultiple"></el-switch>
    </div>
    <el-button type="success"
               @click="dialogShowProcess">绑定子流程</el-button>
    <el-button type="success"
               @click="dialogShowJobs">绑定工作组</el-button>
    <el-button type="success"
               @click="dialogShowUser">绑定用户</el-button>
    <el-button type="success"
               @click="dialogShowUser">绑定组织</el-button>
    <!--使用说明-->
    <div>
      <table border="1"
             cellspacing="0"
             cellpadding="10">
        <tr>
          <td colspan="4">说明:通用左右穿梭框,用于某一节点绑定一个或多个数据
            <br>通过{节点编号}初始化控件,左右变化时通过changeHandler接收右侧变化值,
            <br>点击确定后调用后台接口: 1.清除原有绑定 2.新增新规绑定
          </td>
        </tr>
        <td colspan="4">参数</td>
        <tr>
          <th>名称</th>
          <th>说明</th>
          <th>后台接口</th>
          <th>回文格式(postman)</th>
        </tr>
        <tr>
          <td>initUrl</td>
          <td>页面初始化参数连接</td>
          <td>参考/user/selectOrganizationUserTransfer/{节点编号}<br>通过{节点编号}提供left, right</td>
          <td>smart-auth/组织节点绑定人员-穿梭框初始化</td>
        </tr>
        <tr>
          <td>isMultiple</td>
          <td>是否允许提交多条数据 默认:true(多条)</td>
          <td></td>
          <td></td>
        </tr>
        <td colspan="4">事件</td>
        <tr>
          <th>名称</th>
          <th>说明</th>
          <th>参数</th>
          <th>回文格式(postman)</th>
        </tr>
        <tr>
          <td>@change</td>
          <td>实时监控移动后右侧变化的值</td>
          <td>params:
            <br>{
            <br>value:[]右侧值,
            <br>direction:"right/left"移动方向,
            <br>movedKeys:[]移动值
            <br>}</td>
          <td>无</td>
        </tr>
        <tr>
          <td>@submit</td>
          <td>点击确定按钮进行保存,先清空原有关联再新增</td>
          <td>params:
            <br>{
            <br>value:[]右侧值,
            <br>}</td>
          <td>smart-auth/组织节点绑定人员-穿梭框保存</td>
        </tr>
      </table>
    </div>
    <!--使用说明-->
    <dialog-transfer ref="dialogTransfer"
                     :type="type"
                     :init-url="initUrl"
                     :titles="titles"
                     :filterPlaceholder="filterPlaceholder"
                     @sendSelectedChild="sendSelectedChild"
                     @submit="dialogSubmit"
                     @change="changeHandler">
    </dialog-transfer>
  </div>
</template>

<script>
import DialogTransfer from '../components/DialogTransfer'
import { request } from '@/utils'

export default {
  name: 'TestDialogTransfer',
  components: { DialogTransfer },
  data() {
    return {
      loading: false,
      queryParam: {},
      // 节点编号
      organizationCode: '1259a013-cc6d-11e8-aaa7-00163e004f79',
      // 穿梭框初始化
      initUrl: `/process/actremodel/selectChildModelToModelTransfer/202514/Task_1l12966`,
      // 是否允许提交多选
      isMultiple: false,
      titles: ['全部子流程', '已绑定子流程'],
      filterPlaceholder: '选择绑定子流程',
      // 被选中的子流程(key)
      selectedChildProcess: [],
      // 要回显的子流程(value)
      labelChildProcess: [],
      // 全部子流程
      wholeChildProcess: [],
      // dialog类型
      type: 'process'
    }
  },
  created() {},
  methods: {
    // 控制dialog显示与否 -> process
    dialogShowProcess() {
      this.type = 'process'
      this.titles = ['全部子流程', '已绑定子流程']
      this.filterPlaceholder = '选择绑定子流程'
      this.initUrl = `/process/actremodel/selectChildModelToModelTransfer/202514/Task_1l12966`
      this.$refs.dialogTransfer.showDialog()
    },
    // 控制dialog显示与否 -> jobs
    dialogShowJobs() {
      this.type = 'jobs'
      this.titles = ['全部工作组', '已绑定工作组']
      this.filterPlaceholder = '选择绑定工作组'
      this.initUrl = 'maintenance/jobs/selectActNodeJobsTransfer/12/34'
      this.$refs.dialogTransfer.showDialog()
    },
    // 控制dialog显示与否 -> user
    dialogShowUser() {
      this.type = 'user'
      this.titles = ['全部用户', '已绑定用户']
      this.filterPlaceholder = '选择绑定用户'
      this.initUrl = 'process/actnodeuser/selectActNodeUserTransfer/4984/165'
      this.$refs.dialogTransfer.showDialog()
    },
    dialogSubmit(params) {
      // console.debug(params)
      if (!this.isMultiple && params.value.length > 1) {
        // 单选检查
        this.$alert('只允许选择一条数据')
      } else {
        this.loading = true
        const data = {
          modelId: '202514',
          nodeId: 'Task_1l12966',
          childModelIdList: ['207514']
        }
        request({
          url: `/process/actremodel/saveChildModelToModel`,
          method: 'post',
          data
        })
          .then(() => {})
          .finally(() => {
            this.loading = false
            this.$refs.dialogTransfer.closeDialog()
          })
      }
    },
    // 接收子组件传来的selectedChildProcess -> 赋给selectedChildProcess
    sendSelectedChild(data) {
      this.wholeChildProcess = data.left
      this.selectedChildProcess = data.right
    },
    // 列表元素变化
    changeHandler(params) {
      if (params.direction === 'right') {
        // 如果是右移添加项
        this.selectedChildProcess = this.selectedChildProcess.concat(
          params.movedKeys
        )
      } else {
        // 如果是左移减少项
        var a = this.selectedChildProcess
        var b = params.movedKeys
        for (var i = 0; i < b.length; i++) {
          for (var j = 0; j < a.length; j++) {
            if (a[j] === b[i]) {
              a.splice(j, 1)
              j = j - 1
            }
          }
        }
        // console.log(a)
        this.selectedChildProcess = a
      }
      // console.log(this.selectedChildProcess)
      // 根据key列表 -> 获取value列表
      const labelChildProcess = []
      for (var item of this.wholeChildProcess) {
        for (var key of this.selectedChildProcess) {
          if (item.key.indexOf(key) > -1) {
            labelChildProcess.push(item.label)
          }
        }
      }
      console.log(labelChildProcess)
      this.labelChildProcess = labelChildProcess
    }
  }
}
</script>

<style scoped>
</style>
