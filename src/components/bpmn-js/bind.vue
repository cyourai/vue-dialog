<template>
  <!--节点绑定页面-->
  <div v-loading="loading"
       class="bind-container"
       :model-id="modelId"
       :active-element="activeElement"
       :task-id="taskId"
       :task-type="taskType">
    <div v-show="taskType === 'bpmn:UserTask'">
      <el-row>
        <el-button size="mini"
                   @click="showOrgTreeHandler">绑定团队权限</el-button>
      </el-row>
      <el-row>
        <el-tag v-for="tag in tags.orgList"
                :key="tag"
                type="warning"
                size="mini">
          {{tag}}
        </el-tag>
      </el-row>
      <el-row>
        <el-button size="mini"
                   @click="showTransferHandler('user')">绑定人员权限</el-button>
      </el-row>
      <el-row>
        <el-tag v-for="tag in tags.userList"
                :key="tag"
                type="warning"
                size="mini">
          {{tag}}
        </el-tag>
      </el-row>
      <el-row>
        <el-button size="mini"
                   @click="showJobsTreeHandler">绑定工作组</el-button>
      </el-row>
      <el-row>
        <el-tag v-for="tag in tags.jobsList"
                :key="tag"
                type="warning"
                size="mini">
          {{tag}}
        </el-tag>
      </el-row>
    </div>
    <div v-show="taskType === 'bpmn:CallActivity'">
      <el-row>
        <el-button size="mini"
                   @click="showTransferHandler('subProcess')">绑定子流程</el-button>
      </el-row>
      <el-row>
        <el-tag v-for="tag in tags.subList"
                :key="tag"
                type="success"
                size="mini">
          {{tag}}
        </el-tag>
      </el-row>
    </div>
    <!--绑定穿梭框-->
    <dialog-transfer ref="dialogTransfer"
                     :initUrl="transfer.url"
                     :titles="transfer.titles"
                     :filterPlaceholder="transfer.filterPlaceholder"
                     :isMultiple="transfer.isMultiple"
                     :queryParam="queryParam"
                     @submit="dialogSubmit">
    </dialog-transfer>
    <!--绑定组织-->
    <el-dialog title=""
               :visible.sync="orgVisable"
               width="85%"
               ref="elDialog">
      <organization-user :is-multiple='true'
                         :is-select-model='true'
                         :init-tree-url="initOrgTreeUrl"
                         @selection-change="selectionOrgChange">
      </organization-user>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="submitOrgDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!--绑定工作组-->
    <el-dialog title=""
               :visible.sync="jobsVisable"
               width="85%"
               ref="elDialog">
      <jobs :is-multiple='false'
            :is-select-model='true'
            :init-tree-url="initJobsTreeUrl"
            @tree-selection-change="selectionJobsChange">
      </jobs>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="submitJobsDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isNotEmpty } from '@/utils'
import { DialogTransfer } from 'ctsi-vue-dialog'
import {
  selectBindingInfo,
  saveActNodeUser,
  saveChildModelToModel,
  getModelDefineByModeId,
  saveActNodeOrg,
  saveActNodeJobs
} from '@/api/process/process'
// 绑定团队/工作组
import { OrganizationUser } from 'ctsi-vue-dialog'
import Jobs from '@/components/jobsManager/jobs'

export default {
  name: 'bind',
  components: {
    DialogTransfer,
    OrganizationUser,
    Jobs
  },
  props: {
    // 模型id
    modelId: {
      type: String,
      required: true,
      default: ''
    },
    // 当前激活的图形
    activeElement: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    // 节点id
    taskId: {
      type: String,
      required: true,
      default: ''
    },
    // 节点类型
    taskType: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      orgVisable: false,
      jobsVisable: false,
      // 选中的节点附加信息
      tags: {
        // 节点绑定子流程
        subList: [],
        // 节点绑定工作组
        jobsList: [],
        // 节点绑定人员权限
        userList: [],
        // 节点绑定团队权限
        orgList: []
      },
      // 查参数
      queryParam: {},
      // 穿梭框参数
      transfer: {
        url: '',
        titles: ['全部用户', '已绑定用户'],
        filterPlaceholder: '选择绑定用户',
        isMultiple: true
      },
      // 当前穿梭框的类型
      activeTransferType: '',
      // 加载组织树节点
      initOrgTreeUrl: '',
      // 选中的组织
      organizationCodeList: [],
      // 加载工作组树节点
      initJobsTreeUrl: '',
      // 选中的工作组
      jobsCodeList: []
    }
  },
  watch: {
    $route(to, from) {
      this.init()
      this.refreshTable()
    },
    taskId(val) {
      // 父组件点击流程模型节点,刷新绑定子组件绑定信息
      this.taskId = val
      this.refreshBindInfo()
    },
    taskType(val) {
      // 激活调用子流程展开详细设定
      if (val === 'bpmn:CallActivity') {
        // document.getElementById('camunda-callActivity-select').value = 'bpmn'
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 页面初始化
    init() {
    },
    // 根据节点刷新绑定信息
    refreshBindInfo() {
      // console.debug('bind:', this.modelId, this.taskId, this.taskType)
      if (isNotEmpty(this.modelId) && isNotEmpty(this.taskId)) {
        this.loading = true
        selectBindingInfo(this.modelId, this.taskId)
          .then((result) => {
            this.tags.subList = result.data.subList
            this.tags.jobsList = result.data.jobsList
            this.tags.userList = result.data.userList
            this.tags.orgList = result.data.orgList
          }).finally(() => {
            this.loading = false
          })
      }
    },
    // 打开穿梭框
    showTransferHandler(type) {
      this.activeTransferType = type
      // 绑定人员权限
      if (type === 'user') {
        this.transfer.url = `/process/actnodeuser/selectActNodeUserTransfer/${this.modelId}/${this.taskId}`
        this.transfer.titles = ['全部用户', '已绑定用户']
        this.transfer.filterPlaceholder = '选择绑定用户'
        this.transfer.isMultiple = true
        this.$refs.dialogTransfer.showDialog()
      } else if (type === 'subProcess') {
        this.transfer.url = `/process/actremodel/selectChildModelToModelTransfer/${this.modelId}/${this.taskId}`
        this.transfer.titles = ['全部子流程', '已绑定子流程']
        this.transfer.filterPlaceholder = '选择绑定子流程'
        this.transfer.isMultiple = false
        this.$refs.dialogTransfer.showDialog()
      }
    },
    // 打开组织绑定
    showOrgTreeHandler() {
      this.initOrgTreeUrl = `/process/actnodeorg/selectedOrganizatioinTreeList/${this.modelId}/${this.taskId}`
      this.orgVisable = true
    },
    // 打开工作组绑定
    showJobsTreeHandler() {
      this.initJobsTreeUrl = `process/actnodejobs/selectJobsWithSelected/${this.modelId}/${this.taskId}`
      this.jobsVisable = true
    },
    // 提交穿梭框
    dialogSubmit(params) {
      // 绑定人员权限
      if (this.activeTransferType === 'user') {
        saveActNodeUser(this.modelId, this.taskId, params.value).then(() => {
          this.refreshBindInfo()
        })
      }
      if (this.activeTransferType === 'subProcess') {
        if (!this.transfer.isMultiple && params.value.length > 1) {
          // 单选检查
          this.$alert('只允许选择一条数据')
        } else {
          saveChildModelToModel(this.modelId, this.taskId, params.value).then(() => {
            this.refreshBindInfo()
            // 根据modelId换流程id回写输入框
            if (params.value.length === 1) {
              getModelDefineByModeId(params.value[0]).then((result) => {
                // console.log(result)
                // 同时更新页面图形控件及输入项目
                this.activeElement.businessObject.calledElement = result.data.key
                document.getElementById('camunda-callable-element-ref').value = result.data.key
                console.debug(this.activeElement)
              })
            }
            // 如未绑定/取消绑定，则将input控件的值写回 '可通过绑定子流程按钮进行操作'
            if (params.value.length === 0) {
              this.activeElement.businessObject.calledElement = '可通过绑定子流程按钮进行操作'
              document.getElementById('camunda-callable-element-ref').value = '可通过绑定子流程按钮进行操作'
            }
          })
          // 给父组件传递事件
          this.$emit('submit', 'submit')
        }
      }
      this.$refs.dialogTransfer.closeDialog()
    },
    // 选中左树变化-组织
    selectionOrgChange(params) {
      this.organizationCodeList = []
      for (let i = 0; i < params.checkedNodes.length; i++) {
        this.organizationCodeList.push(params.checkedNodes[i].organizationCode)
      }
      // console.debug(this.organizationCodeList)
    },
    // 选中左树变化-工作组
    selectionJobsChange(params) {
      this.jobCodeList = []
      for (let i = 0; i < params.checkedNodes.length; i++) {
        this.jobCodeList.push(params.checkedNodes[i].treeCode)
      }
    },
    // 保存节点绑定团队权限
    submitOrgDialog() {
      this.loading = true
      const data = {
        modelId: this.modelId,
        nodeId: this.taskId,
        organizationCodeList: this.organizationCodeList
      }
      saveActNodeOrg(data).then(() => {
        this.refreshBindInfo()
      }).finally(() => {
        this.loading = false
        this.orgVisable = false
      })
    },
    // 保存工作组权限
    submitJobsDialog() {
      this.loading = true
      const data = {
        modelId: this.modelId,
        nodeId: this.taskId,
        jobCodeList: this.jobCodeList
      }
      saveActNodeJobs(data).then(() => {
        this.refreshBindInfo()
      }).finally(() => {
        this.loading = false
        this.jobsVisable = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';

.bind-container /deep/ {
  .el-row {
    margin-top: 10px;
  }

  .el-tag {
    margin-right: 5px;
  }
}
</style>
