<!--递归组件
  * 需注意，props接收传值的同时，再给自身绑定1次
-->

<template>
  <div v-loading="blockLoading"
       class="block-plus">
    <i :class="!child.isExpanded ? 'el-icon-plus' : 'el-icon-minus'"
       @click="toggleExpanded">
    </i>
    <el-form-item label="子流程名称" class="block-plus-form">
      <span>{{ child.name }}</span>
    </el-form-item>
    <el-form-item label="最后更新时间" class="block-plus-form">
      <span>{{ child.lastUpdateTime }}</span>
    </el-form-item>
    <el-form-item>
      <template slot-scope="scope">
        <el-tag type="danger" v-if="typeof child.deploymentId !== 'string'">未部署</el-tag>
        <el-tag type="success" v-else>已部署</el-tag>
      </template>
    </el-form-item>

    <el-tooltip content="编辑"
                placement="left">
      <el-button plain
                 icon="el-icon-edit"
                 size="mini"
                 type="primary"
                 @click="editHandler(child)"></el-button>
    </el-tooltip>

    <el-tooltip content="删除"
                placement="right">
      <el-button plain
                 icon="el-icon-delete"
                 size="mini"
                 type="danger"
                 @click="delHandler(child.id)"></el-button>
    </el-tooltip>

    <!-- 绑定了子流程：循环childList -->
    <template v-for="(child,i) in child.childList"
              v-if="child.childList && child.childList.length!=='0'">
      <BlockPlus :child="child"
                 :selectChildUrl="selectChildUrl"
                 v-if="blockShow"
                 style="margin-left:10px"></BlockPlus>
    </template>

  </div>
</template>

<script>
  import { request } from '@/utils'
  import BlockPlus from './BlockPlus.vue'

  export default {
    name: 'BlockPlus',
    components: { BlockPlus },
    data() {
      return {
        // 节点id
        id: '',
        // loading
        blockLoading: false,
        // 控制树的展开与否
        blockShow: false
      }
    },
    props: {
      child: {
        type: Object,
        default: {},
        required: true
      },
      // 接口：查询模型的所有的子流程及子子流程（不分页）
      selectChildUrl: {
        type: String,
        default: '',
        required: true
      },
      // 是否显示编辑按钮 默认不显示
      isShowEdit: {
        type: Boolean,
        default: false,
        required: false
      },
      // 是否显示删除按钮 默认不显示
      isShowDel: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    create() {
    },
    methods: {
      // 点击+号
      toggleExpanded() {
        this.blockLoading = true
        // console.log(this.child)
        this.id = this.child.id
        request({
          url: this.selectChildUrl + this.id,
          method: 'get'
        })
          .then(result => {
            // console.log(result)
            // 根据result的值，为this.child添加childList项
            this.child['childList'] = result.data.actReModelList
          })
          .finally(() => {
            // console.log(this.blockShow)
            this.child.isExpanded = !this.child.isExpanded
            this.blockLoading = false
            this.blockShow = !this.blockShow
          })
      },
      editHandler(row) {
        // console.log(row.id)
        // this.$emit('headCallBack',row)
        this.$router.push({
          path: '/processManager/process-edit',
          name: 'process-edit',
          params: {
            modelId: row.id
          }
        })
      },
      delHandler(code) {
        // console.log(code)
        // this.$emit('headCallBack',code)
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return request({
            url: '/process/deleteProcessModelById',
            method: 'delete',
            params: { modelId: code }
          }).then(res => {
            this.refreshTable()
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .block-plus {
    font-size: 16px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    margin-top: 10px;
  }
  .block-plus-form {
    width: 18%;
    color: unquote('#99a9bf');
  }
</style>
