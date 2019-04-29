<template>
  <div v-loading="loading">
    <div>是否多选(默认多选):
      <el-switch v-model="isMultiple"></el-switch>
    </div>
    <el-button type="success" @click="dialogShow">配置人员</el-button>
    <!--使用说明-->
    <div>
      <table border="1" cellspacing="0" cellpadding="10">
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
                     :init-url="initUrl"
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
        initUrl: `/user/selectOrganizationUserTransfer/1259a013-cc6d-11e8-aaa7-00163e004f79`,
        // 是否允许提交多选
        isMultiple: true
      }
    },
    created() {
    },
    methods: {
      dialogShow() {
        this.$refs.dialogTransfer.showDialog()
      },
      dialogSubmit(params) {
        // console.debug(params)
        if (!this.isMultiple && params.value.length > 1) {
          // 单选检查
          this.$alert('只允许选择一条数据')
        } else {
          this.loading = true
          const data = {}
          data.organizationCode = this.organizationCode
          data.userNameList = params.value
          request({
            url: `/user/saveUserOrganization`,
            method: 'post',
            data
          }).then(() => {
          }).finally(() => {
            this.loading = false
            this.$refs.dialogTransfer.closeDialog()
          })
        }
      },
      changeHandler(params) {
        // console.debug(params)
      }
    }
  }
</script>

<style scoped>
</style>
