<template>
  <el-header class="right-panel-header"
             :tree-level="treeLevel"
             :search-url="searchUrl">
    <div class="level">{{treeLevel}}</div>
    <div class="search">
      <el-input placeholder="请输入搜索内容"
                v-model="keyWord"
                class="input-with-select"
                @keyup.enter.native="searchClickHandler">
        <el-button slot="append" icon="el-icon-search" @click="searchClickHandler"></el-button>
      </el-input>
    </div>
    <!--末尾追加插槽-->
    <slot name="option-slot"></slot>
  </el-header>
</template>

<script>
  import { request, isNotEmpty } from '@/utils'

  export default {
    name: 'TableHeader',
    components: {},
    data() {
      return {
        // 关键字
        keyWord: '',
        // 结果list
        list: []
      }
    },
    props: {
      // 树层级名称
      treeLevel: {
        String,
        default: '',
        required: true
      },
      // 搜索url
      searchUrl: {
        String,
        default: '',
        required: true
      },
    },
    watch: {
      searchUrl(val) {
        this.searchUrl = val
      },
      treeLevel(val) {
        this.treeLevel = val
      }
    },
    created() {
    },
    methods: {
      searchClickHandler() {
        // 点击搜索
        const params = {
          searchName: this.keyWord
        }
        if (isNotEmpty(this.searchUrl)) {
          request({
            url: this.searchUrl,
            method: 'get',
            params: params
          }).then(result => {
            // console.log(result.data)
            this.list = result.data.tableData.list
            this.$emit('list', this.list)
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .right-panel-header {
    height: 45px !important;
    line-height: 45px;
    border-bottom: 1px solid gray;
    background: #9e9e9e;
    .level {
      float: left;
      width: 30%;
      height: 70%;
    }
    .search {
      float: left;
      text-align: center;
      width: 25%;
    }
    .input-with-select {
      position: center;
    }
  }
</style>
