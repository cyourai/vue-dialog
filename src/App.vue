<template>
  <div>
    <el-container>
      <el-aside width="330px">
        <el-input v-model="data.userName"
                  class="login"></el-input>
        <el-input v-model="data.userPassword"
                  class="login"></el-input>
        <el-button @click="getToken">登录</el-button>
        <div>{{token}}</div>
        <el-button plain
                   type="success"
                   v-clipboard:copy='this.token'
                   v-clipboard:success='clipboardSuccess'>
          复制token
        </el-button>
        <br>
        <a href='#/excel'>测试上传Excel</a><br>
        <a href='#/photo'>测试图片库</a><br>
        <a href='#/tinymce'>带图片库的富文本</a><br>
        <a href='#/markdown'>支持Markdown的富文本</a><br>
        <a href='#/magnify'>图片放大加遮罩层</a><br>
        <a href='#/script'>测试脚本库</a><br>
        <a href='#/scriptCreate'>测试脚本生成器</a><br>
        <a href='#/scriptFilter'>测试脚本筛选</a><br>
        <a href='#/stopupload'>测试断点上传</a><br>
        <a href='#/tableFile'>测试文件列表</a><br>
        <a href='#/tree'>测试通用树形结构</a><br>
        <a href='#/tableUser'>测试人员</a><br>
        <a href='#/tableGrid'>测试动态表格</a><br>
        <a href='#/processGrid'>测试动态组织结构(点击获取子数据)</a><br>
        <a href='#/processTree'>测试动态组织结构(首次即渲染全部数据)</a><br>
        <a href='#/onekeyIndex'>测试onekey-index</a><br>
        <a href='#/onekeyStart'>测试onekey-start</a><br>
        <a href='#/timePicker'>测试时间选择</a><br>
        <a href='#/processModeler'>测试流程图编辑(全/近景)</a><br>
        <a href='#/dialogTransferUser'>测试弹出框-穿梭框-组织节点+人员</a><br>
        <a href='#/dialogTransferProcess'>测试弹出框-穿梭框-组织节点+子流程/工作组/用户组织</a><br>
        <a href='#/organization'>测试组织结构+人员</a><br>
        <a href='#/tableHeader'>测试表格Header栏位</a><br>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { request, setToken } from '@/utils'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      data: {
        userName: 'admin',
        userPassword: 'admin123',
        baseURL: ''
      },
      token: ''
    }
  },
  methods: {
    getToken() {
      const param = new URLSearchParams()
      param.append('userName', this.data.userName)
      param.append('userPassword', this.data.userPassword)
      request({
        url: '../login',
        method: 'post',
        data: param,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(result => {
          this.token = result.data.token
          setToken(this.token)
        })
        .finally(() => { })
    },
    clipboardSuccess() {
      this.$message({
        message: '已复制Token到粘帖版',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.login {
  width: 200px;
}
.el-main {
  padding: 0;
}
</style>
