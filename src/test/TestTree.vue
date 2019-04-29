<template>
  <div class='panel'>
    <div class="is-edit">是否可编辑(默认编辑):
      <el-switch v-model="isEdit"></el-switch>
    </div>
    <div class="is-edit">是否多选(默认单选):
      {{this.isMultiple}}
    </div>
    <div class="is-edit">当前选中:
      {{this.checkedNode}}
    </div>
    <div class="is-edit">多选:
      {{this.checkedNodes}}
    </div>
    <vue-tree
      id="tree"
      :style-class="styleClass"
      :init-tree-url="initTreeUrl"
      :update-tree-url="updateTreeUrl"
      :del-tree-url="delTreeUrl"
      :insert-tree-url="insertTreeUrl"
      :is-edit="isEdit"
      :is-multiple="isMultiple"
      @click-node="clickNode"
      @checked-nodes="getCheckedNodes"
    >
    </vue-tree>
    <div class="is-edit">
      <el-button @click="dialogVisible = true" type="primary" plain>弹出</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%">
      <span>
        <vue-tree
          id="dialogTree"
          :update-tree-url="updateTreeUrl"
          :del-tree-url="delTreeUrl"
          :insert-tree-url="insertTreeUrl"
          :is-edit="isEdit"
          :is-multiple="isMultiple"
          @click-node="clickNode"
          @checked-nodes="getCheckedNodes">
        </vue-tree>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import VueTree from '../components/VueTree'

  export default {
    name: 'TestTree',
    components: { VueTree },
    data() {
      return {
        // 系统配置url
        baseURL: '',
        updateTreeUrl: '',
        delTreeUrl: '',
        initTreeUrl: '',
        tokenHeader: '',
        // 是否可编辑
        isEdit: true,
        // 是否可多选
        isMultiple: true,
        // 选中的节点(当前选中)
        checkedNode: {},
        // 选中的节点(多选)
        checkedNodes: [],
        // 弹出
        dialogVisible: false,
        // 树形样式
        styleClass: 'width: 500px'
      }
    },
    created() {
      this.baseURL = `${process.env.BASE_API + process.env.PREFIX}`
      this.initTreeUrl = this.baseURL + '/general/tree/selectTreeListByRootCode/treeRoot'
      this.delTreeUrl = this.baseURL + '/general/tree'
      this.updateTreeUrl = this.baseURL + '/general/tree'
      this.insertTreeUrl = this.baseURL + '/general/tree/insert'
    },
    methods: {
      clickNode(param) {
        this.checkedNode = param
      },
      getCheckedNodes(params) {
        this.checkedNodes = params
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .is-edit {
    margin-bottom: 20px;
  }
</style>
