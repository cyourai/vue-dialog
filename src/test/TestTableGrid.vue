<template>
  <div>
    <div>是否显示checkbox(默认显示):
      <el-switch v-model="isShowCheckbox"></el-switch>
    </div>
    <div>是否显示子行(默认不显示):
      <el-switch v-model="isHasChild"></el-switch>
    </div>
    <div>当前行:<br>{{row}}</div>
    <table-grid ref="tableGrid"
                :query-param='queryParam'
                :height="300"
                :select-url='selectUrl'
                :select-child-url='selectChildUrl'
                :headers='headers'
                :is-has-child="isHasChild"
                :is-show-checkbox="isShowCheckbox"
                :is-show-index="isShowIndex"
                :is-show-border="isShowBorder"
                :is-show-stripe="isShowStripe"
                @current-change="handleCurrentChange"
                @selection-change="selectionChange">
      <!--末尾追加操作列-->
      <el-table-column slot="option-slot"
                       label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-tooltip content="部署"
                      placement="left">
            <el-button plain
                       icon="el-icon-upload2"
                       size="mini"
                       type="success"
                       @click="deploy(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="启动"
                      placement="right">
            <el-button plain
                       icon="el-icon-caret-right"
                       size="mini"
                       type="success"
                       @click="start(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <!--批量操作-->
      <div slot="batch-slot">
        <el-select v-model="batchFilterData"
                   placeholder="批量操作">
          <el-option label="批量删除"
                     key="delete"
                     value="delete">
          </el-option>
        </el-select>
        <el-button type="primary"
                   plain
                   class="table-content-page-search"
                   @click="batctExecute()">确定
        </el-button>
      </div>
    </table-grid>
    <!--使用说明-->
    <div class="help-contain">
      <table border="1" cellspacing="0" cellpadding="10">
        <tr>
          <td colspan="4">说明:通用表格控件封装,含有分页,子行功能
            <br>通过{selectUrl}初始化数据表,
            <br>通过{selectChildUrl}查询行内子行
          </td>
        </tr>
        <td colspan="4">参数</td>
        <tr>
          <th>名称</th>
          <th>说明</th>
          <th>参数说明</th>
          <th>回文格式(postman)</th>
        </tr>
        <tr>
          <td>selectUrl</td>
          <td>页面初始化参数连接(require:true), 可以为'' 当为空时页面加载不刷新表格</td>
          <td>queryParam 为查询参数</td>
          <td>回文参照通用table接口</td>
        </tr>
        <tr>
          <td>tableList</td>
          <td>页面传入的表格数据(require:false)</td>
          <td>当页面需要在表格数据初始化时修改表格数据时，可使用:select-url='',:table-list='list'的方式，将页面初始化完毕的表格数据通过组件渲染到页面</td>
          <td>回文参照通用table接口</td>
        </tr>
        <tr>
          <td>selectChildUrl</td>
          <td>行内子行内容查询链接(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>height</td>
          <td>table高度设定则固定表头(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>isShowCheckbox</td>
          <td>是否显示checkbox,默认:true显示(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>isShowFooter</td>
          <td>是否显示底部批量操作,分页部分,默认:true显示(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>isShowBorder</td>
          <td>是否显示表格边框,默认:true显示(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>isShowStripe</td>
          <td>是否显示斑马线,默认:true显示(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>isShowIndex</td>
          <td>是否显示序号,默认:false显示(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>isHasChild</td>
          <td>是否显示展开按钮列,默认:false不显示(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>headers</td>
          <td>表头(require:true)</td>
          <td>[{ fixed:true/left/right, prop: 'name', label: '流程名',sortable: 'custom' ,sortKey: 'Name_'}, { prop: 'name1', label: '流程名1', minWidth:50}]</td>
          <td>fixed:固定行/列, prop:字段名, label:表头, sortable: custom后台排序/不写不排序, minWidth:最小列宽/不写自适应, sortKey:后台排序指定key不指定是用Prop转下划线排序</td>
        </tr>
        <td colspan="4">slot</td>
        <tr>
          <th>名称</th>
          <th>说明</th>
          <th>参数</th>
          <th>备注</th>
        </tr>
        <tr>
          <td>option-slot</td>
          <td>列末尾追加操作插槽(require:false)</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>batch-slot</td>
          <td>批量操作插槽(require:false)</td>
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
          <th>@selection-change</th>
          <th>check变化触发(多选checkbox)</th>
          <th>selection[{}]选中的行内容</th>
          <th></th>
        </tr>
        <tr>
          <th>@current-change</th>
          <th>点击表格一行</th>
          <th></th>
          <th></th>
        </tr>
      </table>
      <!--使用说明-->
    </div>
  </div>
</template>

<script>
  import TableGrid from '../components/TableGrid'
  import { request } from '@/utils'

  export default {
    name: 'TestTableGrid',
    components: { TableGrid },
    data() {
      return {
        // 表头
        headers: [
          { prop: 'name', label: '流程名称', sortable: 'custom', sortKey: 'Name_' },
          { prop: 'lastUpdateTime', label: '最后更新时间', minWidth: '50' }
        ],
        // 是否显示边框
        isShowBorder: false,
        // 是否显示斑马线
        isShowStripe: false,
        // 是否显示checkbox
        isShowCheckbox: true,
        // 是否显示序号
        isShowIndex: true,
        // 是否显示子行
        isHasChild: true,
        // 根据字段进行子查询
        childKey: 'userName',
        // 分页查询所有主流程列表
        selectUrl: '/process/actremodel/selectModelListForMain',
        // 查询模型的所有的子流程及子子流程-不分页
        selectChildUrl: '/process/actremodel/selectChildModelByModelId/',
        // 部署流程
        deployProcess: '/process/createDeploy/',
        // 启动流程
        startProcess: '/process/startProcessDefinition/',
        queryParam: {},
        // 批量操作标记位
        batchFilterData: '',
        // 当前行
        row: {}
      }
    },
    created() {
    },
    methods: {
      batctExecute() {
        // console.debug(this.batchFilterData)
      },
      selectionChange(selection) {
        // console.debug(selection)
      },
      // 部署流程
      deploy(row) {
        debugger
        request({
          url: this.deployProcess + +row.id,
          method: 'get'
        })
      },
      // 启动流程
      start(row) {
        request({
          url: this.startProcess + +row.id,
          method: 'get'
        })
      },
      // 选中当前行
      handleCurrentChange(row) {
        this.row = row
      }
    }
  }
  </script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .help-contain {
    margin-top: 20px;
  }
</style>
