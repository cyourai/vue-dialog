<template>
  <div class="container">
    <div class="url">请求路径：
      <el-input placeholder="请输入请求路径"
                v-model="searchUrl"
                style="margin-left: 0px;width: 50%"></el-input>
    </div>
    <p/>
    <table-header ref="tableHeader"
                  :tree-level="treeLevel"
                  :search-url="searchUrl">
      <div class="options" slot="option-slot">
        <el-button plain
                   icon="el-icon-picture"
                   type="primary"
                   @click="alert(111)">预案视图
        </el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click="alert(222)"> 新增预案
        </el-button>
      </div>
    </table-header>
  </div>
</template>

<script>
  import TableHeader from '../components/TableHeader'
  import { request } from '@/utils'

  export default {
    name: 'TestTableHeader',
    components: { TableHeader },
    data() {
      return {
        // 树层级名称
        treeLevel: '123/456',
        // 关键字
        keyWord: '',
        // 请求路径
        searchUrl: ''
      }
    },
    created() {
    },
    methods: {
    }
  }
  </script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container /deep/ {
    .el-input {
      margin-left: 280px;
    }
    .options {
      float: right;
      text-align: right;
      width: 40%;
      height: 70%;
      button {
        margin-bottom: 3px;
      }
    }
  }
</style>
