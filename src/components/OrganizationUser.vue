<template>
  <!--
  组织树人员组建
  isSelectModel(非必须): true时不不允许进行编辑模式
  isMultiple(非必须): true时允许左树多选
  @selection-change: 获取选中节点变化
  -->
  <div class='organization-contain'
       :init-tree-url="initTreeUrl"
       :is-multiple="isMultiple"
       :is-select-model="isSelectModel">
    <el-container>
      <!--左 组织结构-->
      <el-aside width="350px" class="left-panel">
        <vue-tree
          :init-tree-url="initTreeUrl"
          :update-tree-url="updateTreeUrl"
          :del-tree-url="delTreeUrl"
          :insert-tree-url="insertTreeUrl"
          :is-multiple="isMultiple"
          value-field-name="organizationCode"
          tree-name-field-name="organizationLabel"
          type-field="organizationType"
          parent-field="organizationParent"
          @click-node="clickNode"
          @checked-nodes="selectionChange">
        </vue-tree>
      </el-aside>
      <el-container class="right-panel">
        <el-header>{{treeLevel}}</el-header>
        <div class="option-area" v-show="!isSelectModel">
          <el-button type="danger" @click="declareShow">灾难宣告</el-button>
          <el-button type="success" @click="dialogShow">配置人员</el-button>
        </div>
        <!--右 人员信息-->
        <el-main>
          <table-user ref="tableUser"
                      :select-url="selectUrl"
                      :update-url='updateUrl'
                      :del-url='delUrl'
                      :headers='headers'
                      :queryParam='queryParam'>
          </table-user>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="灾难宣告"
               ret="declareDialog"
               :visible.sync="declareDialogVisible">
      <el-form :model="declareForm"
               ref="scoreForm">
        <el-form-item label="宣告内容"
                      prop="dec"
                      class="dec-item">
          <el-input v-model="declareForm.declareContent"
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"
                    placeholder="请输入灾难宣告内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="declareDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="declareDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import VueTree from '../components/VueTree'
  import TableUser from '../components/TableUser'
  import DialogTransfer from '../components/DialogTransfer'
  import { isEmpty, isNotEmpty, request } from '@/utils'

  export default {
    name: 'OrganizationUser',
    components: { VueTree, TableUser, DialogTransfer },
    watch: {
      initTreeUrl: function(curVal) {
        this.initTreeUrl = curVal
      }
    },
    props: {
      // 选择模式
      isSelectModel: {
        type: Boolean,
        required: false,
        default: false
      },
      // 是否多选
      isMultiple: {
        type: Boolean,
        required: false,
        default: false
      },
      // 初始化树形连接地址
      initTreeUrl: {
        type: String,
        required: false,
        default: '/user/organization/selectOrganizationByRootCode/root'
      }
    },
    data() {
      return {
        declareDialogVisible: false,
        treeLevel: '',
        delTreeUrl: '',
        updateTreeUrl: '',
        insertTreeUrl: '',
        selectUrl: '',
        delUrl: '',
        updateUrl: '',
        // 配置人员关联
        initUrl: '',
        saveUrl: '',
        // 表头
        headers: [
          { prop: 'user.userName', label: '用户名' },
          { prop: 'user.userNickName', label: '用户名' },
          { prop: 'user.userMobile', label: '手机' }
        ],
        queryParam: {
          Object,
          default: function() {
            return { organizationCode: '' }
          }
        },
        declareForm: {
          declareContent: ''
        }
      }
    },
    created() {
      this.delTreeUrl = '/user/organization'
      this.updateTreeUrl = '/user/organization'
      this.insertTreeUrl = '/user/organization/insert'
      this.selectUrl = '/user/organization/selectOrganizationUserList'
      this.delUrl = '/user'
      this.updateUrl = '/user'
      // 配置人员关联
      this.initUrl = '/user/selectOrganizationUserTransfer'
      this.saveUrl = '/user/saveUserOrganization'
    },
    methods: {
      clickNode(param) {
        this.treeLevel = isNotEmpty(param.treeLevel) ? param.treeLevel.join(' / ') : ''
        this.queryParam.organizationCode = param.organizationCode
        if (param.organizationType === 'root') {
          this.queryParam.organizationCode = ''
        } else {
          // 配置人员关联初始化查询
          this.initUrl = `/user/selectOrganizationUserTransfer/${param.organizationCode}`
        }
        this.$refs.tableUser.refreshTable()
      },
      dialogShow() {
        if (isEmpty(this.queryParam.organizationCode)) {
          this.$alert('请勿选择根节点')
        } else {
          this.$refs.dialogTransfer.showDialog()
        }
      },
      declareShow() {
        this.declareDialogVisible = true
      },
      // 获取多选
      selectionChange(params) {
        this.$emit('selection-change', {
          checkedNodes: params
        })
      },
      dialogSubmit(params) {
        this.loading = true
        const data = {}
        data.organizationCode = this.queryParam.organizationCode
        data.userNameList = params.value
        request({
          url: this.saveUrl,
          method: 'post',
          data
        }).then(() => {
          this.$refs.tableUser.refreshTable()
        }).finally(() => {
          this.loading = false
          this.$refs.dialogTransfer.closeDialog()
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .organization-contain /deep/ {
    background: #ffffff;

    .option-area {
      margin: 10px 20px 0px 20px;
      text-align: right;
    }
    .left-panel {
      padding-right: 0px !important;
      border: 1px solid #E6E6E6;
      height: 600px;
    }

    .right-panel {
      padding-left: 0px !important;
      border-top: 1px solid #E6E6E6;
      border-right: 1px solid #E6E6E6;
      border-bottom: 1px solid #E6E6E6;
      height: 600px;
    }

    .el-header {
      background-color: #f0f2f5;
      color: #333;
      height: 30px !important;
      line-height: 30px;
    }
  }
</style>
