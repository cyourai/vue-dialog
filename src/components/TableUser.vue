<template>
  <div class="file-table"
       :headers="headers"
       :select-url="selectUrl"
       :query-param="queryParam">
    <el-table
      :data="tableData.list"
      v-loading="tableDataLoading"
      border
      style="width: 100%">
      <!--内容列-->
      <el-table-column v-for="(header, index) in headers"
                       :key="index"
                       :prop="header.prop"
                       :label="header.label"
      ></el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next, jumper"
                   @current-change="pageChangeHandler"
                   v-show="tableData.total > 0"
                   :page-size="tableData.pageSize"
                   :total="tableData.total">
    </el-pagination>
  </div>
</template>

<script>
  import { request, objectMerge } from '@/utils'

  export default {
    name: 'TableUser',
    components: {},
    data() {
      return {
        tableDataLoading: false,
        params: {},
        tableData: {
          total: 0,
          pageNum: 1,
          pageSize: 10,
          list: []
        }
      }
    },
    props: {
      headers: {
        type: Array,
        required: true,
        default: () => []
      },
      selectUrl: {
        String,
        default: '',
        required: true
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
      refreshTable() {
        this.tableDataLoading = true
        this.params = objectMerge(
          {
            pageSize: this.tableData.pageSize,
            pageNum: this.tableData.pageNum
          },
          this.queryParam
        )
        request({
          url: this.selectUrl,
          method: 'get',
          params: this.params
        }).then(result => {
          this.tableData = result.data.tableData
        }).finally(() => {
          this.tableDataLoading = false
        })
      },
      downloadByCode(code) {
        window.open(this.downloadUrl + code)
      },
      pageChangeHandler(pageNum) {
        // 分页-跳页
        this.tableData.pageNum = pageNum
        this.refreshTable()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .file-table {
    .el-input {
      width: 220px;
      margin-right: 20px;
    }
  }
</style>
